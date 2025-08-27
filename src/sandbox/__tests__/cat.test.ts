import { test } from "vitest";
import { Cat } from "../cat";

test.for<number>(Array.range(47))(
  "When the random number is %s, the sex is female.",
  (randomNumber, { expect }) => {
    const dummyRandom = () => () => randomNumber;
    const cat = Cat.create(dummyRandom);

    const actual = cat.status;

    expect(actual).toStrictEqual({ sex: true });
  },
);

test.for<number>(Array.range(100, { start: 48 }))(
  "When the random number is %s, the sex is male.",
  (randomNumber, { expect }) => {
    const dummyRandom = () => () => randomNumber;
    const cat = Cat.create(dummyRandom);

    const actual = cat.status;

    expect(actual).toStrictEqual({ sex: false });
  },
);
