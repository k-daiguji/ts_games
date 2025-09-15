const toArray = <T>(
  length: number,
  mapFunction: (_: unknown, i: number) => T,
) => Array.from({ length }, mapFunction);

export const loop = <T>(length: number, values: T[]) =>
  toArray(length, (_, i) => values[i % values.length]);

export const range = (
  stop: number,
  option?: { start?: number; step?: number },
) => {
  const { start = 0, step = 1 } = option ?? { start: 0, step: 1 };
  const length = Math.ceil((stop - start + step) / step);
  return toArray(length, (_, i) => i / (1 / step) + start);
};
