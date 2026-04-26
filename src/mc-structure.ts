import { MCBlockStateManipulator } from './block-state-manipulator';
import { RandomUtils } from './random-utils';

/** An `[x, y, z]` coordinate tuple. */
export type Position = [number, number, number];

/** A pair of positions representing the minimum and maximum corners of an axis-aligned bounding box. */
export type Bounds = [Position, Position];

function posKey(pos: Position): string {
  return `${pos[0]},${pos[1]},${pos[2]}`;
}

function keyToPos(key: string): Position {
  const parts = key.split(',');
  return [parseInt(parts[0]), parseInt(parts[1]), parseInt(parts[2])];
}

/**
 * Core block storage and transformation engine.
 *
 * `MCStructure` stores blocks internally as a palette (blockState string ↔ integer ID)
 * plus a map of position keys to palette IDs. Block entities (blocks with NBT data)
 * are stored separately as raw blockData strings keyed by position.
 *
 * Most methods return `this` so calls can be chained.
 */
export class MCStructure {
  /** Bidirectional palette: blockState string ↔ palette ID. */
  _blockPalette: Map<string | number, string | number>;
  /** The next palette ID to assign when a new block state is registered. */
  _blockPaletteFreeId: number;
  /** Map from `"x,y,z"` position key to palette ID for every non-air block. */
  _blockStates: Map<string, number>;
  /** Map from `"x,y,z"` position key to the full blockData string for block entities. */
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

  /**
   * Places a block at the given position.
   *
   * @param position - The `[x, y, z]` coordinate.
   * @param blockData - A Minecraft blockData string, e.g. `"minecraft:stone"`,
   *   `"minecraft:oak_stairs[facing=north]"`, or a block entity string ending with `}`.
   */
  setBlock(position: Position, blockData: string): void {
    if (blockData[blockData.length - 1] !== '}') {
      this._setBlockState(position, blockData);
    } else {
      this._setBlockEntity(position, blockData);
    }
  }

  /**
   * Returns the block state string at the given position, without any NBT data.
   * Returns `"minecraft:air"` for positions with no block.
   */
  getBlockStateAt(position: Position): string {
    const key = posKey(position);
    if (this._blockStates.has(key)) {
      const paletteId = this._blockStates.get(key)!;
      return this._blockPalette.get(paletteId) as string;
    }
    return 'minecraft:air';
  }

  /**
   * Returns the full blockData string at the given position, including NBT data if present.
   * Returns `"minecraft:air"` for positions with no block.
   */
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

  /**
   * Returns a read-only view of the internal bidirectional block palette
   * (maps both `string → number` and `number → string`).
   */
  getInternalBlockPalette(): ReadonlyMap<string | number, string | number> {
    return this._blockPalette;
  }

  /**
   * Returns a clean read-only palette containing only `blockState → id` entries
   * (string keys only), suitable for writing to a `.schem` file.
   */
  getBlockPalette(): ReadonlyMap<string, number> {
    const clean = new Map<string, number>();
    for (const [k, v] of this._blockPalette) {
      if (typeof k === 'string') {
        clean.set(k, v as number);
      }
    }
    return clean;
  }

  /** Returns a read-only map of position keys to palette IDs for all non-air blocks. */
  getBlockStates(): ReadonlyMap<string, number> {
    return this._blockStates;
  }

  /** Returns a read-only map of position keys to raw blockData strings for all block entities. */
  getBlockEntities(): ReadonlyMap<string, string> {
    return this._blockEntities;
  }

  /**
   * Returns the axis-aligned bounding box of all placed blocks as `[minCorner, maxCorner]`.
   * Returns `[[0,0,0],[0,0,0]]` if no blocks have been placed.
   */
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

  /**
   * Returns the `[width, height, length]` dimensions of the given bounding box,
   * where each axis is `max - min + 1`.
   */
  static getStructureDimensions(structureBounds: Bounds): Position {
    return [
      structureBounds[1][0] - structureBounds[0][0] + 1,
      structureBounds[1][1] - structureBounds[0][1] + 1,
      structureBounds[1][2] - structureBounds[0][2] + 1,
    ];
  }

