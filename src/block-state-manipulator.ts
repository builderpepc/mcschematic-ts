import { RandomUtils } from './random-utils';

type RotationType =
  | 'horizontal'
  | 'horizontal_down'
  | 'horizontal_up_down'
  | 'axis'
  | 'four_cardinal_direction_properties_that_defaults_to_none'
  | 'sign_like'
  | 'glass_pane_like'
  | 'rail'
  | 'Not found';

type RotationEntry = [endswithId: string, rotType: RotationType, isNotEndswithId: string[]];

/**
 * Static utility class that provides methods for rotating and flipping Minecraft block state
 * strings. Given a block state such as `minecraft:oak_stairs[facing=north]`, it can produce
 * the correctly transformed state after a horizontal rotation or a horizontal flip, handling
 * all the different property conventions used by the game (facing, axis, rotation, shape, and
 * per-side boolean/none properties).
 */
export class MCBlockStateManipulator {
  /**
   * Ordered list of the four horizontal facing directions used as a rotation cycle
   * (north → east → south → west → north).
   */
  private static readonly _horizontalFacingPropertyRotationList: string[] = [
    'north', 'east', 'south', 'west',
  ];

  /**
   * Lookup table that maps block ID suffixes (or full namespaced IDs) to their
   * {@link RotationType}, along with an optional exclusion list of suffixes that should
   * not be matched even if the primary suffix matches. Entries are checked in order and
   * the first match wins.
   */
  static readonly rotatableBlockIdSuffixToHorizontalRotationType: RotationEntry[] = [
    ['_stairs', 'horizontal', []],
    [':repeater', 'horizontal', []],
    [':comparator', 'horizontal', []],
    ['_wall_torch', 'horizontal', []],
    [':wall_torch', 'horizontal', []],
    [':furnace', 'horizontal', []],
    [':smoker', 'horizontal', []],
    ['_furnace', 'horizontal', []],
    [':chest', 'horizontal', []],
    ['_chest', 'horizontal', []],
    [':tripwire_hook', 'horizontal', []],
    [':lectern', 'horizontal', []],
    [':jack_o_lantern', 'horizontal', []],
    [':carved_pumpkin', 'horizontal', []],
    [':ladder', 'horizontal', []],
    ['_glazed_terracotta', 'horizontal', []],
    ['_coral_wall_fan', 'horizontal', []],
    ['_anvil', 'horizontal', []],
    ['_wall_sign', 'horizontal', []],
    ['_wall_head', 'horizontal', []],
    ['_wall_skull', 'horizontal', []],
    ['_fence_gate', 'horizontal', []],
    [':grindstone', 'horizontal', []],
    [':stone_cutter', 'horizontal', []],
    [':bell', 'horizontal', []],
    [':campfire', 'horizontal', []],
    ['_campfire', 'horizontal', []],
    ['_wall_banner', 'horizontal', []],
    [':loom', 'horizontal', []],
    [':lever', 'horizontal', []],
    ['_button', 'horizontal', []],
    ['_trapdoor', 'horizontal', []],
    ['_door', 'horizontal', []],

    [':hopper', 'horizontal_down', []],

    [':end_rod', 'horizontal_up_down', []],
    ['_shulker_box', 'horizontal_up_down', []],
    [':shulker_box', 'horizontal_up_down', []],
    ['_amethyst_bud', 'horizontal_up_down', []],
    [':amethyst_cluster', 'horizontal_up_down', []],
    [':barrel', 'horizontal_up_down', []],
    [':dropper', 'horizontal_up_down', []],
    [':dispenser', 'horizontal_up_down', []],
    [':observer', 'horizontal_up_down', []],
    [':piston', 'horizontal_up_down', []],
    ['_piston', 'horizontal_up_down', []],
    [':lightning_rod', 'horizontal_up_down', []],
    ['_command_block', 'horizontal_up_down', []],
    [':command_block', 'horizontal_up_down', []],

    ['_log', 'axis', []],
    ['_wood', 'axis', []],
    ['_stem', 'axis', [':mushroom_stem']],
    ['_hyphae', 'axis', []],
    [':chain', 'axis', []],
    [':basalt', 'axis', []],
    [':polished_basalt', 'axis', []],
    ['_pillar', 'axis', []],
    [':bone_block', 'axis', []],
    [':deepslate', 'axis', []],
    [':infected_deepslate', 'axis', []],
    ['_froglight', 'axis', []],

    ['redstone_wire', 'four_cardinal_direction_properties_that_defaults_to_none', []],
    ['_wall', 'four_cardinal_direction_properties_that_defaults_to_none', []],

    ['_sign', 'sign_like', []],
    ['_skull', 'sign_like', []],
    ['_head', 'sign_like', []],
    ['_banner', 'sign_like', []],

    [':glass_pane', 'glass_pane_like', []],
    ['_fence', 'glass_pane_like', []],
    ['_glass_pane', 'glass_pane_like', []],
    [':iron_bars', 'glass_pane_like', []],
    [':vine', 'glass_pane_like', []],
    [':glow_lichen', 'glass_pane_like', []],
    [':sculk_vein', 'glass_pane_like', []],
    [':mushroom_stem', 'glass_pane_like', []],
    ['_mushroom_block', 'glass_pane_like', []],

    [':rail', 'rail', []],
    ['_rail', 'rail', []],
  ];

