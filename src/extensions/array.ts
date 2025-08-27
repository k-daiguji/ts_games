export {};

declare global {
  interface ArrayConstructor {
    range(stop: number, option?: { start?: number; step?: number }): number[];
  }
}

Array.range = (stop: number, option: { start?: number; step?: number }) => {
  const { start = 0, step = 1 } = option ?? { start: 0, step: 1 };
  return Array.from(
    { length: Math.ceil((stop - start + 1) / step) },
    (_, i) => start + i * step,
  );
};
