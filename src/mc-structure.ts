import { MCBlockStateManipulator } from './block-state-manipulator';
import { RandomUtils } from './random-utils';

export type Position = [number, number, number];
export type Bounds = [Position, Position];

function posKey(pos: Position): string {
  return `${pos[0]},${pos[1]},${pos[2]}`;
}

function keyToPos(key: string): Position {
  const parts = key.split(',');
  return [parseInt(parts[0]), parseInt(parts[1]), parseInt(parts[2])];
}

export class MCStructure {
  _blockPalette: Map<string | number, string | number>;
  _blockPaletteFreeId: number;
  _blockStates: Map<string, number>;
  _blockEntities: Map<string, string>;

  constructor() {
    this._blockPalette = new Map<string | number, string | number>([
      ['minecraft:air', 0],
      [0, 'minecraft:air'],
    ]);
    this._blockPaletteFreeId = 1;
    this._blockStates = new Map();
    this._blockEntities = new Map();
  }

  setBlock(position: Position, blockData: string): void {
    if (blockData[blockData.length - 1] !== '}') {
      this._setBlockState(position, blockData);
    } else {
      this._setBlockEntity(position, blockData);
    }
  }

  getBlockStateAt(position: Position): string {
    const key = posKey(position);
    if (this._blockStates.has(key)) {
      const paletteId = this._blockStates.get(key)!;
      return this._blockPalette.get(paletteId) as string;
    }
    return 'minecraft:air';
  }

  getBlockDataAt(position: Position): string {
    const key = posKey(position);
    if (this._blockEntities.has(key)) {
      return this._blockEntities.get(key)!;
    }
    if (this._blockStates.has(key)) {
      const paletteId = this._blockStates.get(key)!;
      return this._blockPalette.get(paletteId) as string;
    }
    return 'minecraft:air';
  }

  getInternalBlockPalette(): ReadonlyMap<string | number, string | number> {
    return this._blockPalette;
  }

  getBlockPalette(): ReadonlyMap<string, number> {
    const clean = new Map<string, number>();
    for (const [k, v] of this._blockPalette) {
      if (typeof k === 'string') {
        clean.set(k, v as number);
      }
    }
    return clean;
  }

  getBlockStates(): ReadonlyMap<string, number> {
    return this._blockStates;
  }

  getBlockEntities(): ReadonlyMap<string, string> {
    return this._blockEntities;
  }

  getBounds(): Bounds {
    if (this._blockStates.size === 0) {
      return [[0, 0, 0], [0, 0, 0]];
    }

    let xMin = Infinity, yMin = Infinity, zMin = Infinity;
    let xMax = -Infinity, yMax = -Infinity, zMax = -Infinity;

    for (const key of this._blockStates.keys()) {
      const [x, y, z] = keyToPos(key);
      if (x < xMin) xMin = x;
      if (x > xMax) xMax = x;
      if (y < yMin) yMin = y;
      if (y > yMax) yMax = y;
      if (z < zMin) zMin = z;
      if (z > zMax) zMax = z;
    }

    return [[xMin, yMin, zMin], [xMax, yMax, zMax]];
  }

  static getStructureDimensions(structureBounds: Bounds): Position {
    return [
      structureBounds[1][0] - structureBounds[0][0] + 1,
      structureBounds[1][1] - structureBounds[0][1] + 1,
      structureBounds[1][2] - structureBounds[0][2] + 1,
    ];
  }

  placeStructure(incomingStructure: MCStructure, placePosition: Position): MCStructure {
    for (const [key, _paletteId] of incomingStructure.getBlockStates()) {
      const blockPosition = keyToPos(key);
      const blockDataHere = incomingStructure.getBlockDataAt(blockPosition);
      const newPos: Position = [
        blockPosition[0] + placePosition[0],
        blockPosition[1] + placePosition[1],
        blockPosition[2] + placePosition[2],
      ];
      this.setBlock(newPos, blockDataHere);
    }
    return this;
  }

