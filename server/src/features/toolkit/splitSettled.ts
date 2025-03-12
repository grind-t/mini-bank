export async function splitSettled<T>(
  promises: Promise<T>[]
): Promise<[T[], any[]]> {
  const results = await Promise.allSettled(promises);

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