  /**
   * Merges all blocks from `incomingStructure` into this structure, offset by `placePosition`.
   *
   * @param incomingStructure - The structure to copy blocks from.
   * @param placePosition - The `[x, y, z]` offset applied to every block in the incoming structure.
   * @returns `this`
   */
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

  /**
   * Returns a deep copy of this structure. The copy shares no internal state
   * with the original, so mutating one will not affect the other.
   */
  makeCopy(): MCStructure {
    const copy = new MCStructure();
    copy._blockPalette = new Map(this._blockPalette);
    copy._blockPaletteFreeId = this._blockPaletteFreeId;
    copy._blockStates = new Map(this._blockStates);
    copy._blockEntities = new Map(this._blockEntities);
    return copy;
  }

  /**
   * Returns a new structure containing only the blocks within the given cuboid
   * (both corners inclusive).
   *
   * @param corner1 - One corner of the cuboid.
   * @param corner2 - The opposite corner of the cuboid.
   * @param reCenter - If `true`, the extracted sub-structure is translated so it
   *   is centered around `[0, 0, 0]`.
   */
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

  /**
   * Iterates over every non-air block in the structure, yielding `[position, blockState]` pairs.
   * Block states are returned without NBT data; use {@link getBlockDataAt} for the full string.
   */
  *blockStateIterator(): Generator<[Position, string]> {
    for (const [key, paletteId] of this._blockStates) {
      const pos = keyToPos(key);
      yield [pos, this._blockPalette.get(paletteId) as string];
    }
  }

  // --- Transforms ---

  /**
   * Shifts every block in the structure by the given vector. Done in-place.
   *
   * @param translationVector - `[dx, dy, dz]` to add to every block coordinate. Values are rounded.
   * @returns `this`
   */
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

  /**
   * Scales the structure from an anchor point by independent per-axis factors. Done in-place.
   *
   * @param anchorPoint - The fixed point around which scaling is applied.
   * @param scaleX - Scale factor along the X axis.
   * @param scaleY - Scale factor along the Y axis.
   * @param scaleZ - Scale factor along the Z axis.
   * @returns `this`
   */
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

  /**
   * Scales the structure uniformly from an anchor point. Done in-place.
   *
   * @param anchorPoint - The fixed point around which scaling is applied.
   * @param scalar - Uniform scale factor applied to all three axes.
   * @returns `this`
   */
  scale(anchorPoint: [number, number, number], scalar: number): MCStructure {
    return this.scaleXYZ(anchorPoint, scalar, scalar, scalar);
  }

  /**
   * Rotates the structure around an anchor point by yaw, pitch, and roll angles in radians.
   * Done in-place.
   *
   * Axis conventions (matching the original Python library):
   * - **Yaw** rotates around the Y axis (horizontal spin).
   * - **Pitch** rotates around the X axis.
   * - **Roll** rotates around the Z axis.
   *
   * When `rotateBlockStates` is `true`, directional block states (stairs, slabs, etc.) are
   * also rotated to match the new orientation. Only horizontal (yaw) rotation is supported
   * for block state manipulation.
   *
   * @param anchorPoint - The fixed point around which the rotation is applied.
   * @param yaw - Rotation around the Y axis in radians.
   * @param pitch - Rotation around the X axis in radians.
   * @param roll - Rotation around the Z axis in radians.
   * @param rotateBlockStates - Whether to update directional block state properties.
   * @returns `this`
   */
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

  /**
   * Rotates the structure around an anchor point by yaw, pitch, and roll angles in degrees.
   * Done in-place. See {@link rotateRadians} for axis conventions and parameter details.
   *
   * @param anchorPoint - The fixed point around which the rotation is applied.
   * @param yaw - Rotation around the Y axis in degrees.
   * @param pitch - Rotation around the X axis in degrees.
   * @param roll - Rotation around the Z axis in degrees.
   * @param rotateBlockStates - Whether to update directional block state properties.
   * @returns `this`
   */
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

