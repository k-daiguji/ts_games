import type { Age } from "./sandbox/age";
import { toAge } from "./sandbox/age";
import { range } from "./utilities/array";
import { cache, find, overwrite } from "./utilities/dom";
import { generate } from "./utilities/random";
import { start } from "./utilities/timer";

const month = find("#month") as Element;
const cloneCat = cache("#cat");
const createCat = () => ({ age: toAge(), element: cloneCat() });
const adultAge = toAge(1);
const main = (cats: { age: Age; element: HTMLElement }[]) => {
  cats.forEach((cat) => {
    cat.age = cat.age.increment();
    if (adultAge.equal(cat.age)) cat.element.className = "adult";
    cat.element.style.top = `${generate(100)}%`;
    cat.element.style.left = `${generate(100)}%`;
  });
  overwrite(
    "#eden",
    cats.map((cat) => cat.element),
  );
  month.innerHTML = String(Number(month.innerHTML) + 1);
  start(
    () => main([...cats, createCat()]),
    1 / Number((find("#speed") as HTMLInputElement).value),
  );
};
main(range(3).map(createCat));
