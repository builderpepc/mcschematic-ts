"""Generate reference .schem fixtures using the Python mcschematic library."""
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', 'mcschematic'))
import mcschematic

FIXTURES_DIR = os.path.join(os.path.dirname(__file__), 'fixtures')
os.makedirs(FIXTURES_DIR, exist_ok=True)


def fixture1_single_block():
    schem = mcschematic.MCSchematic()
    schem.setBlock((0, 0, 0), 'minecraft:stone')
    schem.save(FIXTURES_DIR, 'fixture1_single_block', mcschematic.Version.JE_1_21_1)


def fixture2_block_with_properties():
    schem = mcschematic.MCSchematic()
    schem.setBlock((0, 0, 0), 'minecraft:oak_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]')
    schem.setBlock((1, 0, 0), 'minecraft:oak_stairs[facing=south,half=top,shape=straight,waterlogged=false]')
    schem.setBlock((2, 0, 0), 'minecraft:oak_log[axis=y]')
    schem.save(FIXTURES_DIR, 'fixture2_block_with_properties', mcschematic.Version.JE_1_21_1)


def fixture3_block_with_nbt():
    schem = mcschematic.MCSchematic()
    schem.setBlock((0, 0, 0), 'minecraft:barrel[open=false,facing=up]{CustomName:\'{"italic":false,"text":"test"}\',Items:[{Count:1b,Slot:0b,id:"minecraft:diamond"}]}')
    schem.save(FIXTURES_DIR, 'fixture3_block_with_nbt', mcschematic.Version.JE_1_21_1)


def fixture4_cuboid_filled():
    schem = mcschematic.MCSchematic()
    struct = schem.getStructure()
    struct.cuboidFilled('minecraft:oak_planks', (0, 0, 0), (3, 2, 3))
    schem.save(FIXTURES_DIR, 'fixture4_cuboid_filled', mcschematic.Version.JE_1_21_1)


def fixture5_multiple_blocks():
    schem = mcschematic.MCSchematic()
    blocks = [
        ((0, 0, 0), 'minecraft:stone'),
        ((1, 0, 0), 'minecraft:dirt'),
        ((0, 1, 0), 'minecraft:grass_block[snowy=false]'),
        ((0, 0, 1), 'minecraft:cobblestone'),
        ((1, 1, 1), 'minecraft:oak_log[axis=x]'),
    ]
    for pos, block in blocks:
        schem.setBlock(pos, block)
    schem.save(FIXTURES_DIR, 'fixture5_multiple_blocks', mcschematic.Version.JE_1_21_1)


def fixture6_hopper():
    schem = mcschematic.MCSchematic()
    schem.setBlock((0, 0, 0), mcschematic.BlockDataDB.HOPPER.fromSS(7))
    schem.save(FIXTURES_DIR, 'fixture6_hopper', mcschematic.Version.JE_1_21_1)


def fixture7_rotation():
    schem = mcschematic.MCSchematic()
    schem.setBlock((0, 0, 0), 'minecraft:oak_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]')
    schem.setBlock((1, 0, 0), 'minecraft:oak_stairs[facing=east,half=bottom,shape=straight,waterlogged=false]')
    struct = schem.getStructure()
    struct.rotateDegrees((0, 0, 0), yaw=90)
    schem2 = mcschematic.MCSchematic(struct)
    schem2.save(FIXTURES_DIR, 'fixture7_rotation', mcschematic.Version.JE_1_21_1)


def fixture8_flip_xz():
    """Flip across XZ plane (reflects Y axis — no block state changes needed)."""
    schem = mcschematic.MCSchematic()
    schem.setBlock((0, 0, 0), 'minecraft:oak_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]')
    schem.setBlock((1, 0, 0), 'minecraft:oak_stairs[facing=south,half=top,shape=straight,waterlogged=false]')
    schem.setBlock((2, 0, 0), 'minecraft:stone')
    struct = schem.getStructure()
    struct.flip((0, 0, 0), 'xz')
    schem2 = mcschematic.MCSchematic(struct)
    schem2.save(FIXTURES_DIR, 'fixture8_flip_xz', mcschematic.Version.JE_1_21_1)


