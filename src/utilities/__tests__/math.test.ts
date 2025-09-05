import { test } from "vitest";

import { roundUp } from "../math";

test.for<[number, { quotient: number; remainder: number }]>([
  [0, { quotient: 0, remainder: 0 }],
  [1, { quotient: 0, remainder: 1 }],
  [2, { quotient: 1, remainder: 0 }],
  [3, { quotient: 1, remainder: 1 }],
])(
  "When input is %s and devisor is 2, result is %s.",
  ([input, expected], { expect }) => {
    const actual = roundUp(input, 2);

    expect(actual).toStrictEqual(expected);
  },
);
