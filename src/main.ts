import { range } from "./utilities/array";
import { appendChildren, cache, find } from "./utilities/dom";
import { start } from "./utilities/timer";

const month = find("#month") as Element;
const cloneCat = cache("#cat");
const firstCats = range(3).map(() => cloneCat());
appendChildren("#stage", firstCats);
const main = () => {
  month.innerHTML = String(Number(month.innerHTML) + 1);
  start(main, 1 / Number((find("#speed") as HTMLInputElement).value));
};
start(main, 1);
