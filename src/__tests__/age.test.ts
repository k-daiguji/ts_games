import { describe, test } from "vitest";

import { Age } from "../age";

test("initialize", ({ expect }) => {
  const age = Age.initialize();

  const actual = age.text;

  expect(actual).toBe("0y/o 0mo.");
});

test("fromYear", ({ expect }) => {
  const age = Age.fromYear(1);

  const actual = age.text;

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
  let age = Age.initialize();
  for (let i = 0; i < count; i++) {
    age = age.increment();
  }

  const actual = age.text;

  expect(actual).toBe(expected);
});

describe("toEqual", () => {
  test("true(Month: 0)", ({ expect }) => {
    const age1 = Age.initialize();
    const age2 = Age.initialize();

    const actual = age1.toEqual(age2);

    expect(actual).toBe(true);
  });

  test.for(Array.range(12, { start: 1 }))(
    "false(Month: %s)",
    (count, { expect }) => {
      const age1 = Age.initialize();
      let age2 = Age.initialize();
      for (let i = 0; i < count; i++) {
        age2 = age2.increment();
      }

      const actual = age1.toEqual(age2);

      expect(actual).toBe(false);
    },
  );
});
