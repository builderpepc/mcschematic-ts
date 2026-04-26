import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';
import nbt from 'prismarine-nbt';
import { MCSchematic, MCStructure, BlockDataDB, Version } from '../src/index';

const FIXTURES = path.join(__dirname, 'fixtures');

function loadSchem(filePath: string): any {
  const compressed = fs.readFileSync(filePath);
  const raw = zlib.gunzipSync(compressed);
  const parsed = nbt.parseUncompressed(raw);
  const root = parsed.value as any;
  return 'Schematic' in root ? root['Schematic'].value : root;
}

function saveToBuffer(schem: MCSchematic, version = Version.JE_1_21_1): any {
  const tmpPath = path.join(FIXTURES, '_tmp_test.schem');
  schem.save(FIXTURES, '_tmp_test', version);
  const data = loadSchem(tmpPath);
  fs.unlinkSync(tmpPath);
  return data;
}

function comparePalettes(pyData: any, tsData: any): void {
  const pyPalette: Record<string, number> = {};
  for (const [k, v] of Object.entries(pyData['Palette'].value as any)) {
    pyPalette[k] = (v as any).value as number;
  }
  const tsPalette: Record<string, number> = {};
  for (const [k, v] of Object.entries(tsData['Palette'].value as any)) {
    tsPalette[k] = (v as any).value as number;
  }
  expect(new Set(Object.keys(tsPalette))).toEqual(new Set(Object.keys(pyPalette)));
}

