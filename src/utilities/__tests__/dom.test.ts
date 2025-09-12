import { afterEach, beforeEach, describe, test } from "vitest";

import { range } from "../array";
import { cache, find, overwrite } from "../dom";

const root = document.createElement("div");
root.id = "root";

beforeEach(() => document.body.appendChild(root));
afterEach(
  () => document.body.hasChildNodes() && document.body.removeChild(root),
);

test("Found element by ID.", ({ expect }) => {
  const actual = find("#root");

  expect(actual).toStrictEqual(root);
});

test("Appended elements for ID.", ({ expect }) => {
  const children = range(2, { start: 1 }).map((index) => {
    const dummy = document.createElement("div");
    dummy.id = `dummy${index}`;
    return dummy;
  });

  overwrite("#root", children);

  expect(document.body.innerHTML).toBe(
    '<div id="root"><div id="dummy1"></div><div id="dummy2"></div></div>',
  );
});

describe("Cached", () => {
  test("Removed element.", ({ expect }) => {
    cache("#root");

    expect(document.body.innerHTML).toBe("");
  });

  test("Cloned element.", ({ expect }) => {
    const clone = cache("#root");

    const actual = clone();

    expect(actual).toStrictEqual(root);
  });
});
