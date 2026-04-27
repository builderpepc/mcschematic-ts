import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';
import nbt from 'prismarine-nbt';
import { MCStructure, Position, Bounds } from './mc-structure';
import { Version } from './version';
import { parseSnbt, serializeTag, NbtCompound, NbtTag } from './nbt-utils';

/**
 * Public API facade for creating, loading, and saving WorldEdit `.schem` files.
 *
 * Wraps an {@link MCStructure} and exposes block-manipulation helpers alongside
 * serialisation/deserialisation logic for the Sponge Schematic v2 format
 * (gzip-compressed NBT with a `Schematic` root tag).
 *
 * Typical usage patterns:
 * - `new MCSchematic()` — start with an empty schematic.
 * - `new MCSchematic(filePath)` — load an existing `.schem` file from disk.
 * - `new MCSchematic(structure)` — wrap a pre-built {@link MCStructure}.
 * - `MCSchematic.fromBuffer(buffer)` — deserialise from an in-memory gzip Buffer.
 * - `schematic.toBuffer(version)` — serialise to an in-memory gzip Buffer without touching disk.
 */
export class MCSchematic {
  private _structure: MCStructure;

  /**
   * Creates an MCSchematic instance.
   *
   * Three overloads are supported:
   * - **No argument** — constructs an empty schematic backed by a blank {@link MCStructure}.
   * - **`string` argument** — treats the value as a file-system path and attempts to load the
   *   `.schem` file at that location. If the file does not exist or does not end with `.schem`
   *   the instance falls back to an empty schematic silently.
   * - **{@link MCStructure} argument** — wraps the provided structure directly without copying it.
   *
   * @param arg - Optional file path (`string`) or an existing {@link MCStructure} to wrap.
   */
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

  /**
   * Deserialises an in-memory gzip-compressed `.schem` Buffer into a new {@link MCSchematic}.
   *
   * This is the in-memory equivalent of `new MCSchematic(filePath)` and is useful when
   * the schematic bytes are already in memory (e.g. received over a network, stored in a
   * database, or produced by {@link toBuffer}).
   *
   * @param buffer - A gzip-compressed Sponge Schematic v2 buffer.
   * @returns A new {@link MCSchematic} instance populated from the buffer.
   */
  static fromBuffer(buffer: Buffer): MCSchematic {
    const schem = new MCSchematic();
    schem._initFromBuffer(buffer);
    return schem;
  }

  /**
   * Deserialises a `.schem` file from disk into this instance's backing structure.
   *
   * @param filePath - Absolute or relative path to a valid `.schem` file.
   */
  private _initFromFile(filePath: string): void {
    this._initFromBuffer(fs.readFileSync(filePath));
  }

