import { test } from "vitest";

import { range } from "../../utilities/array";
import type { Age } from "../age";
import { createCat } from "../cat";

const createDummyAge = (count = 0): Age => {
  return {
    id: "age",
    text: `Text: ${count}`,
    equal: () => true,
    increment: () => createDummyAge(count + 1),
  };
};

test.for<[string, boolean]>([
  ["Female", false],
  ["Male", true],
])("%s cat was born.", ([, sex], { expect }) => {
  const cat = createCat(sex, createDummyAge());

  expect(cat.age).toBe("Text: 0");
  expect(cat.sex).toBe(sex);
});

test.for<[string, number, string]>([
  ["1 year", 1, "Text: 1"],
  ["9 years", 9, "Text: 9"],
  ["10 years", 10, "Text: 10"],
])("%s have passed.", ([, count, expected], { expect }) => {
  const cat = range(count, { start: 1 }).reduce(
    (cat) => cat.pass(),
    createCat(true, createDummyAge()),
  );

  expect(cat.age).toBe(expected);
});
