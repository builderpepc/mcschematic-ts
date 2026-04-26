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

export class MCBlockStateManipulator {
  private static readonly _horizontalFacingPropertyRotationList: string[] = [
    'north', 'east', 'south', 'west',
  ];

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

  static propertyMapToBlockStatePropertiesString(propertyMap: Record<string, string>): string {
    if (Object.keys(propertyMap).length === 0) return '';
    return '[' + Object.entries(propertyMap).map(([k, v]) => `${k}=${v}`).join(',') + ']';
  }

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

  private static _findRotationType(blockStateBlockId: string): RotationType {
    for (const [endswithId, rotType, isNotEndswithId] of MCBlockStateManipulator.rotatableBlockIdSuffixToHorizontalRotationType) {
      if (!blockStateBlockId.endsWith(endswithId)) continue;
      if (isNotEndswithId.some((banned) => blockStateBlockId.endsWith(banned))) continue;
      return rotType;
    }
    return 'Not found';
  }

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
