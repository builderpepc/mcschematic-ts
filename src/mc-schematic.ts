import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';
import nbt from 'prismarine-nbt';
import { MCStructure, Position, Bounds } from './mc-structure';
import { Version } from './version';
import { parseSnbt, serializeTag, NbtCompound, NbtTag } from './nbt-utils';

export class MCSchematic {
  private _structure: MCStructure;

  constructor(arg?: string | MCStructure) {
    if (arg === undefined || arg === null) {
      this._structure = new MCStructure();
      return;
    }
    if (typeof arg === 'string') {
      if (!fs.existsSync(arg) || !arg.endsWith('.schem')) {
        this._structure = new MCStructure();
        return;
      }
      this._structure = new MCStructure();
      this._initFromFile(arg);
      return;
    }
    // MCStructure
    this._structure = arg;
  }

  private _initFromFile(filePath: string): void {
    const compressed = fs.readFileSync(filePath);
    const raw = zlib.gunzipSync(compressed);

    const parsed = nbt.parseUncompressed(raw);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rootValue = parsed.value as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fileBase: any = ('Schematic' in rootValue) ? rootValue['Schematic'].value : rootValue;

    // --- Block palette ---
    const filePalette: Record<string, { value: number }> = fileBase['Palette'].value;
    const structurePalette = new Map<string | number, string | number>();

    for (const [blockState, idTag] of Object.entries(filePalette)) {
      const id = idTag.value;
      structurePalette.set(blockState, id);
      structurePalette.set(id, blockState);
    }

    if (structurePalette.size === 0) {
      structurePalette.set('minecraft:air', 0);
      structurePalette.set(0, 'minecraft:air');
    }

    let paletteFreeId = structurePalette.size / 2;

    // Ensure air is at ID 0
    if (!structurePalette.has('minecraft:air')) {
      structurePalette.set('minecraft:air', paletteFreeId);
      structurePalette.set(paletteFreeId, 'minecraft:air');
      paletteFreeId++;
    }

    const airOldId = structurePalette.get('minecraft:air') as number;
    if (airOldId !== 0) {
      const id0State = structurePalette.get(0) as string;
      structurePalette.delete(0);
      structurePalette.delete(id0State);
      structurePalette.delete(airOldId);
      structurePalette.delete('minecraft:air');

      structurePalette.set(0, 'minecraft:air');
      structurePalette.set('minecraft:air', 0);
      structurePalette.set(airOldId, id0State);
      structurePalette.set(id0State, airOldId);
    }

    // --- Block states ---
    const structureBlockStates = new Map<string, number>();

    if ('BlockData' in fileBase) {
      const fileMetaData: any = fileBase['Metadata'].value;
      const schemOffset: Position = [
        fileMetaData['WEOffsetX'].value as number,
        fileMetaData['WEOffsetY'].value as number,
        fileMetaData['WEOffsetZ'].value as number,
      ];
      const schemHeight: number = fileBase['Height'].value;
      const schemLength: number = fileBase['Length'].value;
      const schemWidth: number = fileBase['Width'].value;
      const schemYSliceArea = schemWidth * schemLength;

      // BlockData.value is number[] in prismarine-nbt
      const rawBlockData: number[] = fileBase['BlockData'].value;
      const paletteSize = structurePalette.size / 2;

      if (paletteSize < 128) {
        for (let idx = 0; idx < rawBlockData.length; idx++) {
          let id = rawBlockData[idx] & 0xff;
          if (id === airOldId) id = 0;
          else if (id === 0) id = airOldId;
          if (id === 0) continue;

          const schemY = Math.floor(idx / schemYSliceArea);
          const schemZ = Math.floor((idx % schemYSliceArea) / schemWidth);
          const schemX = idx % schemWidth;
          const key = `${schemX + schemOffset[0]},${schemY + schemOffset[1]},${schemZ + schemOffset[2]}`;
          structureBlockStates.set(key, id);
        }
      } else {
        let blockStateIndex = 0;
        let bytePos = 0;
        while (bytePos < rawBlockData.length) {
          let id = 0;
          let shift = 0;
          while (true) {
            const byte = rawBlockData[bytePos++] & 0xff;
            id |= (byte & 0x7f) << shift;
            if ((byte & 0x80) === 0) break;
            shift += 7;
          }

          let processedId = id;
          if (id === airOldId) processedId = 0;
          else if (id === 0) processedId = airOldId;

          if (processedId !== 0) {
            const schemY = Math.floor(blockStateIndex / schemYSliceArea);
            const schemZ = Math.floor((blockStateIndex % schemYSliceArea) / schemWidth);
            const schemX = blockStateIndex % schemWidth;
            const key = `${schemX + schemOffset[0]},${schemY + schemOffset[1]},${schemZ + schemOffset[2]}`;
            structureBlockStates.set(key, processedId);
          }
          blockStateIndex++;
        }
      }
    }

    // --- Block entities ---
    const structureBlockEntities = new Map<string, string>();

    if ('BlockEntities' in fileBase) {
      const fileMetaData: any = fileBase['Metadata'].value;
      const schemOffset: Position = [
        fileMetaData['WEOffsetX'].value as number,
        fileMetaData['WEOffsetY'].value as number,
        fileMetaData['WEOffsetZ'].value as number,
      ];

      const blockEntitiesList: { type: string; value: any[] } = fileBase['BlockEntities'].value;

      for (const beCompound of blockEntitiesList.value) {
        const posData: number[] = beCompound['Pos'].value;
        const bePosX = posData[0] + schemOffset[0];
        const bePosY = posData[1] + schemOffset[1];
        const bePosZ = posData[2] + schemOffset[2];
        const beKey = `${bePosX},${bePosY},${bePosZ}`;

        const blockStateId = structureBlockStates.get(beKey)!;
        const blockEntityState = structurePalette.get(blockStateId) as string;

        // Build the pure compound (without Pos and Id)
        const pureCompound: Record<string, NbtTag> = {};
        for (const [k, v] of Object.entries(beCompound)) {
          if (k !== 'Pos' && k !== 'Id') {
            pureCompound[k] = prismarineTagToNbtTag(v as nbt.NBT);
          }
        }

        const nbtStr = serializeTag({ type: 'compound', value: pureCompound });
        structureBlockEntities.set(beKey, blockEntityState + nbtStr);
      }
    }

    // Assemble structure
    this._structure._blockPalette = structurePalette;
    this._structure._blockPaletteFreeId = paletteFreeId;
    this._structure._blockStates = structureBlockStates;
    this._structure._blockEntities = structureBlockEntities;
  }

