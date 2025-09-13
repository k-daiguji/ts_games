import type { Age } from "./sandbox/age";
import { toAge } from "./sandbox/age";
import type { Sex } from "./sandbox/sex";
import { classifySex, initialize } from "./sandbox/sex";
import { range } from "./utilities/array";
import { cache, find, overwrite } from "./utilities/dom";
import { clamp } from "./utilities/math";
import { generate } from "./utilities/random";
import { start } from "./utilities/timer";

interface Cat {
  age: Age;
  element: HTMLElement;
  sex: Sex;
  coolTime: number;
}

const isContact = (a: number, b: number, range: number) =>
  a - range <= b && a + range >= b;
const judge = (a: { element: HTMLElement }, b: { element: HTMLElement }) => {
  const offsetA = {
    x: parseInt(a.element.style.left, 10),
    y: parseInt(a.element.style.top, 10),
  };
  const offsetB = {
    x: parseInt(b.element.style.left, 10),
    y: parseInt(b.element.style.top, 10),
  };
  return (
    isContact(offsetA.y, offsetB.y, 5) && isContact(offsetA.x, offsetB.x, 5)
  );
};
const month = find("#month") as Element;
const cloneCat = cache("#cat");
const eyeColors = [
  "#000",
  "darkslateblue",
  "palevioletred",
  "brown",
  "darkgoldenrod",
];
let isNext = true;
let id: NodeJS.Timeout | undefined;
const createCat = (sex: Sex) => {
  const element = cloneCat();
  element.addEventListener("dragstart", () => {
    isNext = false;
  });
  element.addEventListener("dragend", (e) => {
    clearTimeout(id);
    id = start(() => {
      isNext = true;
    }, 5 / Number(speed.value));
    const parent = (e.target as HTMLElement).parentElement;
    const { offsetHeight, offsetWidth } = parent ?? {
      offsetHeight: 0,
      offsetWidth: 0,
    };
    const top = clamp(((e.y - 72) / offsetHeight) * 100, 100, 0);
    (e.target as HTMLElement).style.top = `${top}%`;
    const left = clamp(((e.x - 24) / offsetWidth) * 100, 100, 0);
    (e.target as HTMLElement).style.left = `${left}%`;
  });
  element.style.setProperty("--primary", eyeColors[generate(eyeColors.length)]);
  element.style.setProperty(
    "--secondary",
    eyeColors[generate(eyeColors.length)],
  );
  element.style.setProperty("--third", eyeColors[generate(eyeColors.length)]);
  return { age: toAge(), element, sex, coolTime: 12, top: 0, left: 0 };
};
const adultAge = toAge(1);
const lifespan = toAge(10);
const speed = find("#speed") as HTMLInputElement;
const main = (cats: Cat[]) => {
  if (isNext) {
    cats.forEach((cat) => {
      cat.age = cat.age.increment();
      if (adultAge.equal(cat.age)) cat.element.className = "adult";
      if (cat.coolTime) cat.coolTime--;
      cat.element.style.top = `${generate(100)}%`;
      cat.element.style.left = `${generate(100)}%`;
    });
  }
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
  start(() => main(newCats), 5 / Number(speed.value));
};
main([true, true, false, false].map((value) => createCat(initialize(value))));
