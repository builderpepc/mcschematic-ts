/** Static math and list utility helpers. */
export class RandomUtils {
  /**
   * Returns a new array rotated left by `rotationCount` positions.
   * Elements shifted off the front are appended to the back.
   */
  static getRotatedList<T>(li: T[], rotationCount: number): T[] {
    return [...li.slice(rotationCount), ...li.slice(0, rotationCount)];
  }

  /**
   * Returns `x mod y` with the result always in the range `[0, y)`.
   * JavaScript's `%` operator can return negative values for negative operands;
   * this corrects that.
   */
  static mathModulo(x: number, y: number): number {
    const result = x % y;
    return result < 0 ? result + y : result;
  }
}