  save(
    outputFolderPath: string,
    schemName: string,
    version: Version,
    fastSaving = false,
  ): void {
    const schemBounds = this._structure.getBounds();
    const schemDims = MCStructure.getStructureDimensions(schemBounds);
    const schemOffset = schemBounds[0];

    const cleanPalette = this._structure.getBlockPalette();
    const encodedBlockStates = this._getEncodedBlockStates(
      cleanPalette.size, schemDims, schemOffset, fastSaving,
    );

    const blockEntitiesCompounds = Array.from(this._structure.getBlockEntities()).map(
      ([key, beStr]) => {
        const pos = key.split(',').map(Number) as Position;
        const relPos: Position = [
          pos[0] - schemOffset[0],
          pos[1] - schemOffset[1],
          pos[2] - schemOffset[2],
        ];
        return this._blockEntityStringToSchemCompound(relPos, beStr);
      },
    );

    // Build palette NBT
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const paletteNbt: Record<string, any> = {};
    for (const [blockState, id] of cleanPalette) {
      paletteNbt[blockState] = { type: 'int', value: id };
    }

    // Build block entities NBT
    // prismarine-nbt list of compounds: value.value is array of Records (not wrapped tags)
    const beNbtList = {
      type: 'list',
      value: {
        type: 'compound',
        value: blockEntitiesCompounds,
      },
    };

    const schematicNbt = {
      type: 'compound',
      value: {
        Version: { type: 'int', value: 2 },
        DataVersion: { type: 'int', value: version },
        Metadata: {
          type: 'compound',
          value: {
            WEOffsetX: { type: 'int', value: schemOffset[0] },
            WEOffsetY: { type: 'int', value: schemOffset[1] },
            WEOffsetZ: { type: 'int', value: schemOffset[2] },
            MCSchematicMetadata: {
              type: 'compound',
              value: {
                Generated: {
                  type: 'string',
                  value: "Generated with love using Sloimay's MCSchematic Python Library, itself dependant on Valentin Berlier's nbtlib library.",
                },
              },
            },
          },
        },
        Height: { type: 'short', value: schemDims[1] },
        Length: { type: 'short', value: schemDims[2] },
        Width:  { type: 'short', value: schemDims[0] },
        PaletteMax: { type: 'int', value: cleanPalette.size },
        Palette: { type: 'compound', value: paletteNbt },
        BlockData: { type: 'byteArray', value: Array.from(encodedBlockStates) },
        BlockEntities: beNbtList,
      },
    };

    const rawNbt = nbt.writeUncompressed(
      { type: 'compound', name: 'Schematic', value: { Schematic: schematicNbt } } as unknown as nbt.NBT,
    );
    const compressed = zlib.gzipSync(rawNbt);

    const outPath =
      outputFolderPath === ''
        ? `${schemName}.schem`
        : path.join(outputFolderPath, `${schemName}.schem`);

    fs.writeFileSync(outPath, compressed);
  }