function compareBlockData(pyData: any, tsData: any): void {
  const pyPaletteMap: Record<number, string> = {};
  for (const [k, v] of Object.entries(pyData['Palette'].value as any)) {
    pyPaletteMap[(v as any).value as number] = k;
  }
  const tsPaletteMap: Record<number, string> = {};
  for (const [k, v] of Object.entries(tsData['Palette'].value as any)) {
    tsPaletteMap[(v as any).value as number] = k;
  }

  const height = pyData['Height'].value as number;
  const length = pyData['Length'].value as number;
  const width = pyData['Width'].value as number;
  const ySlice = width * length;

  const pyBlockData: number[] = pyData['BlockData'].value;
  const tsBlockData: number[] = tsData['BlockData'].value;

  const pyMeta = pyData['Metadata'].value;
  const tsMeta = tsData['Metadata'].value;

  expect(tsData['Height'].value).toBe(pyData['Height'].value);
  expect(tsData['Length'].value).toBe(pyData['Length'].value);
  expect(tsData['Width'].value).toBe(pyData['Width'].value);
  expect(tsMeta['WEOffsetX'].value).toBe(pyMeta['WEOffsetX'].value);
  expect(tsMeta['WEOffsetY'].value).toBe(pyMeta['WEOffsetY'].value);
  expect(tsMeta['WEOffsetZ'].value).toBe(pyMeta['WEOffsetZ'].value);

  for (let y = 0; y < height; y++) {
    for (let z = 0; z < length; z++) {
      for (let x = 0; x < width; x++) {
        const idx = y * ySlice + z * width + x;
        const pyId = pyBlockData[idx] & 0xff;
        const tsId = tsBlockData[idx] & 0xff;
        const pyState = pyPaletteMap[pyId] ?? 'minecraft:air';
        const tsState = tsPaletteMap[tsId] ?? 'minecraft:air';
        expect(tsState).toBe(pyState);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test('fixture1: single block', () => {
  const pyData = loadSchem(path.join(FIXTURES, 'fixture1_single_block.schem'));

  const schem = new MCSchematic();
  schem.setBlock([0, 0, 0], 'minecraft:stone');
  const tsData = saveToBuffer(schem);

  comparePalettes(pyData, tsData);
  compareBlockData(pyData, tsData);
});

test('fixture2: blocks with properties', () => {
  const pyData = loadSchem(path.join(FIXTURES, 'fixture2_block_with_properties.schem'));

  const schem = new MCSchematic();
  schem.setBlock([0, 0, 0], 'minecraft:oak_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]');
  schem.setBlock([1, 0, 0], 'minecraft:oak_stairs[facing=south,half=top,shape=straight,waterlogged=false]');
  schem.setBlock([2, 0, 0], 'minecraft:oak_log[axis=y]');
  const tsData = saveToBuffer(schem);

  comparePalettes(pyData, tsData);
  compareBlockData(pyData, tsData);
});

test('fixture3: block with NBT entity', () => {
  const pyData = loadSchem(path.join(FIXTURES, 'fixture3_block_with_nbt.schem'));

  const schem = new MCSchematic();
  schem.setBlock([0, 0, 0], `minecraft:barrel[open=false,facing=up]{CustomName:'{"italic":false,"text":"test"}',Items:[{Count:1b,Slot:0b,id:"minecraft:diamond"}]}`);
  const tsData = saveToBuffer(schem);

  comparePalettes(pyData, tsData);
  compareBlockData(pyData, tsData);

  const pyBeList = pyData['BlockEntities'].value as any;
  const tsBeList = tsData['BlockEntities'].value as any;
  expect(tsBeList.value.length).toBe(pyBeList.value.length);
});

test('fixture4: cuboid filled', () => {
  const pyData = loadSchem(path.join(FIXTURES, 'fixture4_cuboid_filled.schem'));

  const schem = new MCSchematic();
  const struct = schem.getStructure();
  struct.cuboidFilled('minecraft:oak_planks', [0, 0, 0], [3, 2, 3]);
  const tsData = saveToBuffer(schem);

  comparePalettes(pyData, tsData);
  compareBlockData(pyData, tsData);
});

test('fixture5: multiple blocks', () => {
  const pyData = loadSchem(path.join(FIXTURES, 'fixture5_multiple_blocks.schem'));

  const schem = new MCSchematic();
  const blocks: Array<[[number, number, number], string]> = [
    [[0, 0, 0], 'minecraft:stone'],
    [[1, 0, 0], 'minecraft:dirt'],
    [[0, 1, 0], 'minecraft:grass_block[snowy=false]'],
    [[0, 0, 1], 'minecraft:cobblestone'],
    [[1, 1, 1], 'minecraft:oak_log[axis=x]'],
  ];
  for (const [pos, block] of blocks) {
    schem.setBlock(pos, block);
  }
  const tsData = saveToBuffer(schem);

  comparePalettes(pyData, tsData);
  compareBlockData(pyData, tsData);
});

test('fixture6: hopper with items (BlockDataDB)', () => {
  const pyData = loadSchem(path.join(FIXTURES, 'fixture6_hopper.schem'));

  const schem = new MCSchematic();
  schem.setBlock([0, 0, 0], BlockDataDB.HOPPER.fromSS(7));
  const tsData = saveToBuffer(schem);

  comparePalettes(pyData, tsData);
  compareBlockData(pyData, tsData);

  const pyBeList = pyData['BlockEntities'].value as any;
  const tsBeList = tsData['BlockEntities'].value as any;
  expect(tsBeList.value.length).toBe(pyBeList.value.length);
});

test('fixture7: rotation', () => {
  const pyData = loadSchem(path.join(FIXTURES, 'fixture7_rotation.schem'));

  const schem = new MCSchematic();
  schem.setBlock([0, 0, 0], 'minecraft:oak_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]');
  schem.setBlock([1, 0, 0], 'minecraft:oak_stairs[facing=east,half=bottom,shape=straight,waterlogged=false]');
  const struct = schem.getStructure();
  struct.rotateDegrees([0, 0, 0], 90);
  const schem2 = new MCSchematic(struct);
  const tsData = saveToBuffer(schem2);

  comparePalettes(pyData, tsData);
  compareBlockData(pyData, tsData);
});

test('fixture8: flip XZ plane', () => {
  const pyData = loadSchem(path.join(FIXTURES, 'fixture8_flip_xz.schem'));

  const schem = new MCSchematic();
  schem.setBlock([0, 0, 0], 'minecraft:oak_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]');
  schem.setBlock([1, 0, 0], 'minecraft:oak_stairs[facing=south,half=top,shape=straight,waterlogged=false]');
  schem.setBlock([2, 0, 0], 'minecraft:stone');
  const struct = schem.getStructure();
  struct.flip([0, 0, 0], 'xz');
  const schem2 = new MCSchematic(struct);
  const tsData = saveToBuffer(schem2);

  comparePalettes(pyData, tsData);
  compareBlockData(pyData, tsData);
});

test('fixture9: flip XY plane', () => {
  const pyData = loadSchem(path.join(FIXTURES, 'fixture9_flip_xy.schem'));

  const schem = new MCSchematic();
  schem.setBlock([0, 0, 0], 'minecraft:oak_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]');
  schem.setBlock([1, 0, 0], 'minecraft:oak_stairs[facing=south,half=bottom,shape=straight,waterlogged=false]');
  schem.setBlock([0, 0, 2], 'minecraft:stone');
  const struct = schem.getStructure();
  struct.flip([0, 0, 0], 'xy');
  const schem2 = new MCSchematic(struct);
  const tsData = saveToBuffer(schem2);

  comparePalettes(pyData, tsData);
  compareBlockData(pyData, tsData);
});

test('fixture10: flip YZ plane', () => {
  const pyData = loadSchem(path.join(FIXTURES, 'fixture10_flip_yz.schem'));

  const schem = new MCSchematic();
  schem.setBlock([0, 0, 0], 'minecraft:oak_stairs[facing=east,half=bottom,shape=straight,waterlogged=false]');
  schem.setBlock([2, 0, 0], 'minecraft:oak_stairs[facing=west,half=bottom,shape=straight,waterlogged=false]');
  schem.setBlock([4, 0, 0], 'minecraft:stone');
  const struct = schem.getStructure();
  struct.flip([0, 0, 0], 'yz');
  const schem2 = new MCSchematic(struct);
  const tsData = saveToBuffer(schem2);

  comparePalettes(pyData, tsData);
  compareBlockData(pyData, tsData);
});

test('fixture11: translate with negative coordinates', () => {
  const pyData = loadSchem(path.join(FIXTURES, 'fixture11_translate.schem'));

  const schem = new MCSchematic();
  schem.setBlock([0, 0, 0], 'minecraft:stone');
  schem.setBlock([1, 0, 0], 'minecraft:dirt');
  schem.setBlock([0, 1, 0], 'minecraft:cobblestone');
  const struct = schem.getStructure();
  struct.translate([-1, 2, -3]);
  const schem2 = new MCSchematic(struct);
  const tsData = saveToBuffer(schem2);

  comparePalettes(pyData, tsData);
  compareBlockData(pyData, tsData);
});

test('fixture12: placeSchematic merges two schematics', () => {
  const pyData = loadSchem(path.join(FIXTURES, 'fixture12_place_schematic.schem'));

  const base = new MCSchematic();
  base.setBlock([0, 0, 0], 'minecraft:stone');
  base.setBlock([1, 0, 0], 'minecraft:dirt');

  const overlay = new MCSchematic();
  overlay.setBlock([0, 0, 0], 'minecraft:gold_block');
  overlay.setBlock([0, 1, 0], 'minecraft:diamond_block');

  base.placeSchematic(overlay, [2, 0, 0]);
  const tsData = saveToBuffer(base);

  comparePalettes(pyData, tsData);
  compareBlockData(pyData, tsData);
});

test('fixture13: getSubSchematic with reCenter', () => {
  const pyData = loadSchem(path.join(FIXTURES, 'fixture13_get_sub_schematic.schem'));

  const schem = new MCSchematic();
  schem.setBlock([0, 0, 0], 'minecraft:stone');
  schem.setBlock([1, 0, 0], 'minecraft:dirt');
  schem.setBlock([2, 0, 0], 'minecraft:cobblestone');
  schem.setBlock([3, 0, 0], 'minecraft:gravel');
  schem.setBlock([4, 0, 0], 'minecraft:sand');

  const sub = schem.getSubSchematic([1, 0, 0], [3, 0, 0], true);
  const tsData = saveToBuffer(sub);

  comparePalettes(pyData, tsData);
  compareBlockData(pyData, tsData);
});

test('fixture14: cuboidHollow', () => {
  const pyData = loadSchem(path.join(FIXTURES, 'fixture14_cuboid_hollow.schem'));

  const schem = new MCSchematic();
  const struct = schem.getStructure();
  struct.cuboidHollow('minecraft:bricks', [0, 0, 0], [3, 3, 3]);
  const tsData = saveToBuffer(schem);

  comparePalettes(pyData, tsData);
  compareBlockData(pyData, tsData);
});

test('fixture15: cuboidOutlines', () => {
  const pyData = loadSchem(path.join(FIXTURES, 'fixture15_cuboid_outlines.schem'));

  const schem = new MCSchematic();
  const struct = schem.getStructure();
  struct.cuboidOutlines('minecraft:iron_block', [0, 0, 0], [3, 3, 3]);
  const tsData = saveToBuffer(schem);

  comparePalettes(pyData, tsData);
  compareBlockData(pyData, tsData);
});

test('fixture16: multiple block entities', () => {
  const pyData = loadSchem(path.join(FIXTURES, 'fixture16_multiple_block_entities.schem'));

  const schem = new MCSchematic();
  schem.setBlock([0, 0, 0], `minecraft:barrel[open=false,facing=up]{CustomName:'{"text":"barrel1"}',Items:[{Count:1b,Slot:0b,id:"minecraft:diamond"}]}`);
  schem.setBlock([1, 0, 0], `minecraft:barrel[open=false,facing=up]{CustomName:'{"text":"barrel2"}',Items:[{Count:2b,Slot:0b,id:"minecraft:emerald"}]}`);
  schem.setBlock([2, 0, 0], BlockDataDB.HOPPER.fromSS(3));
  const tsData = saveToBuffer(schem);

  comparePalettes(pyData, tsData);
  compareBlockData(pyData, tsData);

  const pyBeList = pyData['BlockEntities'].value as any;
  const tsBeList = tsData['BlockEntities'].value as any;
  expect(tsBeList.value.length).toBe(pyBeList.value.length);
});

test('fixture17: large palette (>128 entries, varint encoding)', () => {
  const pyData = loadSchem(path.join(FIXTURES, 'fixture17_large_palette.schem'));

  const schem = new MCSchematic();
  const facings = ['north', 'south', 'east', 'west'];
  const halves = ['bottom', 'top'];
  const shapes = ['straight', 'inner_left', 'inner_right', 'outer_left', 'outer_right'];
  const waterlogged = ['false', 'true'];
  let x = 0;
  for (const f of facings) {
    for (const h of halves) {
      for (const s of shapes) {
        for (const w of waterlogged) {
          schem.setBlock([x, 0, 0], `minecraft:oak_stairs[facing=${f},half=${h},shape=${s},waterlogged=${w}]`);
          x++;
        }
      }
    }
  }
  const extraBlocks = [
    'minecraft:stone', 'minecraft:dirt', 'minecraft:cobblestone', 'minecraft:gravel',
    'minecraft:sand', 'minecraft:gold_ore', 'minecraft:iron_ore', 'minecraft:coal_ore',
    'minecraft:oak_log[axis=x]', 'minecraft:oak_log[axis=y]', 'minecraft:oak_log[axis=z]',
    'minecraft:spruce_log[axis=x]', 'minecraft:spruce_log[axis=y]', 'minecraft:spruce_log[axis=z]',
    'minecraft:birch_log[axis=x]', 'minecraft:birch_log[axis=y]', 'minecraft:birch_log[axis=z]',
    'minecraft:jungle_log[axis=x]', 'minecraft:jungle_log[axis=y]', 'minecraft:jungle_log[axis=z]',
    'minecraft:acacia_log[axis=x]', 'minecraft:acacia_log[axis=y]', 'minecraft:acacia_log[axis=z]',
    'minecraft:dark_oak_log[axis=x]', 'minecraft:dark_oak_log[axis=y]', 'minecraft:dark_oak_log[axis=z]',
    'minecraft:gold_block', 'minecraft:iron_block', 'minecraft:diamond_block', 'minecraft:emerald_block',
    'minecraft:netherite_block', 'minecraft:lapis_block', 'minecraft:redstone_block', 'minecraft:quartz_block',
    'minecraft:sandstone', 'minecraft:red_sandstone', 'minecraft:prismarine', 'minecraft:sea_lantern',
    'minecraft:glowstone', 'minecraft:obsidian', 'minecraft:bedrock', 'minecraft:tnt',
    'minecraft:bookshelf', 'minecraft:mossy_cobblestone', 'minecraft:bricks', 'minecraft:clay',
    'minecraft:white_wool', 'minecraft:orange_wool', 'minecraft:magenta_wool', 'minecraft:light_blue_wool',
  ];
  for (let i = 0; i < extraBlocks.length; i++) {
    schem.setBlock([x + i, 0, 0], extraBlocks[i]);
  }
  const tsData = saveToBuffer(schem);

  // Verify palette has more than 128 entries (varint was actually needed)
  const tsPalette = tsData['Palette'].value as any;
  expect(Object.keys(tsPalette).length).toBeGreaterThan(128);

  comparePalettes(pyData, tsData);
  compareBlockData(pyData, tsData);
});

test('fixture18: makeCopy independence', () => {
  const pyData = loadSchem(path.join(FIXTURES, 'fixture18_make_copy.schem'));

  const schem = new MCSchematic();
  schem.setBlock([0, 0, 0], 'minecraft:stone');
  schem.setBlock([1, 0, 0], 'minecraft:dirt');
  const copy = schem.makeCopy();
  // Mutate the copy — original must be unaffected
  copy.setBlock([2, 0, 0], 'minecraft:gold_block');
  const tsData = saveToBuffer(copy);

  comparePalettes(pyData, tsData);
  compareBlockData(pyData, tsData);

  // Verify original was not mutated
  expect(schem.getBlockStateAt([2, 0, 0])).toBe('minecraft:air');
});

test('fixture19: different Version (JE_1_18_2)', () => {
  const pyData = loadSchem(path.join(FIXTURES, 'fixture19_different_version.schem'));

  const schem = new MCSchematic();
  schem.setBlock([0, 0, 0], 'minecraft:stone');
  schem.setBlock([1, 0, 0], 'minecraft:dirt');
  const tsData = saveToBuffer(schem, Version.JE_1_18_2);

  expect(tsData['Version'].value).toBe(pyData['Version'].value);
  expect(tsData['DataVersion'].value).toBe(pyData['DataVersion'].value);
  comparePalettes(pyData, tsData);
  compareBlockData(pyData, tsData);
});

test('fixture20: BlockDataDB.CHEST fromSS', () => {
  const pyData = loadSchem(path.join(FIXTURES, 'fixture20_blockdatadb_chest.schem'));

  const schem = new MCSchematic();
  schem.setBlock([0, 0, 0], BlockDataDB.CHEST.fromSS(5));
  const tsData = saveToBuffer(schem);

  comparePalettes(pyData, tsData);
  compareBlockData(pyData, tsData);

  const pyBeList = pyData['BlockEntities'].value as any;
  const tsBeList = tsData['BlockEntities'].value as any;
  expect(tsBeList.value.length).toBe(pyBeList.value.length);
});

test('fixture21: BlockDataDB.DISPENSER fromSS', () => {
  const pyData = loadSchem(path.join(FIXTURES, 'fixture21_blockdatadb_dispenser.schem'));

  const schem = new MCSchematic();
  schem.setBlock([0, 0, 0], BlockDataDB.DISPENSER.fromSS(10));
  const tsData = saveToBuffer(schem);

  comparePalettes(pyData, tsData);
  compareBlockData(pyData, tsData);

  const pyBeList = pyData['BlockEntities'].value as any;
  const tsBeList = tsData['BlockEntities'].value as any;
  expect(tsBeList.value.length).toBe(pyBeList.value.length);
});