  /**
   * Flips the structure across a plane that passes through `anchorPoint`. Done in-place.
   *
   * The plane is specified as any combination of two axis characters: `'xy'`, `'xz'`, or `'yz'`
   * (order does not matter). The axis not included in the plane is the one that gets reflected.
   *
   * When `flipBlockStates` is `true`, directional block states (stairs, etc.) are also mirrored
   * to match the new orientation. Block state flipping is only supported for horizontal planes
   * (`'xy'` and `'yz'`); flipping across `'xz'` only moves block positions.
   *
   * @param anchorPoint - The point the flipping plane passes through.
   * @param flippingPlane - Two-character string indicating the plane, e.g. `'xy'`, `'xz'`, `'yz'`.
   * @param flipBlockStates - Whether to update directional block state properties.
   * @returns `this`
   * @throws {Error} If `flippingPlane` does not contain exactly two distinct axis characters.
   */
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

  /**
   * Translates the structure so its center aligns with `anchorPoint`. Done in-place.
   *
   * Pass the result of {@link getBounds} as `structureBounds` — it is accepted as a
   * parameter rather than computed internally to allow caching by the caller.
   *
   * @param anchorPoint - The target center point.
   * @param structureBounds - The current bounding box of the structure (from {@link getBounds}).
   * @returns `this`
   */
  centerAround(anchorPoint: [number, number, number], structureBounds: Bounds): MCStructure {
    const tv: Position = [
      -Math.floor((structureBounds[1][0] + structureBounds[0][0]) / 2) + anchorPoint[0],
      -Math.floor((structureBounds[1][1] + structureBounds[0][1]) / 2) + anchorPoint[1],
      -Math.floor((structureBounds[1][2] + structureBounds[0][2]) / 2) + anchorPoint[2],
    ];
    return this.translate(tv);
  }

  /**
   * Translates the structure so its center aligns with `[0, 0, 0]`. Done in-place.
   *
   * @param structureBounds - The current bounding box of the structure (from {@link getBounds}).
   * @returns `this`
   */
  center(structureBounds: Bounds): MCStructure {
    return this.centerAround([0, 0, 0], structureBounds);
  }

  // --- Generators ---

  /**
   * Fills the axis-aligned cuboid defined by `corner1` and `corner2` (both inclusive)
   * with the given block. Done in-place.
   *
   * @param blockData - The blockData string to fill with.
   * @param corner1 - One corner of the cuboid.
   * @param corner2 - The opposite corner of the cuboid.
   */
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

  /**
   * Fills only the six faces of the cuboid defined by `corner1` and `corner2`,
   * leaving the interior empty. Done in-place.
   *
   * @param blockData - The blockData string to use for the faces.
   * @param corner1 - One corner of the cuboid.
   * @param corner2 - The opposite corner of the cuboid.
   */
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

  /**
   * Fills only the twelve edges of the cuboid defined by `corner1` and `corner2`,
   * leaving faces and interior empty. Done in-place.
   *
   * @param blockData - The blockData string to use for the edges.
   * @param corner1 - One corner of the cuboid.
   * @param corner2 - The opposite corner of the cuboid.
   */
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

  /** Extracts the block state portion (everything before `{`) from a block entity string. */
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

  /** Registers a block state in the palette if it is not already present. */
  _addBlockStateToPaletteIfAbsent(blockState: string): void {
    if (!this._blockPalette.has(blockState)) {
      const newId = this._getNewPaletteId();
      this._blockPalette.set(blockState, newId);
      this._blockPalette.set(newId, blockState);
    }
  }
}

/** Static geometry and palette utility methods used internally by {@link MCStructure}. */
export class MCStructureUtils {
  private static readonly _cuboidCornersDirections: Position[] = [
    [1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1],
    [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1],
  ];

  /**
   * Returns `[minCorner, maxCorner]` given any two corners of a cuboid,
   * ensuring `min ≤ max` on every axis.
   */
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

  /**
   * Returns all eight corner positions of the cuboid defined by `corner1` and `corner2`.
   * The corners are ordered according to `_cuboidCornersDirections`.
   */
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

  /**
   * Returns a new palette with all block states rotated horizontally by `ninetyDegreeTurnCount`
   * clockwise 90-degree turns. Blocks that have no directional properties are unchanged.
   */
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

  /**
   * Returns a new palette with all block states flipped across the given horizontal plane.
   * `'xz'` is a no-op (flipping vertically has no effect on horizontal block state properties).
   */
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
