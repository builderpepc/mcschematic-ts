### mcschematic-ts

A TypeScript port of [mcschematic](https://github.com/Sloimayyy/mcschematic), a library for creating and manipulating Minecraft Java Edition `.schem` (WorldEdit schematic) files.

#### What is a Minecraft schematic?

Mods like [WorldEdit](https://worldedit.enginehub.org/en/latest/) use schematic files to save an area of the world so it can be shared and reused in other worlds. A schematic is essentially a list of blocks saved to disk. Schematic files are **Minecraft Java Edition only**.

#### Install

```
npm install mcschematic-ts
```

#### Workflow

- **Instantiate** an `MCSchematic` object
- **Place** blocks into it
- **Save** it as a `.schem` file

#### Example

```typescript
import { MCSchematic, Version } from 'mcschematic-ts';

const schem = new MCSchematic();

schem.setBlock([0, -1, 0], 'minecraft:stone');

schem.save('myschems', 'my_cool_schematic', Version.JE_1_21_1);
```

`setBlock` takes a `[x, y, z]` coordinate tuple and a blockData string. Coordinates are relative to where the schematic is placed in-world, so `[0, -1, 0]` is one block below the player.

A blockData string is the same format Minecraft uses in commands like `/setblock`:
- `minecraft:oak_log[axis=z]` — an oak log along the Z axis
- `minecraft:chest[]{Items:[{Slot:0b,Count:1b,id:"minecraft:redstone"}]}` — a chest with one redstone in slot 0

`save(outputFolderPath, schemName, version)` writes `<schemName>.schem` into `outputFolderPath`. Use the `Version` enum to specify the target Minecraft version (every Java Edition version from 1.9 to 1.21.5 is available).

#### Size note

A schematic stores every block in the bounding cuboid between the lowest and highest occupied coordinate. Two blocks at `[0,0,0]` and `[19,19,19]` produce a 20x20x20 = 8000 block file. Place blocks close together.

#### BlockDataDB

`BlockDataDB` is a static class containing pre-built blockData strings for every vanilla container, each with a configurable comparator signal strength. Useful for computational redstone builds.

```typescript
import { BlockDataDB } from 'mcschematic-ts';

schem.setBlock([0, 0, 0], BlockDataDB.CHEST.fromSS(5));   // chest outputting signal strength 5
schem.setBlock([1, 0, 0], BlockDataDB.HOPPER.fromSS(12)); // hopper outputting signal strength 12
```

Available containers: `CHEST`, `TRAPPED_CHEST`, `HOPPER`, `DISPENSER`, `DROPPER`, `SHULKER_BOX`, `FURNACE`, `SMOKER`, `BLAST_FURNACE`.

#### MCSchematic methods

- `setBlock(pos, blockData)` — place a block
- `getBlockStateAt(pos)` — return the block state at a position (without NBT)
- `getBlockDataAt(pos)` — return the full blockData including NBT
- `placeSchematic(incoming, placePosition)` — merge another schematic into this one at an offset
- `placeStructure(incoming, placePosition)` — same, but accepts an `MCStructure`
- `makeCopy()` — deep copy
- `getSubSchematic(corner1, corner2, reCenter?)` — extract the blocks within a cuboid
- `getStructure()` — access the underlying `MCStructure` directly
- `save(outputFolderPath, schemName, version)` — write to disk

#### MCStructure

Every `MCSchematic` wraps an `MCStructure`, which stores the actual block data and exposes transformation methods.

**Transform methods** (all in-place):
- `translate(offset)` — shift all blocks by a vector
- `rotateDegrees(anchorPoint, yaw, pitch?, roll?)` — rotate around an anchor point
- `rotateRadians(anchorPoint, yaw, pitch?, roll?)` — same in radians
- `flip(anchorPoint, plane)` — flip across a plane (`'xy'`, `'xz'`, or `'yz'`)
- `scale(anchorPoint, scale)` — uniform scale
- `scaleXYZ(anchorPoint, scaleX, scaleY, scaleZ)` — non-uniform scale
- `center(structureBounds)` — center around `[0,0,0]`
- `centerAround(anchorPoint, structureBounds)` — center around an arbitrary point

**Generation methods**:
- `cuboidFilled(blockData, corner1, corner2)` — fill a solid cuboid
- `cuboidHollow(blockData, corner1, corner2)` — fill only the faces
- `cuboidOutlines(blockData, corner1, corner2)` — fill only the edges

**Other**:
- `blockStateIterator()` — iterate over every non-air block
- `placeStructure(incoming, placePosition)` — merge another structure
- `getSubStructure(corner1, corner2, reCenter?)` — extract a sub-region
- `makeCopy()` — deep copy
- `getBounds()` — return the axis-aligned bounding box

#### Testing

The test suite (`tests/compare.test.ts`) is a set of parity tests that verify the TypeScript implementation produces byte-for-byte identical `.schem` output to the original Python library. Each test builds a schematic using both implementations, then decompresses and parses the NBT of each output and compares them field-by-field: palette contents, block state at every position, dimensions, WE offsets, and block entity counts.

The fixtures (`tests/fixtures/*.schem`) are pre-generated reference files produced by the Python library and committed to the repo. To regenerate them, run `python tests/generate_fixtures.py` with `mcschematic` available on the Python path.

```
npm test
```

Tests cover: single blocks, blocks with properties, blocks with NBT data, cuboid fill/hollow/outlines, multiple block entities, rotation, flip on all three planes, translate with negative coordinates, `placeSchematic`, `getSubSchematic` with recentering, `makeCopy` independence, large palettes (>128 entries, forcing varint encoding), multiple `BlockDataDB` container types, and different `Version` values.

#### License

Apache 2.0
