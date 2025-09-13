export const roundUp = (value: number, devisor: number) => ({
  quotient: Math.floor(value / devisor),
  remainder: value % devisor,
});

export const clamp = (value: number, max: number, min: number) =>
  Math.min(Math.max(value, min), max);
