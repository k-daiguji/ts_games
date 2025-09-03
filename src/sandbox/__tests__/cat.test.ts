import { test } from "vitest";

import { createCat } from "../cat";

test.for<[string, boolean]>([
  ["female", false],
  ["male", true],
])("Created %s cat.", ([, sex], { expect }) => {
  const cat = createCat(sex);

  expect(cat.sex).toBe(sex);
});