  getStructure(): MCStructure { return this._structure; }

  setBlock(position: Position, blockData: string): void {
    this._structure.setBlock(position, blockData);
  }

  getBlockStateAt(position: Position): string {
    return this._structure.getBlockStateAt(position);
  }

  getBlockDataAt(position: Position): string {
    return this._structure.getBlockDataAt(position);
  }

  placeSchematic(incomingSchematic: MCSchematic, placePosition: Position): MCSchematic {
    this._structure.placeStructure(incomingSchematic.getStructure(), placePosition);
    return this;
  }

  placeStructure(incomingStructure: MCStructure, placePosition: Position): MCSchematic {
    this._structure.placeStructure(incomingStructure, placePosition);
    return this;
  }

  makeCopy(): MCSchematic {
    return new MCSchematic(this._structure.makeCopy());
  }

  getSubSchematic(corner1: Position, corner2: Position, reCenter = false): MCSchematic {
    return new MCSchematic(this._structure.getSubStructure(corner1, corner2, reCenter));
  }

  // --- Private ---

  private _blockEntityStringToSchemCompound(
    blockEntityPosition: Position,
    blockEntityString: string,
  ): Record<string, nbt.NBT> {
    const firstCurly = blockEntityString.indexOf('{');
    const nbtPortion = blockEntityString.slice(firstCurly);

    const parsed = parseSnbt(nbtPortion) as { type: 'compound'; value: Record<string, NbtTag> };
    const out: Record<string, nbt.NBT> = {};

    for (const [k, v] of Object.entries(parsed.value)) {
      out[k] = nbtTagToPrismarine(v);
    }

    // Add Pos — prismarine intArray expects number[]
    out['Pos'] = { type: 'intArray', value: Array.from(blockEntityPosition) } as unknown as nbt.NBT;

    // Add Id
    const firstSquare = blockEntityString.indexOf('[');
    const idEnd =
      firstSquare === -1 || firstCurly < firstSquare ? firstCurly : firstSquare;
    out['Id'] = { type: 'string', value: blockEntityString.slice(0, idEnd) } as unknown as nbt.NBT;

    return out;
  }

  private _getEncodedBlockStates(
    paletteLen: number,
    schemDims: Position,
    schemOffset: Position,
    fastSaving: boolean,
  ): Int8Array {
    const [width, height, length] = schemDims;
    const volume = height * length * width;
    const ySliceArea = width * length;

    if (paletteLen <= 128) {
      const buf = new Int8Array(volume);
      for (const [key, paletteId] of this._structure.getBlockStates()) {
        const parts = key.split(',').map(Number);
        const rx = parts[0] - schemOffset[0];
        const ry = parts[1] - schemOffset[1];
        const rz = parts[2] - schemOffset[2];
        buf[ry * ySliceArea + rz * width + rx] = paletteId;
      }
      return buf;
    }

    if (!fastSaving) {
      const intToVarint = new Map<number, number[]>();
      for (let i = 0; i < paletteLen; i++) {
        intToVarint.set(i, encodeVarint(i));
      }

      const blockStates = this._structure.getBlockStates();
      const chunks: number[] = [];

      for (let y = 0; y < height; y++) {
        for (let z = 0; z < length; z++) {
          for (let x = 0; x < width; x++) {
            const key = `${schemOffset[0] + x},${schemOffset[1] + y},${schemOffset[2] + z}`;
            const id = blockStates.has(key) ? blockStates.get(key)! : 0;
            for (const b of intToVarint.get(id)!) chunks.push(b);
          }
        }
      }

      return new Int8Array(chunks);
    }

    // Fast saving
    const bitsNeeded = Math.floor(Math.log2(Math.max(paletteLen - 1, 1)) + 1);
    const bytesNeeded = Math.ceil(bitsNeeded / 7);

    const intToVarint = new Map<number, number[]>();
    for (let i = 0; i < paletteLen; i++) {
      intToVarint.set(i, encodeVarintFixedLen(i, bytesNeeded));
    }

    const airBytes = [...new Array(bytesNeeded - 1).fill(0x80), 0x00];
    const buf = new Int8Array(volume * bytesNeeded);
    for (let i = 0; i < volume; i++) {
      for (let b = 0; b < bytesNeeded; b++) {
        buf[i * bytesNeeded + b] = airBytes[b];
      }
    }

    const xSpan = bytesNeeded;
    const zSpan = width * xSpan;
    const ySpan = length * zSpan;

    for (const [key, paletteId] of this._structure.getBlockStates()) {
      const parts = key.split(',').map(Number);
      const rx = parts[0] - schemOffset[0];
      const ry = parts[1] - schemOffset[1];
      const rz = parts[2] - schemOffset[2];
      const bytePos = ySpan * ry + zSpan * rz + xSpan * rx;
      const varint = intToVarint.get(paletteId)!;
      for (let b = 0; b < bytesNeeded; b++) {
        buf[bytePos + b] = varint[b];
      }
    }

    return buf;
  }
}

