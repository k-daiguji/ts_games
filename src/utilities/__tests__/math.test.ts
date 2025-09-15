import { test, vi } from "vitest";

import { clamp, generate, roundUp } from "../math";

test.for<[number, number]>([
  [0, 1],
  [1, 1],
  [2, 2],
  [99, 99],
  [100, 100],
  [101, 100],
])("When input is %s, result is %s.", ([input, expected], { expect }) => {
  const actual = clamp(input, 100, 1);

  expect(actual).toStrictEqual(expected);
});

test.for([
  [50, 0, 0],
  [50, 0.01, 0],
  [50, 0.02, 1],
  [50, 0.97, 48],
  [50, 0.98, 49],
  [50, 0.99, 49],
  [50, 1, 50],
  [100, 0, 0],
  [100, 0.009, 0],
  [100, 0.01, 1],
  [100, 0.989, 98],
  [100, 0.99, 99],
  [100, 0.999, 99],
  [100, 1, 100],
  [200, 0, 0],
  [200, 0.004, 0],
  [200, 0.005, 1],
  [200, 0.994, 198],
  [200, 0.995, 199],
  [200, 0.999, 199],
  [200, 1, 200],
])(
  "When the maximum value is %s and the random number is %s, the result is %s.",
  ([max, randomNumber, expected], { expect }) => {
    vi.spyOn(Math, "random").mockReturnValue(randomNumber);

    const actual = generate(max);

    expect(actual).toBe(expected);
  },
);

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