def fixture9_flip_xy():
    """Flip across XY plane (reflects Z axis, flips block states)."""
    schem = mcschematic.MCSchematic()
    schem.setBlock((0, 0, 0), 'minecraft:oak_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]')
    schem.setBlock((1, 0, 0), 'minecraft:oak_stairs[facing=south,half=bottom,shape=straight,waterlogged=false]')
    schem.setBlock((0, 0, 2), 'minecraft:stone')
    struct = schem.getStructure()
    struct.flip((0, 0, 0), 'xy')
    schem2 = mcschematic.MCSchematic(struct)
    schem2.save(FIXTURES_DIR, 'fixture9_flip_xy', mcschematic.Version.JE_1_21_1)


def fixture10_flip_yz():
    """Flip across YZ plane (reflects X axis, flips block states)."""
    schem = mcschematic.MCSchematic()
    schem.setBlock((0, 0, 0), 'minecraft:oak_stairs[facing=east,half=bottom,shape=straight,waterlogged=false]')
    schem.setBlock((2, 0, 0), 'minecraft:oak_stairs[facing=west,half=bottom,shape=straight,waterlogged=false]')
    schem.setBlock((4, 0, 0), 'minecraft:stone')
    struct = schem.getStructure()
    struct.flip((0, 0, 0), 'yz')
    schem2 = mcschematic.MCSchematic(struct)
    schem2.save(FIXTURES_DIR, 'fixture10_flip_yz', mcschematic.Version.JE_1_21_1)


def fixture11_translate():
    """Translate (shift) all blocks by a vector including negative coords."""
    schem = mcschematic.MCSchematic()
    schem.setBlock((0, 0, 0), 'minecraft:stone')
    schem.setBlock((1, 0, 0), 'minecraft:dirt')
    schem.setBlock((0, 1, 0), 'minecraft:cobblestone')
    struct = schem.getStructure()
    struct.translate((-1, 2, -3))
    schem2 = mcschematic.MCSchematic(struct)
    schem2.save(FIXTURES_DIR, 'fixture11_translate', mcschematic.Version.JE_1_21_1)


def fixture12_place_schematic():
    """Place one schematic into another at an offset."""
    base = mcschematic.MCSchematic()
    base.setBlock((0, 0, 0), 'minecraft:stone')
    base.setBlock((1, 0, 0), 'minecraft:dirt')

    overlay = mcschematic.MCSchematic()
    overlay.setBlock((0, 0, 0), 'minecraft:gold_block')
    overlay.setBlock((0, 1, 0), 'minecraft:diamond_block')

    base.placeSchematic(overlay, (2, 0, 0))
    base.save(FIXTURES_DIR, 'fixture12_place_schematic', mcschematic.Version.JE_1_21_1)


def fixture13_get_sub_schematic():
    """Extract a sub-schematic with reCenter=True."""
    schem = mcschematic.MCSchematic()
    schem.setBlock((0, 0, 0), 'minecraft:stone')
    schem.setBlock((1, 0, 0), 'minecraft:dirt')
    schem.setBlock((2, 0, 0), 'minecraft:cobblestone')
    schem.setBlock((3, 0, 0), 'minecraft:gravel')
    schem.setBlock((4, 0, 0), 'minecraft:sand')

    sub = schem.getSubSchematic((1, 0, 0), (3, 0, 0), reCenter=True)
    sub.save(FIXTURES_DIR, 'fixture13_get_sub_schematic', mcschematic.Version.JE_1_21_1)


def fixture14_cuboid_hollow():
    """Fill a hollow cuboid."""
    schem = mcschematic.MCSchematic()
    struct = schem.getStructure()
    struct.cuboidHollow('minecraft:bricks', (0, 0, 0), (3, 3, 3))
    schem.save(FIXTURES_DIR, 'fixture14_cuboid_hollow', mcschematic.Version.JE_1_21_1)


def fixture15_cuboid_outlines():
    """Fill only the edges of a cuboid."""
    schem = mcschematic.MCSchematic()
    struct = schem.getStructure()
    struct.cuboidOutlines('minecraft:iron_block', (0, 0, 0), (3, 3, 3))
    schem.save(FIXTURES_DIR, 'fixture15_cuboid_outlines', mcschematic.Version.JE_1_21_1)


