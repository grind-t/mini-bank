type KeySelector<T, K> = (item: T, idx: number) => K;
type ValueSelector<T, V> = (item: T, idx: number) => V;

export function toRecord(array: string[]): Record<string, string>;
export function toRecord<T, K extends string>(
  array: T[],
  keySelector: KeySelector<T, K>
): Record<K, T>;
export function toRecord<T, K extends string, V>(
  array: T[],
  keySelector: KeySelector<T, K>,
  valueSelector: ValueSelector<T, V>
): Record<K, V>;

export function toRecord<T, K extends string, V>(
  array: T[],
  keySelector?: KeySelector<T, K>,
  valueSelector?: ValueSelector<T, V>
): Record<K, V> {
  keySelector ??= (item) => item as unknown as K;
  valueSelector ??= (item) => item as unknown as V;
  return array.reduce((acc, item, idx) => {
    acc[keySelector(item, idx)] = valueSelector(item, idx);
    return acc;
  }, {} as Record<K, V>);
}
