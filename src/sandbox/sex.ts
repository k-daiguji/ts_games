export type Sex = "XX" | "XY";

export const initialize = (value: boolean): Sex => (value ? "XX" : "XY");

export const mating = (sex1: Sex, sex2: Sex, count: number): Sex | undefined =>
  isPair(sex1, sex2) || isPair(sex2, sex1)
    ? count % 2
      ? sex1
      : sex2
    : undefined;

const isPair = (sex1: Sex, sex2: Sex) =>
  (sex1 === "XX" && sex2 === "XY") || (sex1 === "XY" && sex2 === "XX");