def fixture16_multiple_block_entities():
    """Multiple block entities in one schematic."""
    schem = mcschematic.MCSchematic()
    schem.setBlock((0, 0, 0), 'minecraft:barrel[open=false,facing=up]{CustomName:\'{"text":"barrel1"}\',Items:[{Count:1b,Slot:0b,id:"minecraft:diamond"}]}')
    schem.setBlock((1, 0, 0), 'minecraft:barrel[open=false,facing=up]{CustomName:\'{"text":"barrel2"}\',Items:[{Count:2b,Slot:0b,id:"minecraft:emerald"}]}')
    schem.setBlock((2, 0, 0), mcschematic.BlockDataDB.HOPPER.fromSS(3))
    schem.save(FIXTURES_DIR, 'fixture16_multiple_block_entities', mcschematic.Version.JE_1_21_1)


def fixture17_large_palette():
    """More than 128 unique block states — forces varint encoding in BlockData."""
    schem = mcschematic.MCSchematic()
    # Use different facing/half/shape combinations of stairs to get many unique states
    facings = ['north', 'south', 'east', 'west']
    halves = ['bottom', 'top']
    shapes = ['straight', 'inner_left', 'inner_right', 'outer_left', 'outer_right']
    waterlogged = ['false', 'true']
    x = 0
    for f in facings:
        for h in halves:
            for s in shapes:
                for w in waterlogged:
                    schem.setBlock((x, 0, 0), f'minecraft:oak_stairs[facing={f},half={h},shape={s},waterlogged={w}]')
                    x += 1
    # Add more blocks via different block types to exceed 128
    blocks = [
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
    ]
    for i, b in enumerate(blocks):
        schem.setBlock((x + i, 0, 0), b)
    schem.save(FIXTURES_DIR, 'fixture17_large_palette', mcschematic.Version.JE_1_21_1)


def fixture18_make_copy():
    """makeCopy produces an independent deep copy."""
    schem = mcschematic.MCSchematic()
    schem.setBlock((0, 0, 0), 'minecraft:stone')
    schem.setBlock((1, 0, 0), 'minecraft:dirt')
    copy = schem.makeCopy()
    # Mutate the copy — original must be unaffected
    copy.setBlock((2, 0, 0), 'minecraft:gold_block')
    # Save the copy (has 3 blocks)
    copy.save(FIXTURES_DIR, 'fixture18_make_copy', mcschematic.Version.JE_1_21_1)


def fixture19_different_version():
    """Save with a different Version (JE_1_18_2)."""
    schem = mcschematic.MCSchematic()
    schem.setBlock((0, 0, 0), 'minecraft:stone')
    schem.setBlock((1, 0, 0), 'minecraft:dirt')
    schem.save(FIXTURES_DIR, 'fixture19_different_version', mcschematic.Version.JE_1_18_2)


def fixture20_blockdatadb_chest():
    """BlockDataDB.CHEST with a specific signal strength."""
    schem = mcschematic.MCSchematic()
    schem.setBlock((0, 0, 0), mcschematic.BlockDataDB.CHEST.fromSS(5))
    schem.save(FIXTURES_DIR, 'fixture20_blockdatadb_chest', mcschematic.Version.JE_1_21_1)


def fixture21_blockdatadb_dispenser():
    """BlockDataDB.DISPENSER with a specific signal strength."""
    schem = mcschematic.MCSchematic()
    schem.setBlock((0, 0, 0), mcschematic.BlockDataDB.DISPENSER.fromSS(10))
    schem.save(FIXTURES_DIR, 'fixture21_blockdatadb_dispenser', mcschematic.Version.JE_1_21_1)


if __name__ == '__main__':
    fixture1_single_block()
    fixture2_block_with_properties()
    fixture3_block_with_nbt()
    fixture4_cuboid_filled()
    fixture5_multiple_blocks()
    fixture6_hopper()
    fixture7_rotation()
    fixture8_flip_xz()
    fixture9_flip_xy()
    fixture10_flip_yz()
    fixture11_translate()
    fixture12_place_schematic()
    fixture13_get_sub_schematic()
    fixture14_cuboid_hollow()
    fixture15_cuboid_outlines()
    fixture16_multiple_block_entities()
    fixture17_large_palette()
    fixture18_make_copy()
    fixture19_different_version()
    fixture20_blockdatadb_chest()
    fixture21_blockdatadb_dispenser()
    print('All fixtures generated successfully.')