  makeCopy(): MCStructure {
    const copy = new MCStructure();
    copy._blockPalette = new Map(this._blockPalette);
    copy._blockPaletteFreeId = this._blockPaletteFreeId;
    copy._blockStates = new Map(this._blockStates);
    copy._blockEntities = new Map(this._blockEntities);
    return copy;
  }

  getSubStructure(corner1: Position, corner2: Position, reCenter = false): MCStructure {
    const subStructure = new MCStructure();
    const [c1, c2] = MCStructureUtils.sortCuboidCorners(corner1, corner2);

    for (const [key, _paletteId] of this._blockStates) {
      const pos = keyToPos(key);
      const inCuboid =
        c1[0] <= pos[0] && pos[0] <= c2[0] &&
        c1[1] <= pos[1] && pos[1] <= c2[1] &&
        c1[2] <= pos[2] && pos[2] <= c2[2];
      if (!inCuboid) continue;

      const blockData = this.getBlockDataAt(pos);
      subStructure.setBlock(pos, blockData);
    }

    if (reCenter) {
      subStructure.center([c1, c2]);
    }

    return subStructure;
  }

  *blockStateIterator(): Generator<[Position, string]> {
    for (const [key, paletteId] of this._blockStates) {
      const pos = keyToPos(key);
      yield [pos, this._blockPalette.get(paletteId) as string];
    }
  }

  // --- Transforms ---

  translate(translationVector: [number, number, number]): MCStructure {
    const tv: Position = [
      Math.round(translationVector[0]),
      Math.round(translationVector[1]),
      Math.round(translationVector[2]),
    ];

    const newBlockStates = new Map<string, number>();
    const newBlockEntities = new Map<string, string>();

    for (const [key, paletteId] of this._blockStates) {
      const pos = keyToPos(key);
      const newPos: Position = [pos[0] + tv[0], pos[1] + tv[1], pos[2] + tv[2]];
      const newKey = posKey(newPos);
      newBlockStates.set(newKey, paletteId);

      if (this._blockEntities.has(key)) {
        newBlockEntities.set(newKey, this._blockEntities.get(key)!);
      }
    }

    this._blockStates = newBlockStates;
    this._blockEntities = newBlockEntities;
    return this;
  }

  scaleXYZ(
    anchorPoint: [number, number, number],
    scaleX: number,
    scaleY: number,
    scaleZ: number,
  ): MCStructure {
    const newBlockStates = new Map<string, number>();
    const newBlockEntities = new Map<string, string>();

    for (const [key, paletteId] of this._blockStates) {
      const pos = keyToPos(key);
      const bx = (pos[0] - anchorPoint[0]) * scaleX;
      const by = (pos[1] - anchorPoint[1]) * scaleY;
      const bz = (pos[2] - anchorPoint[2]) * scaleZ;
      const newPos: Position = [
        Math.round(bx + anchorPoint[0]),
        Math.round(by + anchorPoint[1]),
        Math.round(bz + anchorPoint[2]),
      ];
      const newKey = posKey(newPos);
      newBlockStates.set(newKey, paletteId);

      if (this._blockEntities.has(key)) {
        newBlockEntities.set(newKey, this._blockEntities.get(key)!);
      }
    }

    this._blockStates = newBlockStates;
    this._blockEntities = newBlockEntities;
    return this;
  }

  scale(anchorPoint: [number, number, number], scalar: number): MCStructure {
    return this.scaleXYZ(anchorPoint, scalar, scalar, scalar);
  }