// ---------------------------------------------------------------------------
// Varint helpers
// ---------------------------------------------------------------------------

function encodeVarint(n: number): number[] {
  const out: number[] = [];
  while (true) {
    if ((n & ~0x7f) === 0) { out.push(n); return out; }
    out.push((n & 0x7f) | 0x80);
    n = ((n & 0xffffffff) >>> 7);
  }
}

function encodeVarintFixedLen(n: number, length: number): number[] {
  const out: number[] = [];
  for (let i = 0; i < length; i++) {
    const continueBit = i < length - 1 ? 0x80 : 0x00;
    out.push((n & 0x7f) | continueBit);
    n = ((n & 0xffffffff) >>> 7);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Tag conversion helpers
// ---------------------------------------------------------------------------

function prismarineTagToNbtTag(tag: nbt.NBT): NbtTag {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = tag as any;
  switch (t.type) {
    case 'byte':   return { type: 'byte',   value: t.value as number };
    case 'short':  return { type: 'short',  value: t.value as number };
    case 'int':    return { type: 'int',    value: t.value as number };
    case 'long':   return { type: 'long',   value: t.value as [number, number] };
    case 'float':  return { type: 'float',  value: t.value as number };
    case 'double': return { type: 'double', value: t.value as number };
    case 'string': return { type: 'string', value: t.value as string };
    case 'byteArray': {
      const raw: number[] = t.value;
      return { type: 'byteArray', value: new Int8Array(raw) };
    }
    case 'intArray': {
      const raw: number[] = t.value;
      return { type: 'intArray', value: new Int32Array(raw) };
    }
    case 'compound': {
      const val: Record<string, NbtTag> = {};
      for (const [k, v] of Object.entries(t.value as Record<string, nbt.NBT>)) {
        val[k] = prismarineTagToNbtTag(v);
      }
      return { type: 'compound', value: val };
    }
    case 'list': {
      const listVal: { type: string; value: nbt.NBT[] } = t.value;
      return {
        type: 'list',
        value: { type: listVal.type, value: listVal.value.map(prismarineTagToNbtTag) },
      };
    }
    default: return { type: 'string', value: String(t.value) };
  }
}

function nbtTagToPrismarine(tag: NbtTag): nbt.NBT {
  switch (tag.type) {
    case 'byte':   return { type: 'byte',   value: tag.value } as unknown as nbt.NBT;
    case 'short':  return { type: 'short',  value: tag.value } as unknown as nbt.NBT;
    case 'int':    return { type: 'int',    value: tag.value } as unknown as nbt.NBT;
    case 'long':   return { type: 'long',   value: tag.value } as unknown as nbt.NBT;
    case 'float':  return { type: 'float',  value: tag.value } as unknown as nbt.NBT;
    case 'double': return { type: 'double', value: tag.value } as unknown as nbt.NBT;
    case 'string': return { type: 'string', value: tag.value } as unknown as nbt.NBT;
    case 'byteArray': {
      return { type: 'byteArray', value: Array.from(tag.value) } as unknown as nbt.NBT;
    }
    case 'intArray': {
      return { type: 'intArray', value: Array.from(tag.value) } as unknown as nbt.NBT;
    }
    case 'compound': {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const val: Record<string, any> = {};
      for (const [k, v] of Object.entries(tag.value)) {
        val[k] = nbtTagToPrismarine(v);
      }
      return { type: 'compound', value: val } as unknown as nbt.NBT;
    }
    case 'list': {
      // prismarine-nbt list elements are the unwrapped .value, not full tag objects
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const elements = tag.value.value.map((v) => (nbtTagToPrismarine(v) as any).value);
      return {
        type: 'list',
        value: { type: tag.value.type, value: elements },
      } as unknown as nbt.NBT;
    }
    default: return { type: 'string', value: String((tag as {value: unknown}).value) } as unknown as nbt.NBT;
  }
}
