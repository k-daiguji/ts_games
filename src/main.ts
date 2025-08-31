import "./extensions/array";
import { random } from "./random";
import { timer } from "./timer";

const date = document.getElementById("date");
const stage = document.getElementById("stage");
const templateCat = document.getElementById("cat");
if (date && stage && templateCat) {
  const cloneCat = templateCat.cloneNode(true);
  document.body.removeChild(templateCat);
  const cats = Array.range(3).map(
    () => cloneCat.cloneNode(true) as HTMLElement,
  );
  const generate = random(90);
  const setStyle = (cat: HTMLElement) => {
    cat.style.top = `${generate()}%`;
    cat.style.left = `${generate()}%`;
  };
  let dateCount = 0;
  date.innerText = dateCount.toString();
  const delay = 1;
  const start = () =>
    timer(() => {
      date.innerText = (++dateCount).toString();
      cats.forEach(setStyle);
    }, delay);
  let stop = start();
  cats.forEach((cat) => {
    setStyle(cat);
    cat.onmouseenter = () => stop();
    cat.onmouseleave = () => {
      stop = start();
    };
    stage.appendChild(cat);
  });
}
