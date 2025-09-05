export const roundUp = (value: number, devisor: number) => ({
  quotient: Math.floor(value / devisor),
  remainder: value % devisor,
});
