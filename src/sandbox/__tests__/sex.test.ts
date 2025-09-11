import { test } from "vitest";

import type { Sex } from "../sex";
import { initialize, mating } from "../sex";

test.for<[boolean, Sex]>([
  [true, "XX"],
  [false, "XY"],
])("initialize(%s) -> %s", ([input, expected], { expect }) => {
  const actual = initialize(input);

  expect(actual).toStrictEqual(expected);
});

test.for<[Sex, Sex, Sex | undefined]>([
  ["XX", "XX", undefined],
  ["XX", "XY", "XY"],
  ["XY", "XX", "XX"],
  ["XY", "XY", undefined],
])("First: %s & %s mated.", ([sex1, sex2, expected], { expect }) => {
  const actual = mating(sex1, sex2, 0);

  expect(actual).toStrictEqual(expected);
});

test.for<[Sex, Sex, Sex | undefined]>([
  ["XX", "XX", undefined],
  ["XX", "XY", "XX"],
  ["XY", "XX", "XY"],
  ["XY", "XY", undefined],
])("Second: %s & %s mated.", ([sex1, sex2, expected], { expect }) => {
  const actual = mating(sex1, sex2, 1);

  expect(actual).toStrictEqual(expected);
});
