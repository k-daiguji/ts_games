import { test } from "vitest";

import { dom } from "../dom";

test("Added custom element for body.", ({ expect }) => {
  const stage = document.createElement("div");
  stage.id = "stage";
  document.body.appendChild(stage);
  const indexes = [1, 2];

  indexes.forEach((i) => {
    const cells = indexes.map((j) => {
      const index = i * j;
      return dom
        .create("div")
        .setId(`cell-${index}`)
        .setClass("test-class")
        .setText(String(index));
    });
    const row = dom.create("div").setId(`row-${i}`).setChildren(cells);
    dom.setChildToElement("stage", [row]);
  });

  expect(String(document.body)).toBe(
    `<body><div id="stage"><div id="row-1"><div id="cell-1" class="test-class">1</div><div id="cell-2" class="test-class">2</div></div><div id="row-2"><div id="cell-2" class="test-class">2</div><div id="cell-4" class="test-class">4</div></div></div></body>`,
  );
});
