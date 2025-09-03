import { test, vi } from "vitest";
import { generate } from "../random";

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