  /**
   * Parses a block state properties string of the form `[key=val,key2=val2]` into a
   * plain key-value record. An empty string returns an empty record. Surrounding brackets
   * and any spaces are stripped before splitting on commas.
   *
   * @param blockStateProperties - The raw properties substring, e.g. `"[facing=north,half=top]"`,
   *   or an empty string when the block state has no properties.
   * @returns A record mapping each property name to its string value.
   */
  static parseBlockStateProperties(blockStateProperties: string): Record<string, string> {
    if (blockStateProperties === '') return {};

    const inner = blockStateProperties.slice(1, -1).replace(/ /g, '');
    const parts = inner.split(',');
    const map: Record<string, string> = {};
    for (const part of parts) {
      const eq = part.indexOf('=');
      map[part.slice(0, eq)] = part.slice(eq + 1);
    }
    return map;
  }

  /**
   * Serialises a property map back into a block state properties string, e.g.
   * `{ facing: 'north', half: 'top' }` → `"[facing=north,half=top]"`.
   * Returns an empty string when the map has no entries.
   *
   * @param propertyMap - Key-value pairs representing the block state properties.
   * @returns The formatted properties string, or `""` if there are no properties.
   */
  static propertyMapToBlockStatePropertiesString(propertyMap: Record<string, string>): string {
    if (Object.keys(propertyMap).length === 0) return '';
    return '[' + Object.entries(propertyMap).map(([k, v]) => `${k}=${v}`).join(',') + ']';
  }

  /**
   * Copies any keys from `defaultPropertyMap` that are absent in `propertyMap` into
   * `propertyMap`, mutating it in place. Used to ensure required properties have a
   * sensible default before transformation logic runs.
   *
   * @param propertyMap - The property map to fill in.
   * @param defaultPropertyMap - Source of default values for missing keys.
   */
  static fillAbsentPropertiesInPropertyMap(
    propertyMap: Record<string, string>,
    defaultPropertyMap: Record<string, string>,
  ): void {
    for (const key of Object.keys(defaultPropertyMap)) {
      if (!(key in propertyMap)) {
        propertyMap[key] = defaultPropertyMap[key];
      }
    }
  }

  /**
   * Returns the facing direction that results from rotating `horizontalFacingProperty`
   * clockwise by `ninetyDegreeTurnCount` × 90 degrees on the horizontal plane.
   *
   * @param horizontalFacingProperty - One of `"north"`, `"east"`, `"south"`, or `"west"`.
   * @param ninetyDegreeTurnCount - Number of 90-degree clockwise turns; may be negative or
   *   exceed 3 (values are wrapped with modulo 4).
   * @returns The rotated facing direction string.
   */
  static getRotatedHorizontalFacingProperty(
    horizontalFacingProperty: string,
    ninetyDegreeTurnCount: number,
  ): string {
    const rotations = MCBlockStateManipulator._horizontalFacingPropertyRotationList;
    const idx = RandomUtils.mathModulo(
      rotations.indexOf(horizontalFacingProperty) + ninetyDegreeTurnCount,
      4,
    );
    return rotations[idx];
  }

