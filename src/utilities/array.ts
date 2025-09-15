const toArray = (length: number, step = 1, offset = 0) =>
  Array.from({ length }, (_, i) => i / (1 / step) + offset);

export const range = (
  stop: number,
  option?: { start?: number; step?: number },
) => {
  const { start = 0, step = 1 } = option ?? { start: 0, step: 1 };
  return toArray(Math.ceil((stop - start + step) / step), step, start);
};
