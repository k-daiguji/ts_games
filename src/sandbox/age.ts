import { roundUp } from "../utilities/math";

export interface Age {
  id: "age";
  text: string;
  equal: (other: Age) => boolean;
  increment: () => Age;
}

export const toAge = (year = 0, month = 0): Age => {
  const { quotient, remainder } = roundUp(month, 12);
  const text = toText(year + quotient, remainder);
  return {
    id: "age",
    text,
    equal: (other: Age) => text === other.text,
    increment: () => toAge(year + quotient, remainder + 1),
  };
};

const toText = (year: number, month: number) =>
  month < 2 ? `${year}y/o ${month}mo.` : `${year}y/o ${month}mos.`;
