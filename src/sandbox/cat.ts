import type { Age } from "../age";

export const createCat = (sex: boolean, age: Age) => ({
  age: age.toText,
  pass: age.increment,
  sex,
});
