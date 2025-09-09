import type { Age } from "./age";

export const createCat = (sex: boolean, age: Age) => ({
  age: age.text,
  sex,
  pass: () => createCat(sex, age.increment()),
});
