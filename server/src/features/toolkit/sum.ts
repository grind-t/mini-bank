export function sum<T extends number>(array: number[]): number;
export function sum<T>(array: T[], selector: (item: T) => number): number;

export function sum<T>(array: T[], selector?: (item: T) => number): number {
  selector ??= (v) => v as number;
  return array.reduce((acc, v) => acc + selector(v), 0);
}
