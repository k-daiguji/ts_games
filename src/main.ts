import "./extensions/array";
import { random } from "./random";
import { loop } from "./timer";

const stage = document.getElementById("stage");
const templateCat = document.getElementById("cat");
if (stage && templateCat) {
  const cloneCat = templateCat.cloneNode(true);
  document.body.removeChild(templateCat);
  const cats = Array.range(3).map(
    () => cloneCat.cloneNode(true) as HTMLElement,
  );
  cats.forEach((cat) => {
    stage.appendChild(cat);
  });
  const generate = random(90);
  loop(
    () =>
      cats.forEach((cat) => {
        cat.style.top = `${generate()}%`;
        cat.style.left = `${generate()}%`;
      }),
    5,
  );
}
