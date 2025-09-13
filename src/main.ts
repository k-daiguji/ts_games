import type { Age } from "./sandbox/age";
import { toAge } from "./sandbox/age";
import type { Sex } from "./sandbox/sex";
import { classifySex, initialize } from "./sandbox/sex";
import { range } from "./utilities/array";
import { cache, find, overwrite } from "./utilities/dom";
import { generate } from "./utilities/random";
import { start } from "./utilities/timer";

interface Cat {
  age: Age;
  element: HTMLElement;
  sex: Sex;
  top: number;
  left: number;
  coolTime: number;
}
type Position = { top: number; left: number };

const isContact = (a: number, b: number, range: number) =>
  a - range <= b && a + range >= b;
const judge = (a: Position, b: Position) =>
  isContact(a.top, b.top, 5) && isContact(a.left, b.left, 5);
const month = find("#month") as Element;
const cloneCat = cache("#cat");
let isNext = true;
const createCat = (sex: Sex) => {
  const element = cloneCat();
  element.onmouseover = () => {
    isNext = false;
  };
  element.onmouseleave = () => {
    isNext = true;
  };
  return { age: toAge(), element, sex, coolTime: 12, top: 0, left: 0 };
};
const adultAge = toAge(1);
const lifespan = toAge(10);
const main = (cats: Cat[]) => (isNext ? update(cats) : next(cats));
const speed = find("#speed") as HTMLInputElement;
const next = (cats: Cat[]) => start(() => main(cats), 5 / Number(speed.value));
const update = (cats: Cat[]) => {
  cats.forEach((cat) => {
    cat.age = cat.age.increment();
    if (adultAge.equal(cat.age)) cat.element.className = "adult";
    if (cat.coolTime) cat.coolTime--;
    cat.top = generate(100);
    cat.left = generate(100);
    cat.element.style.top = `${cat.top}%`;
    cat.element.style.left = `${cat.left}%`;
  });
  const aliveCats = cats.filter((cat) => !lifespan.equal(cat.age));
  const { females, males } = classifySex(aliveCats);
  const newCats = aliveCats.concat(
    males
      .flatMap((male) => {
        const female = females.find((female) => judge(male, female));
        if (female?.coolTime === 0) {
          female.coolTime = 6;
          return range(generate(5)).map(() =>
            createCat(initialize(generate(2) > 1)),
          );
        }
        return [];
      })
      .filter((cat) => cat),
  );
  overwrite(
    "#eden",
    newCats.map((cat) => cat.element),
  );
  month.innerHTML = String(Number(month.innerHTML) + 1);
  next(newCats);
};
main([true, true, false, false].map((value) => createCat(initialize(value))));