  rotateRadians(
    anchorPoint: [number, number, number],
    yaw = 0.0,
    pitch = 0.0,
    roll = 0.0,
    rotateBlockStates = true,
  ): MCStructure {
    const newBlockStates = new Map<string, number>();
    const newBlockEntities = new Map<string, string>();

    const cosYaw = Math.cos(-yaw);
    const sinYaw = Math.sin(-yaw);
    const cosPitch = Math.cos(pitch);
    const sinPitch = Math.sin(pitch);
    const cosRoll = Math.cos(-roll);
    const sinRoll = Math.sin(-roll);

    for (const [key, paletteId] of this._blockStates) {
      const pos = keyToPos(key);
      let bx = pos[0] - anchorPoint[0];
      let by = pos[1] - anchorPoint[1];
      let bz = pos[2] - anchorPoint[2];

      if (yaw !== 0.0) {
        const nx = bz * sinYaw + bx * cosYaw;
        const nz = bz * cosYaw - bx * sinYaw;
        bx = nx; bz = nz;
      }
      if (pitch !== 0.0) {
        const ny = bz * sinPitch + by * cosPitch;
        const nz = bz * cosPitch - by * sinPitch;
        by = ny; bz = nz;
      }
      if (roll !== 0.0) {
        const nx = bx * cosRoll - by * sinRoll;
        const ny = bx * sinRoll + by * cosRoll;
        bx = nx; by = ny;
      }

      const newPos: Position = [
        Math.round(bx + anchorPoint[0]),
        Math.round(by + anchorPoint[1]),
        Math.round(bz + anchorPoint[2]),
      ];
      const newKey = posKey(newPos);
      newBlockStates.set(newKey, paletteId);

      if (this._blockEntities.has(key)) {
        newBlockEntities.set(newKey, this._blockEntities.get(key)!);
      }
    }

    if (rotateBlockStates) {
      const positiveAngle = RandomUtils.mathModulo(yaw, Math.PI * 2);
      const turns = Math.floor((positiveAngle + Math.PI / 4) / (Math.PI / 2)) % 4;
      if (turns !== 0) {
        this._blockPalette = MCStructureUtils.getHorizontallyRotatedBlockPalette(
          this._blockPalette, turns,
        );
      }
    }

    this._blockStates = newBlockStates;
    this._blockEntities = newBlockEntities;
    return this;
  }

  rotateDegrees(
    anchorPoint: [number, number, number],
    yaw = 0.0,
    pitch = 0.0,
    roll = 0.0,
    rotateBlockStates = true,
  ): MCStructure {
    const rad = Math.PI / 180;
    return this.rotateRadians(anchorPoint, yaw * rad, pitch * rad, roll * rad, rotateBlockStates);
  }

  flip(
    anchorPoint: [number, number, number],
    flippingPlane: string,
    flipBlockStates = true,
  ): MCStructure {
    const xInPlane = flippingPlane.includes('x');
    const yInPlane = flippingPlane.includes('y');
    const zInPlane = flippingPlane.includes('z');

    if ((xInPlane ? 1 : 0) + (yInPlane ? 1 : 0) + (zInPlane ? 1 : 0) !== 2) {
      throw new Error(
        'Incorrect plane inputted. A plane should be the combination of 2 axis between x, y and z.',
      );
    }

    let flipPlane = '';
    if (xInPlane) flipPlane += 'x';
    if (yInPlane) flipPlane += 'y';
    if (zInPlane) flipPlane += 'z';

    const newBlockStates = new Map<string, number>();
    const newBlockEntities = new Map<string, string>();

    for (const [key, paletteId] of this._blockStates) {
      const pos = keyToPos(key);
      let newPos: Position;

      if (flipPlane === 'xy') {
        newPos = [pos[0], pos[1], Math.round(-pos[2] + 2 * anchorPoint[2])];
      } else if (flipPlane === 'xz') {
        newPos = [pos[0], Math.round(-pos[1] + 2 * anchorPoint[1]), pos[2]];
      } else {
        newPos = [Math.round(-pos[0] + 2 * anchorPoint[0]), pos[1], pos[2]];
      }

      const newKey = posKey(newPos);
      newBlockStates.set(newKey, paletteId);

      if (this._blockEntities.has(key)) {
        newBlockEntities.set(newKey, this._blockEntities.get(key)!);
      }
    }

    if (flipBlockStates && flipPlane !== 'xz') {
      this._blockPalette = MCStructureUtils.getHorizontallyFlippedBlockPalette(
        this._blockPalette, flipPlane,
      );
    }

    this._blockStates = newBlockStates;
    this._blockEntities = newBlockEntities;
    return this;
  }

