import { test } from "vitest";

import { createElement, findElement } from "../dom";

test("Added custom element for body.", ({ expect }) => {
  const div = document.createElement("div");
  div.id = "stage";
  document.body.appendChild(div);
  const stage = findElement("#stage");
  const rows = [1, 2].map((i) => {
    const cells = [3, 4, 5].map((j) =>
      createElement("div", `cell-${j}`).setText(String(i * j)),
    );
    return createElement("div", `row-${i}`).setChildren(cells);
  });

  stage.setChildren(rows);

  expect(String(document.body)).toBe(
    `<body><div id="stage"><div id="row-1"><div id="cell-3">3</div><div id="cell-4">4</div><div id="cell-5">5</div></div><div id="row-2"><div id="cell-3">6</div><div id="cell-4">8</div><div id="cell-5">10</div></div></div></body>`,
  );
});
