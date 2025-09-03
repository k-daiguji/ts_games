interface Age {
  id: "age";
  equal: (target: Age) => boolean;
  increment: () => void;
  toText: () => string;
}

const roundUp = (value: number, devisor: number) => ({
  quotient: Math.floor(value / devisor),
  remainder: value % devisor,
});

export const createAge = (option?: { year?: number; month?: number }): Age => {
  let { year = 0, month = 0 } = option ?? { year: 0, month: 0 };
  const { quotient, remainder } = roundUp(month, 12);
  year = year + quotient;
  month = remainder;
  const toText = () =>
    month < 2 ? `${year}y/o ${month}mo.` : `${year}y/o ${month}mos.`;
  return {
    id: "age",
    equal: (target: Age) => target.toText() === toText(),
    increment: () => {
      const { quotient, remainder } = roundUp(month + 1, 12);
      year = year + quotient;
      month = remainder;
    },
    toText,
  };
};