  centerAround(anchorPoint: [number, number, number], structureBounds: Bounds): MCStructure {
    const tv: Position = [
      -Math.floor((structureBounds[1][0] + structureBounds[0][0]) / 2) + anchorPoint[0],
      -Math.floor((structureBounds[1][1] + structureBounds[0][1]) / 2) + anchorPoint[1],
      -Math.floor((structureBounds[1][2] + structureBounds[0][2]) / 2) + anchorPoint[2],
    ];
    return this.translate(tv);
  }

  center(structureBounds: Bounds): MCStructure {
    return this.centerAround([0, 0, 0], structureBounds);
  }

  // --- Generators ---

  cuboidFilled(blockData: string, corner1: Position, corner2: Position): void {
    const [c1, c2] = MCStructureUtils.sortCuboidCorners(corner1, corner2);
    const isBlockEntity = blockData[blockData.length - 1] === '}';

    if (!isBlockEntity) {
      this.setBlock(c1, blockData);
      const blockStateId = this._blockPalette.get(blockData) as number;

      for (let x = c1[0]; x <= c2[0]; x++) {
        for (let y = c1[1]; y <= c2[1]; y++) {
          for (let z = c1[2]; z <= c2[2]; z++) {
            const key = posKey([x, y, z]);
            this._blockStates.set(key, blockStateId);
            this._blockEntities.delete(key);
          }
        }
      }
    } else {
      this.setBlock(c1, blockData);
      const blockState = this._getBlockStateFromBlockEntityString(blockData);
      const blockStateId = this._blockPalette.get(blockState) as number;

      for (let x = c1[0]; x <= c2[0]; x++) {
        for (let y = c1[1]; y <= c2[1]; y++) {
          for (let z = c1[2]; z <= c2[2]; z++) {
            const key = posKey([x, y, z]);
            this._blockStates.set(key, blockStateId);
            this._blockEntities.set(key, blockData);
          }
        }
      }
    }
  }

  cuboidHollow(blockData: string, corner1: Position, corner2: Position): void {
    const [nxnynz, pxpypz] = MCStructureUtils.sortCuboidCorners(corner1, corner2);
    const pxnypz: Position = [pxpypz[0], nxnynz[1], pxpypz[2]];
    const pxpynz: Position = [pxpypz[0], pxpypz[1], nxnynz[2]];
    const nxpypz: Position = [nxnynz[0], pxpypz[1], pxpypz[2]];

    this.cuboidFilled(blockData, pxnypz, nxnynz);
    this.cuboidFilled(blockData, pxpynz, nxpypz);
    this.cuboidFilled(blockData, nxnynz, nxpypz);
    this.cuboidFilled(blockData, pxnypz, pxpynz);
    this.cuboidFilled(blockData, nxnynz, pxpynz);
    this.cuboidFilled(blockData, pxnypz, nxpypz);
  }

  cuboidOutlines(blockData: string, corner1: Position, corner2: Position): void {
    const corners = MCStructureUtils.generateAll8CuboidCorners(corner1, corner2);

    for (const i of [0, 4]) {
      this.cuboidFilled(blockData, corners[0 + i], corners[1 + i]);
      this.cuboidFilled(blockData, corners[2 + i], corners[3 + i]);
      this.cuboidFilled(blockData, corners[0 + i], corners[2 + i]);
      this.cuboidFilled(blockData, corners[1 + i], corners[3 + i]);
    }
    for (let i = 0; i < 4; i++) {
      this.cuboidFilled(blockData, corners[i], corners[i + 4]);
    }
  }

