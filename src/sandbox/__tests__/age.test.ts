import { describe, test } from "vitest";

import { createAge } from "../age";

test("initialize", ({ expect }) => {
  const age = createAge();

  const actual = age.toText();

  expect(actual).toBe("0y/o 0mo.");
});

test("fromYear", ({ expect }) => {
  const age = createAge({ year: 1 });

  const actual = age.toText();

  expect(actual).toBe("1y/o 0mo.");
});

test.for<[string, number]>([
  ["0y/o 1mo.", 1],
  ["0y/o 2mos.", 2],
  ["0y/o 3mos.", 3],
  ["0y/o 4mos.", 4],
  ["0y/o 5mos.", 5],
  ["0y/o 6mos.", 6],
  ["0y/o 7mos.", 7],
  ["0y/o 8mos.", 8],
  ["0y/o 9mos.", 9],
  ["0y/o 10mos.", 10],
  ["0y/o 11mos.", 11],
  ["1y/o 0mo.", 12],
  ["1y/o 1mo.", 13],
  ["1y/o 2mos.", 14],
  ["1y/o 3mos.", 15],
  ["1y/o 4mos.", 16],
  ["1y/o 5mos.", 17],
  ["1y/o 6mos.", 18],
  ["1y/o 7mos.", 19],
  ["1y/o 8mos.", 20],
  ["1y/o 9mos.", 21],
  ["1y/o 10mos.", 22],
  ["1y/o 11mos.", 23],
  ["2y/o 0mo.", 24],
])("increment(%s)", ([expected, count], { expect }) => {
  const age = createAge();
  for (let i = 0; i < count; i++) {
    age.increment();
  }

  const actual = age.toText();

  expect(actual).toBe(expected);
});

describe("toEqual", () => {
  test.for<[string, boolean, number]>([
    ["0mo", false, 0],
    ["1mo", false, 1],
    ["2mos", false, 2],
    ["3mos", false, 3],
    ["4mos", false, 4],
    ["5mos", false, 5],
    ["6mos", false, 6],
    ["7mos", false, 7],
    ["8mos", false, 8],
    ["9mos", false, 9],
    ["10mos", false, 10],
    ["11mos", false, 11],
    ["12mos", true, 12],
  ])("1y/o === %s is %s.", ([, expected, count], { expect }) => {
    const age1 = createAge({ year: 1 });
    const age2 = createAge();
    for (let i = 0; i < count; i++) {
      age2.increment();
    }

    const actual = age1.equal(age2);

    expect(actual).toBe(expected);
  });
});
