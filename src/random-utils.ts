export class RandomUtils {
  static getRotatedList<T>(li: T[], rotationCount: number): T[] {
    return [...li.slice(rotationCount), ...li.slice(0, rotationCount)];
  }

  static mathModulo(x: number, y: number): number {
    const result = x % y;
    return result < 0 ? result + y : result;
  }
}
