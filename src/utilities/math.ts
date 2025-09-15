export const clamp = (value: number, max: number, min: number) =>
  Math.min(Math.max(value, min), max);

export const generate = (max: number) => Math.floor(Math.random() * max);

export const roundUp = (value: number, devisor: number) => ({
  quotient: Math.floor(value / devisor),
  remainder: value % devisor,
});
