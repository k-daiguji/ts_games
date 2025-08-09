import { dom } from "./dom";

const sizes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const elements = sizes.map(() => {
  const cells = sizes.map(() =>
    dom.create("div").setClass("checks", "grid", "tile"),
  );
  return dom.create("div").setClass("d-flex").setChildren(cells);
});
dom.setChildToElement("root", elements);