  // --- Private ---

  private _getNewPaletteId(): number {
    return this._blockPaletteFreeId++;
  }

  _getBlockStateFromBlockEntityString(blockEntityString: string): string {
    return blockEntityString.slice(0, blockEntityString.indexOf('{'));
  }

  private _setBlockState(position: Position, blockState: string): void {
    this._addBlockStateToPaletteIfAbsent(blockState);
    const key = posKey(position);
    this._blockEntities.delete(key);
    this._blockStates.set(key, this._blockPalette.get(blockState) as number);
  }

  private _setBlockEntity(position: Position, blockEntityData: string): void {
    const blockState = this._getBlockStateFromBlockEntityString(blockEntityData);
    this._setBlockState(position, blockState);
    this._blockEntities.set(posKey(position), blockEntityData);
  }

  _addBlockStateToPaletteIfAbsent(blockState: string): void {
    if (!this._blockPalette.has(blockState)) {
      const newId = this._getNewPaletteId();
      this._blockPalette.set(blockState, newId);
      this._blockPalette.set(newId, blockState);
    }
  }
}

export class MCStructureUtils {
  private static readonly _cuboidCornersDirections: Position[] = [
    [1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1],
    [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1],
  ];

  static sortCuboidCorners(corner1: Position, corner2: Position): [Position, Position] {
    return [
      [
        Math.min(corner1[0], corner2[0]),
        Math.min(corner1[1], corner2[1]),
        Math.min(corner1[2], corner2[2]),
      ],
      [
        Math.max(corner1[0], corner2[0]),
        Math.max(corner1[1], corner2[1]),
        Math.max(corner1[2], corner2[2]),
      ],
    ];
  }

  static generateAll8CuboidCorners(corner1: Position, corner2: Position): Position[] {
    const [c1, c2] = MCStructureUtils.sortCuboidCorners(corner1, corner2);
    const dx = (c2[0] - c1[0]) / 2;
    const dy = (c2[1] - c1[1]) / 2;
    const dz = (c2[2] - c1[2]) / 2;
    const cx = c1[0] + dx;
    const cy = c1[1] + dy;
    const cz = c1[2] + dz;

    return MCStructureUtils._cuboidCornersDirections.map(([dirX, dirY, dirZ]) => [
      Math.trunc(cx + dirX * dx),
      Math.trunc(cy + dirY * dy),
      Math.trunc(cz + dirZ * dz),
    ] as Position);
  }

  static getHorizontallyRotatedBlockPalette(
    blockPalette: Map<string | number, string | number>,
    ninetyDegreeTurnCount: number,
  ): Map<string | number, string | number> {
    if (ninetyDegreeTurnCount % 4 === 0) return blockPalette;

    const rotated = new Map<string | number, string | number>();
    for (const [k, v] of blockPalette) {
      if (typeof k !== 'number') continue;
      const rotatedState = MCBlockStateManipulator.getHorizontallyRotatedBlockState(
        v as string, ninetyDegreeTurnCount,
      );
      rotated.set(k, rotatedState);
      rotated.set(rotatedState, k);
    }
    return rotated;
  }

  static getHorizontallyFlippedBlockPalette(
    blockPalette: Map<string | number, string | number>,
    flippingPlane: string,
  ): Map<string | number, string | number> {
    if (flippingPlane === 'xz') return blockPalette;

    const flipped = new Map<string | number, string | number>();
    for (const [k, v] of blockPalette) {
      if (typeof k !== 'number') continue;
      const flippedState = MCBlockStateManipulator.getHorizontallyFlippedBlockState(
        v as string, flippingPlane,
      );
      flipped.set(k, flippedState);
      flipped.set(flippedState, k);
    }
    return flipped;
  }
}
