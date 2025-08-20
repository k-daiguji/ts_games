import { dom } from "./dom";

const map = [
  [2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2],
  [1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1],
  [1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1],
  [1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1],
  [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1],
];
const elements = map.map((row) => {
  const cells = row.map((i) => dom.create("div").setClass(`color${i}`, "tile"));
  return dom.create("div").setClass("d-flex").setChildren(cells);
});
dom.setChildToElement("root", elements);
