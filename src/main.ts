import { range } from "./utilities/array";
import { cache, find, overwrite } from "./utilities/dom";
import { generate } from "./utilities/random";
import { start } from "./utilities/timer";

const month = find("#month") as Element;
const cloneCat = cache("#cat");
const createCat = () => cloneCat();
const main = (cats: (HTMLElement | undefined)[]) => {
  const aliveCats = cats.filter((cat) => !!cat);
  aliveCats.forEach((cat) => {
    cat.style.top = `${generate(100)}%`;
    cat.style.left = `${generate(100)}%`;
  });
  overwrite("#eden", aliveCats);
  month.innerHTML = String(Number(month.innerHTML) + 1);
  start(
    () => main([...aliveCats, createCat()]),
    1 / Number((find("#speed") as HTMLInputElement).value),
  );
};
main(range(3).map(createCat));
