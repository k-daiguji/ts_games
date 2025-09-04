import "./extensions/array";
import { generate } from "./random";
import type { Resume } from "./timer";
import { start } from "./timer";

const speed = document.getElementById("speed");
const date = document.getElementById("date");
const stage = document.getElementById("stage");
const templateCat = document.getElementById("cat");
if (speed && date && stage && templateCat) {
  const cloneCat = templateCat.cloneNode(true);
  document.body.removeChild(templateCat);
  const cats = Array.range(3).map(
    () => cloneCat.cloneNode(true) as HTMLElement,
  );
  const setStyle = (cat: HTMLElement) => {
    cat.style.top = `${generate(90)}%`;
    cat.style.left = `${generate(90)}%`;
  };
  let dateCount = 0;
  date.innerText = dateCount.toString();
  const interval = () => {
    date.innerText = (++dateCount).toString();
    cats.forEach(setStyle);
  };
  let timer = start(interval, 1);
  cats.forEach((cat) => {
    setStyle(cat);
    let resume: Resume;
    cat.onmouseenter = () => {
      resume = timer.pause();
    };
    cat.onmouseleave = () => {
      timer = resume();
    };
    stage.appendChild(cat);
  });
  speed.oninput = (e) => {
    timer = timer.shift(1 / Number((e.target as HTMLInputElement).value));
  };
}