  /**
   * Returns the facing direction that results from mirroring `horizontalFacingProperty`
   * across the given plane. Directions not affected by the chosen plane are returned
   * unchanged.
   *
   * @param horizontalFacingProperty - One of `"north"`, `"east"`, `"south"`, or `"west"`.
   * @param flippingPlane - `"xy"` to mirror north/south, or `"yz"` to mirror east/west.
   * @returns The flipped facing direction string.
   */
  static getHorizontallyFlippedFacingProperty(
    horizontalFacingProperty: string,
    flippingPlane: string,
  ): string {
    if (flippingPlane === 'xy') {
      if (horizontalFacingProperty === 'north') return 'south';
      if (horizontalFacingProperty === 'south') return 'north';
    }
    if (flippingPlane === 'yz') {
      if (horizontalFacingProperty === 'east') return 'west';
      if (horizontalFacingProperty === 'west') return 'east';
    }
    return horizontalFacingProperty;
  }

  /**
   * Mirrors an ordered list of four per-side values (indexed north, east, south, west)
   * across the given plane, swapping the appropriate pair of opposing sides.
   *
   * @param sideValueList - Array of four values in [north, east, south, west] order.
   * @param flippingPlane - `"xy"` swaps north and south; `"yz"` swaps east and west.
   * @returns A new array with the relevant pair of values swapped.
   */
  static getHorizontallyFlippedSideValueList<T>(
    sideValueList: T[],
    flippingPlane: string,
  ): T[] {
    const flipped = [...sideValueList];
    if (flippingPlane === 'xy') {
      [flipped[0], flipped[2]] = [flipped[2], flipped[0]];
    }
    if (flippingPlane === 'yz') {
      [flipped[1], flipped[3]] = [flipped[3], flipped[1]];
    }
    return flipped;
  }

  /**
   * Mutates `propertyMap` in place so that its `facing` property reflects a horizontal
   * rotation, first filling any absent properties from `defaultPropertyMap`.
   *
   * @param propertyMap - The property map to rotate.
   * @param defaultPropertyMap - Default values used to fill absent properties.
   * @param ninetyDegreeTurnCount - Number of 90-degree clockwise turns to apply.
   */
  static rotateHorizontalFacingBlockStatesPropertyMap(
    propertyMap: Record<string, string>,
    defaultPropertyMap: Record<string, string>,
    ninetyDegreeTurnCount: number,
  ): void {
    MCBlockStateManipulator.fillAbsentPropertiesInPropertyMap(propertyMap, defaultPropertyMap);
    propertyMap['facing'] = MCBlockStateManipulator.getRotatedHorizontalFacingProperty(
      propertyMap['facing'],
      ninetyDegreeTurnCount,
    );
  }

  /**
   * Looks up the {@link RotationType} for the given block ID by walking
   * {@link rotatableBlockIdSuffixToHorizontalRotationType} and returning the first match.
   * Returns `"Not found"` if no entry matches.
   *
   * @param blockStateBlockId - The namespaced block ID, e.g. `"minecraft:oak_stairs"`.
   * @returns The matching {@link RotationType}, or `"Not found"`.
   */
  private static _findRotationType(blockStateBlockId: string): RotationType {
    for (const [endswithId, rotType, isNotEndswithId] of MCBlockStateManipulator.rotatableBlockIdSuffixToHorizontalRotationType) {
      if (!blockStateBlockId.endsWith(endswithId)) continue;
      if (isNotEndswithId.some((banned) => blockStateBlockId.endsWith(banned))) continue;
      return rotType;
    }
    return 'Not found';
  }

