export const range = (
  stop: number,
  option?: { start?: number; step?: number },
) => {
  const { start = 0, step = 1 } = option ?? { start: 0, step: 1 };
  const inverseStep = 1 / step;
  return Array.from(
    { length: Math.ceil((stop - start + step) / step) },
    (_, i) => (start * inverseStep + i) / inverseStep,
  );
};
