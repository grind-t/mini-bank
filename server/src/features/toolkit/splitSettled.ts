export function splitSettled<T>(
  results: PromiseSettledResult<T>[]
): [T[], any[]] {
  return results.reduce(
    (acc, v) => {
      if (v.status === "fulfilled") {
        acc[0].push(v.value);
      } else {
        acc[1].push(v.reason);
      }
      return acc;
    },
    [[] as T[], [] as any[]]
  );
}
