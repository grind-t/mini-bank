export function parseMoexBlock<T extends Record<string, unknown>>(block: {
  columns: (keyof T)[];
  data: T[keyof T][][];
}): T[] {
  return block.data.map((row) => {
    const record = {} as T;
    block.columns.forEach((column, i) => {
      record[column] = row[i];
    });
    return record;
  });
}