  /**
   * Deserialises a gzip-compressed `.schem` Buffer into this instance's backing structure.
   *
   * Extracts the block palette, decodes the `BlockData` byte array (either raw single-byte
   * IDs or varint-encoded IDs depending on palette size), and reconstructs block-entity
   * data. Air is always normalised to palette ID 0 regardless of the original file ordering.
   *
   * @param compressed - A gzip-compressed Sponge Schematic v2 buffer.
   */
  private _initFromBuffer(compressed: Buffer): void {
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

  /**
   * Serialises the schematic to a gzip-compressed `.schem` file on disk.
   *
   * The output uses Sponge Schematic format v2 with a `Schematic` NBT root tag.
   * Block states are encoded as a `BlockData` byte array whose encoding depends on
   * the palette size (see {@link _getEncodedBlockStates}). Block entities are written
   * as an NBT list of compounds, each containing an `Id` string and a `Pos` int-array.
   *
   * @param outputFolderPath - Directory in which to write the file. Pass `''` to write
   *   into the current working directory.
   * @param schemName - File name without extension. The `.schem` suffix is appended
   *   automatically (e.g. `'my_build'` → `my_build.schem`).
   * @param version - Minecraft data version integer (see {@link Version}) written to the
   *   `DataVersion` NBT tag, used by WorldEdit to interpret block states correctly.
   * @param fastSaving - When `true`, uses a fixed-width varint encoding for palettes
   *   larger than 128 entries, which avoids per-block key look-ups at the cost of writing
   *   padding bytes. Defaults to `false` (minimal-width varint, smallest output).
   */
  save(
    outputFolderPath: string,
    schemName: string,
    version: Version,
    fastSaving = false,
  ): void {
    const compressed = this._buildBuffer(version, fastSaving);
    const outPath =
      outputFolderPath === ''
        ? `${schemName}.schem`
        : path.join(outputFolderPath, `${schemName}.schem`);
    fs.writeFileSync(outPath, compressed);
  }

  /**
   * Serialises the schematic to an in-memory gzip-compressed Buffer without writing
   * any files to disk.
   *
   * The buffer format is identical to what {@link save} writes: Sponge Schematic v2,
   * gzip-compressed NBT with a `Schematic` root tag. It can be passed directly to
   * {@link fromBuffer} to round-trip the schematic entirely in memory.
   *
   * @param version - Minecraft data version integer (see {@link Version}) written to the
   *   `DataVersion` NBT tag, used by WorldEdit to interpret block states correctly.
   * @param fastSaving - When `true`, uses fixed-width varint encoding for palettes larger
   *   than 128 entries. Defaults to `false` (minimal-width varint, smallest output).
   * @returns A gzip-compressed Sponge Schematic v2 buffer.
   */
  toBuffer(version: Version, fastSaving = false): Buffer {
    return this._buildBuffer(version, fastSaving);
  }

  /** Returns the underlying {@link MCStructure} that backs this schematic. */
  getStructure(): MCStructure { return this._structure; }

  /**
   * Places a block at the given world position.
   *
   * @param position - `[x, y, z]` coordinates.
   * @param blockData - Block-state string, e.g. `'minecraft:stone'` or
   *   `'minecraft:chest[facing=north]{Items:[...]}'`.
   */
  setBlock(position: Position, blockData: string): void {
    this._structure.setBlock(position, blockData);
  }

  /**
   * Returns the block-state string (without NBT) at the given position.
   *
   * @param position - `[x, y, z]` coordinates.
   * @returns The block-state string, e.g. `'minecraft:chest[facing=north]'`,
   *   or `'minecraft:air'` if nothing has been placed there.
   */
  getBlockStateAt(position: Position): string {
    return this._structure.getBlockStateAt(position);
  }

  /**
   * Returns the full block-data string (block state + optional NBT) at the given position.
   *
   * @param position - `[x, y, z]` coordinates.
   * @returns The full block-data string including any appended SNBT compound, e.g.
   *   `'minecraft:chest[facing=north]{Items:[...]}'`.
   */
  getBlockDataAt(position: Position): string {
    return this._structure.getBlockDataAt(position);
  }

  /**
   * Merges another {@link MCSchematic} into this one, placing it at `placePosition`.
   *
   * Blocks from `incomingSchematic` overwrite existing blocks where they overlap.
   *
   * @param incomingSchematic - The schematic whose blocks will be copied in.
   * @param placePosition - World-space `[x, y, z]` origin at which to paste the incoming schematic.
   * @returns `this`, enabling method chaining.
   */
  placeSchematic(incomingSchematic: MCSchematic, placePosition: Position): MCSchematic {
    this._structure.placeStructure(incomingSchematic.getStructure(), placePosition);
    return this;
  }

  /**
   * Merges a raw {@link MCStructure} into this schematic at `placePosition`.
   *
   * @param incomingStructure - The structure whose blocks will be copied in.
   * @param placePosition - World-space `[x, y, z]` origin at which to paste the structure.
   * @returns `this`, enabling method chaining.
   */
  placeStructure(incomingStructure: MCStructure, placePosition: Position): MCSchematic {
    this._structure.placeStructure(incomingStructure, placePosition);
    return this;
  }

  /**
   * Creates a deep copy of this schematic.
   *
   * @returns A new {@link MCSchematic} instance with an independent copy of the
   *   underlying structure.
   */
  makeCopy(): MCSchematic {
    return new MCSchematic(this._structure.makeCopy());
  }

  /**
   * Extracts a rectangular sub-region of this schematic.
   *
   * @param corner1 - One corner of the bounding box (inclusive).
   * @param corner2 - The opposite corner of the bounding box (inclusive).
   * @param reCenter - When `true`, shifts all block coordinates so the sub-region
   *   starts at the origin. Defaults to `false`.
   * @returns A new {@link MCSchematic} containing only the blocks within the specified region.
   */
  getSubSchematic(corner1: Position, corner2: Position, reCenter = false): MCSchematic {
    return new MCSchematic(this._structure.getSubStructure(corner1, corner2, reCenter));
  }

  // --- Private ---

  /**
   * Builds and returns the gzip-compressed Sponge Schematic v2 buffer for this schematic.
   * Shared by {@link save} (which writes it to disk) and {@link toBuffer} (which returns it).
   *
   * @param version - Minecraft data version integer written to the `DataVersion` NBT tag.
   * @param fastSaving - Selects fixed-width varint encoding when `true`.
   * @returns A gzip-compressed buffer ready to be written to a `.schem` file or kept in memory.
   */
  private _buildBuffer(version: Version, fastSaving: boolean): Buffer {
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
    return zlib.gzipSync(rawNbt);
  }

  /**
   * Converts an internal block-entity data string into the prismarine-nbt compound
   * format required by the Sponge Schematic `BlockEntities` list.
   *
   * The `blockEntityString` has the form `<blockStateId>[stateProps]{nbtData}`, e.g.
   * `minecraft:chest[facing=north]{Items:[...]}`. This method:
   * 1. Strips the block-state prefix to extract the `Id` value.
   * 2. Parses the trailing SNBT compound and converts every tag from the internal
   *    {@link NbtTag} representation to prismarine-nbt's {@link nbt.NBT} format via
   *    {@link nbtTagToPrismarine}.
   * 3. Injects a `Pos` int-array tag containing the relative position and an `Id`
   *    string tag containing the block's namespaced identifier.
   *
   * @param blockEntityPosition - Schematic-relative `[x, y, z]` position of the block entity.
   * @param blockEntityString - Internal block-data string for the block entity.
   * @returns A prismarine-nbt compound record ready to be written into the NBT list.
   */
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

  /**
   * Encodes the schematic's block-state grid into the `BlockData` byte array.
   *
   * The encoding strategy depends on the palette size:
   *
   * - **≤ 128 entries** — each block occupies exactly 1 byte. Palette IDs fit in 7 bits
   *   so no continuation bit is needed and the array length equals the schematic volume.
   *
   * - **> 128 entries, `fastSaving = false`** — each block is encoded as a minimal-width
   *   unsigned varint (variable number of bytes). The array is iterated in `y → z → x`
   *   order and the varint bytes are appended sequentially.
   *
   * - **> 128 entries, `fastSaving = true`** — uses a fixed-width varint whose byte
   *   count is determined by the number of bits required for `paletteLen - 1`. This
   *   allows direct index arithmetic (`bytePos = ry*ySpan + rz*zSpan + rx*xSpan`) and
   *   avoids iterating over all positions for air blocks, at the cost of slightly larger
   *   output when many IDs are small.
   *
   * @param paletteLen - Number of entries in the clean (compacted) block palette.
   * @param schemDims - `[width, height, length]` dimensions of the schematic bounding box.
   * @param schemOffset - `[x, y, z]` world-space origin of the bounding box, used to
   *   convert absolute block-state keys back to relative indices.
   * @param fastSaving - Selects fixed-width varint encoding when `true`.
   * @returns A signed byte array (`Int8Array`) suitable for the NBT `byteArray` tag.
   */
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

/**
 * Encodes a non-negative integer as a minimal-width unsigned varint.
 *
 * Each output byte stores 7 bits of the value in its low bits. The most-significant
 * bit (0x80) is set on every byte except the last, signalling that more bytes follow.
 * The least-significant group of 7 bits is emitted first (little-endian bit order).
 *
 * Examples: `0` → `[0x00]`, `128` → `[0x80, 0x01]`, `300` → `[0xAC, 0x02]`.
 *
 * @param n - The non-negative integer to encode.
 * @returns An array of bytes representing the varint.
 */
function encodeVarint(n: number): number[] {
  const out: number[] = [];
  while (true) {
    if ((n & ~0x7f) === 0) { out.push(n); return out; }
    out.push((n & 0x7f) | 0x80);
    n = ((n & 0xffffffff) >>> 7);
  }
}

/**
 * Encodes a non-negative integer as a fixed-width unsigned varint.
 *
 * Uses the same 7-bits-per-byte, LSB-first scheme as {@link encodeVarint}, but always
 * emits exactly `length` bytes regardless of the value's magnitude. The continuation
 * bit (0x80) is set on all bytes except the final one, even if the remaining bits are
 * zero. This allows O(1) random access into a packed block-state array.
 *
 * @param n - The non-negative integer to encode.
 * @param length - The exact number of bytes to emit.
 * @returns An array of exactly `length` bytes representing the fixed-width varint.
 */
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

/**
 * Converts a prismarine-nbt {@link nbt.NBT} tag into the internal {@link NbtTag}
 * representation used by this library's SNBT utilities.
 *
 * Handles all standard NBT tag types: `byte`, `short`, `int`, `long`, `float`,
 * `double`, `string`, `byteArray`, `intArray`, `compound`, and `list`. Unknown types
 * are coerced to a `string` tag as a fallback. Typed arrays (`byteArray`, `intArray`)
 * are converted from plain `number[]` to `Int8Array` / `Int32Array` respectively.
 * `compound` and `list` children are converted recursively.
 *
 * @param tag - A prismarine-nbt tag object with `{ type, value }` shape.
 * @returns The equivalent {@link NbtTag} for use with {@link serializeTag} and friends.
 */
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

/**
 * Converts an internal {@link NbtTag} into a prismarine-nbt {@link nbt.NBT} tag.
 *
 * This is the inverse of {@link prismarineTagToNbtTag}. It is used when building
 * the NBT tree that is handed to `prismarine-nbt`'s `writeUncompressed` for
 * serialisation. Key differences from the inverse direction:
 * - `byteArray` / `intArray` typed arrays are spread into plain `number[]` because
 *   prismarine-nbt expects raw arrays.
 * - `list` elements are unwrapped to their `.value` only (prismarine-nbt's list format
 *   stores unwrapped element values rather than full tag objects in `value.value`).
 * - Unknown types fall back to a `string` tag.
 *
 * @param tag - An internal {@link NbtTag} produced by {@link parseSnbt} or related utils.
 * @returns The equivalent prismarine-nbt {@link nbt.NBT} tag.
 */
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
