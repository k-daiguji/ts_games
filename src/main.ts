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
const lifespan = toAge(15);
const main = (cats: { age: Age; element: HTMLElement }[]) => {
  cats.forEach((cat) => {
    cat.age = cat.age.increment();
    if (adultAge.equal(cat.age)) cat.element.className = "adult";
    cat.element.style.top = `${generate(100)}%`;
    cat.element.style.left = `${generate(100)}%`;
  });
  const aliveCats = cats.filter((cat) => !lifespan.equal(cat.age));
  overwrite(
    "#eden",
    aliveCats.map((cat) => cat.element),
  );
  month.innerHTML = String(Number(month.innerHTML) + 1);
  start(
    () => main([...aliveCats, createCat()]),
    1 / Number((find("#speed") as HTMLInputElement).value),
  );
};
main(range(3).map(createCat));
