import { beforeEach, test, vi } from "vitest";

import type { Age } from "../age";
import { createCat } from "../cat";

let age = 0;
const dummyAge = {
  id: "age",
  equal: vi.fn(),
  increment: () => age++,
  toText: () => `Text: ${age.toString()}`,
} satisfies Age;

beforeEach(() => {
  vi.clearAllMocks();
  age = 0;
});

test.for<[string, boolean]>([
  ["Female", false],
  ["Male", true],
])("%s cat was born.", ([, sex], { expect }) => {
  const cat = createCat(sex, dummyAge);

  expect(cat.age()).toBe("Text: 0");
  expect(cat.sex).toBe(sex);
});

test.for<[string, number, string]>([
  ["1 year", 1, "Text: 1"],
  ["9 years", 9, "Text: 9"],
  ["10 years", 10, "Text: 10"],
])("%s have passed.", ([, count, expected], { expect }) => {
  const cat = createCat(true, dummyAge);

  for (let i = 0; i < count; i++) {
    cat.pass();
  }

  expect(cat.age()).toBe(expected);
});
