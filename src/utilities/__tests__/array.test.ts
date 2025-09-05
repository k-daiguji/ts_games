import { test } from "vitest";

import { range } from "../array";

test("When stop is 9, result is [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].", ({
  expect,
}) => {
  const actual = range(9);

  expect(actual).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test("When start is 5 and stop is 9, result is [5, 6, 7, 8, 9].", ({
  expect,
}) => {
  const actual = range(9, { start: 5 });

  expect(actual).toStrictEqual([5, 6, 7, 8, 9]);
});

test("When stop is 8 and step is 2, result is [0, 2, 4, 6, 8].", ({
  expect,
}) => {
  const actual = range(8, { step: 2 });

  expect(actual).toStrictEqual([0, 2, 4, 6, 8]);
});

test("When stop is 0.9 and step is 0.1, result is [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].", ({
  expect,
}) => {
  const actual = range(0.9, { step: 0.1 });

  expect(actual).toStrictEqual([
    0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9,
  ]);
});

test("When start is 4, stop is 8 and step is 2, result is [4, 6, 8].", ({
  expect,
}) => {
  const actual = range(8, { start: 4, step: 2 });

  expect(actual).toStrictEqual([4, 6, 8]);
});
