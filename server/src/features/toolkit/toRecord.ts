import { firstArgument, secondArgument } from "./selectors.ts";

type KeySelector<T, K> = (item: T, idx: number) => K;
type ValueSelector<T, V> = (item: T, idx: number) => V;

export function toRecord(array: string[]): Record<string, number>;
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
  valueSelector ??= (
    keySelector ? firstArgument : secondArgument
  ) as ValueSelector<T, V>;

  keySelector ??= firstArgument as KeySelector<T, K>;

  return array.reduce((acc, item, idx) => {
    acc[keySelector(item, idx)] = valueSelector(item, idx);
    return acc;
  }, {} as Record<K, V>);
}