  /**
   * Returns the block state string that results from rotating `blockState` clockwise by
   * `ninetyDegreeTurnCount` × 90 degrees on the horizontal (XZ) plane.
   *
   * The method handles all supported rotation types — directional facing values, axis
   * properties, per-side properties (redstone wire, walls, glass panes, fences, vines,
   * mushroom blocks), sign/banner rotation integers, and rail shape strings. Block states
   * whose block ID is not found in the lookup table are returned unchanged.
   *
   * @param blockState - Full block state string, e.g. `"minecraft:oak_stairs[facing=north,half=bottom,shape=straight]"`.
   *   A bare block ID without properties is also accepted. The `minecraft:` namespace is
   *   inferred automatically if absent.
   * @param ninetyDegreeTurnCount - Number of 90-degree clockwise turns to apply; may be any
   *   integer (values are normalised with modulo 4 internally).
   * @returns The transformed block state string, or the original string if the block type
   *   is not recognised as rotatable.
   */
  static getHorizontallyRotatedBlockState(
    blockState: string,
    ninetyDegreeTurnCount: number,
  ): string {
    let blockStateBlockId = blockState;
    let blockStateProperties = '';
    const bracketIdx = blockState.indexOf('[');
    if (bracketIdx !== -1) {
      blockStateBlockId = blockState.slice(0, bracketIdx);
      blockStateProperties = blockState.slice(bracketIdx);
    }
    if (!blockStateBlockId.includes(':')) {
      blockStateBlockId = 'minecraft:' + blockStateBlockId;
    }

    const propertyMap = MCBlockStateManipulator.parseBlockStateProperties(blockStateProperties);
    const turnCount = RandomUtils.mathModulo(ninetyDegreeTurnCount, 4);
    const rotationType = MCBlockStateManipulator._findRotationType(blockStateBlockId);

    if (rotationType === 'Not found') return blockState;

    if (rotationType === 'horizontal') {
      if (!('facing' in propertyMap)) propertyMap['facing'] = 'north';
      propertyMap['facing'] = MCBlockStateManipulator.getRotatedHorizontalFacingProperty(
        propertyMap['facing'], ninetyDegreeTurnCount,
      );
    }

    if (rotationType === 'horizontal_down') {
      if (!('facing' in propertyMap)) propertyMap['facing'] = 'down';
      if (propertyMap['facing'] !== 'down') {
        propertyMap['facing'] = MCBlockStateManipulator.getRotatedHorizontalFacingProperty(
          propertyMap['facing'], ninetyDegreeTurnCount,
        );
      }
    }

    if (rotationType === 'horizontal_up_down') {
      if (!('facing' in propertyMap)) propertyMap['facing'] = 'north';
      if (propertyMap['facing'] !== 'down' && propertyMap['facing'] !== 'up') {
        propertyMap['facing'] = MCBlockStateManipulator.getRotatedHorizontalFacingProperty(
          propertyMap['facing'], ninetyDegreeTurnCount,
        );
      }
    }

    if (rotationType === 'axis') {
      if (!('axis' in propertyMap)) propertyMap['axis'] = 'y';
      if (propertyMap['axis'] !== 'y' && ninetyDegreeTurnCount % 2 === 1) {
        propertyMap['axis'] = propertyMap['axis'] === 'x' ? 'z' : 'x';
      }
    }

    if (rotationType === 'four_cardinal_direction_properties_that_defaults_to_none') {
      for (const dir of MCBlockStateManipulator._horizontalFacingPropertyRotationList) {
        if (!(dir in propertyMap)) propertyMap[dir] = 'none';
      }
      const sideValues = MCBlockStateManipulator._horizontalFacingPropertyRotationList.map(
        (d) => propertyMap[d],
      );
      const rotated = RandomUtils.getRotatedList(sideValues, -turnCount);
      MCBlockStateManipulator._horizontalFacingPropertyRotationList.forEach((d, i) => {
        propertyMap[d] = rotated[i];
      });
    }

    if (rotationType === 'sign_like') {
      if (!('rotation' in propertyMap)) propertyMap['rotation'] = '0';
      propertyMap['rotation'] = String(
        ((parseInt(propertyMap['rotation']) + 4 * ninetyDegreeTurnCount) % 16 + 16) % 16,
      );
    }

    if (rotationType === 'glass_pane_like') {
      for (const dir of MCBlockStateManipulator._horizontalFacingPropertyRotationList) {
        if (!(dir in propertyMap)) propertyMap[dir] = 'false';
      }
      const sideValues = MCBlockStateManipulator._horizontalFacingPropertyRotationList.map(
        (d) => propertyMap[d],
      );
      const rotated = RandomUtils.getRotatedList(sideValues, -turnCount);
      MCBlockStateManipulator._horizontalFacingPropertyRotationList.forEach((d, i) => {
        propertyMap[d] = rotated[i];
      });
    }

    if (rotationType === 'rail') {
      if (!('shape' in propertyMap)) propertyMap['shape'] = 'north_south';
      const shapeProp = propertyMap['shape'];

      if (shapeProp.startsWith('ascending_')) {
        const facingOfAscension = shapeProp.slice(shapeProp.indexOf('_') + 1);
        const newFacing = MCBlockStateManipulator.getRotatedHorizontalFacingProperty(
          facingOfAscension, ninetyDegreeTurnCount,
        );
        propertyMap['shape'] = 'ascending_' + newFacing;
      } else if (shapeProp === 'north_south' || shapeProp === 'east_west') {
        if (ninetyDegreeTurnCount % 2 === 1) {
          propertyMap['shape'] = shapeProp === 'east_west' ? 'north_south' : 'east_west';
        }
      } else {
        const dirs = shapeProp.split('_');
        const sideValues = ['north', 'east', 'south', 'west'].map((d) => dirs.includes(d));
        const rotated = RandomUtils.getRotatedList(sideValues, -turnCount);
        const firstPart = rotated[0] ? 'north' : 'south';
        const secondPart = rotated[1] ? 'east' : 'west';
        propertyMap['shape'] = firstPart + '_' + secondPart;
      }
    }

    return blockStateBlockId + MCBlockStateManipulator.propertyMapToBlockStatePropertiesString(propertyMap);
  }

