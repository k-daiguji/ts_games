import { cache, findElement } from "./sandbox/dom";
import { range } from "./utilities/array";
import { generate } from "./utilities/random";
import type { Resume } from "./utilities/timer";
import { start } from "./utilities/timer";

let dateCount = 0;
const date = findElement("#date").setText("0");
const cacheCat = cache("#cat");
let resume: Resume;
const mouseenter = () => {
  resume = timer.pause();
};
const mouseleave = () => {
  timer = resume();
};
const cats = range(3).map(() => {
  return cacheCat.copy().addEvents([
    ["mouseenter", mouseenter],
    ["mouseleave", mouseleave],
  ]);
});
findElement("#stage").setChildren(cats);
const interval = () => {
  date.setText((++dateCount).toString());
  cats.forEach((cat) => {
    cat.setStyles([
      ["top", `${generate(90)}%`],
      ["left", `${generate(90)}%`],
    ]);
  });
};
let timer = start(interval, 1);
const input = (e: Event) => {
  timer = timer.shift(1 / Number((e.target as HTMLInputElement).value));
};
findElement("#speed").addEvents([["input", input]]);