  /**
   * Returns the block state string that results from mirroring `blockState` across the
   * given horizontal plane.
   *
   * Handles the same set of rotation types as {@link getHorizontallyRotatedBlockState},
   * plus two flip-specific corrections: door hinge sides are swapped, and stair corner
   * shapes (`outer_left` / `inner_right`, etc.) have their left/right suffix inverted.
   * Axis-aligned blocks (logs, pillars, etc.) are unaffected by a horizontal flip.
   * Block states whose block ID is not found in the lookup table are returned unchanged.
   *
   * @param blockState - Full block state string, e.g. `"minecraft:oak_door[facing=east,hinge=left]"`.
   *   A bare block ID without properties is also accepted. The `minecraft:` namespace is
   *   inferred automatically if absent.
   * @param flippingPlane - The plane to mirror across: `"xy"` mirrors the north/south axis,
   *   `"yz"` mirrors the east/west axis.
   * @returns The transformed block state string, or the original string if the block type
   *   is not recognised as flippable.
   */
  static getHorizontallyFlippedBlockState(
    blockState: string,
    flippingPlane: string,
  ): string {
    let blockStateBlockId = blockState;
    let blockStateProperties = '';
    const bracketIdx = blockState.indexOf('[');
    if (bracketIdx !== -1) {
      blockStateBlockId = blockState.slice(0, bracketIdx);
      blockStateProperties = blockState.slice(bracketIdx);
    }
    if (!blockStateBlockId.includes(':')) {
      blockStateBlockId = 'minecraft:' + blockStateBlockId;
    }

    const propertyMap = MCBlockStateManipulator.parseBlockStateProperties(blockStateProperties);
    const rotationType = MCBlockStateManipulator._findRotationType(blockStateBlockId);

    if (rotationType === 'Not found') return blockState;

    if (rotationType === 'horizontal') {
      if (!('facing' in propertyMap)) propertyMap['facing'] = 'north';
      propertyMap['facing'] = MCBlockStateManipulator.getHorizontallyFlippedFacingProperty(
        propertyMap['facing'], flippingPlane,
      );
    }

    if (rotationType === 'horizontal_down') {
      if (!('facing' in propertyMap)) propertyMap['facing'] = 'north';
      if (propertyMap['facing'] !== 'down') {
        propertyMap['facing'] = MCBlockStateManipulator.getHorizontallyFlippedFacingProperty(
          propertyMap['facing'], flippingPlane,
        );
      }
    }

    if (rotationType === 'horizontal_up_down') {
      if (!('facing' in propertyMap)) propertyMap['facing'] = 'north';
      if (propertyMap['facing'] !== 'down' && propertyMap['facing'] !== 'up') {
        propertyMap['facing'] = MCBlockStateManipulator.getHorizontallyFlippedFacingProperty(
          propertyMap['facing'], flippingPlane,
        );
      }
    }

    // axis blocks don't change when flipped

    if (rotationType === 'four_cardinal_direction_properties_that_defaults_to_none') {
      for (const dir of MCBlockStateManipulator._horizontalFacingPropertyRotationList) {
        if (!(dir in propertyMap)) propertyMap[dir] = 'none';
      }
      const sideValues = MCBlockStateManipulator._horizontalFacingPropertyRotationList.map(
        (d) => propertyMap[d],
      );
      const flipped = MCBlockStateManipulator.getHorizontallyFlippedSideValueList(
        sideValues, flippingPlane,
      );
      MCBlockStateManipulator._horizontalFacingPropertyRotationList.forEach((d, i) => {
        propertyMap[d] = flipped[i];
      });
    }

    if (rotationType === 'sign_like') {
      if (!('rotation' in propertyMap)) propertyMap['rotation'] = '0';
      let rotationAsInt = parseInt(propertyMap['rotation']);
      let newRotationInt = rotationAsInt;

      if (flippingPlane === 'xy') {
        newRotationInt = rotationAsInt < 8 ? 8 - rotationAsInt : 24 - rotationAsInt;
      }
      if (flippingPlane === 'yz') {
        newRotationInt = (rotationAsInt >= 4 && rotationAsInt < 12)
          ? 16 - rotationAsInt
          : 0 - rotationAsInt;
      }

      newRotationInt = RandomUtils.mathModulo(newRotationInt, 16);
      propertyMap['rotation'] = String(newRotationInt);
    }

    if (rotationType === 'glass_pane_like') {
      for (const dir of MCBlockStateManipulator._horizontalFacingPropertyRotationList) {
        if (!(dir in propertyMap)) propertyMap[dir] = 'false';
      }
      const sideValues = MCBlockStateManipulator._horizontalFacingPropertyRotationList.map(
        (d) => propertyMap[d],
      );
      const flipped = MCBlockStateManipulator.getHorizontallyFlippedSideValueList(
        sideValues, flippingPlane,
      );
      MCBlockStateManipulator._horizontalFacingPropertyRotationList.forEach((d, i) => {
        propertyMap[d] = flipped[i];
      });
    }

    if (rotationType === 'rail') {
      if (!('shape' in propertyMap)) propertyMap['shape'] = 'north_south';
      const shapeProp = propertyMap['shape'];

      if (shapeProp.startsWith('ascending_')) {
        const facingOfAscension = shapeProp.slice(shapeProp.indexOf('_') + 1);
        const newFacing = MCBlockStateManipulator.getHorizontallyFlippedFacingProperty(
          facingOfAscension, flippingPlane,
        );
        propertyMap['shape'] = 'ascending_' + newFacing;
      } else if (shapeProp !== 'north_south' && shapeProp !== 'east_west') {
        const dirs = shapeProp.split('_');
        const sideValues = ['north', 'east', 'south', 'west'].map((d) => dirs.includes(d));
        const flipped = MCBlockStateManipulator.getHorizontallyFlippedSideValueList(
          sideValues, flippingPlane,
        );
        const firstPart = flipped[0] ? 'north' : 'south';
        const secondPart = flipped[1] ? 'east' : 'west';
        propertyMap['shape'] = firstPart + '_' + secondPart;
      }
    }

    if (blockStateBlockId.endsWith('_door')) {
      if (!('hinge' in propertyMap)) propertyMap['hinge'] = 'left';
      propertyMap['hinge'] = propertyMap['hinge'] === 'left' ? 'right' : 'left';
    }

    if (blockStateBlockId.endsWith('_stairs')) {
      if (!('shape' in propertyMap)) propertyMap['shape'] = 'straight';
      const shapeProp = propertyMap['shape'];
      if (shapeProp !== 'straight') {
        const shapeStart = shapeProp.slice(0, shapeProp.indexOf('_'));
        const shapeEnd = shapeProp.slice(shapeProp.indexOf('_') + 1);
        propertyMap['shape'] = shapeStart + '_' + (shapeEnd === 'left' ? 'right' : 'left');
      }
    }

    return blockStateBlockId + MCBlockStateManipulator.propertyMapToBlockStatePropertiesString(propertyMap);
  }
}
