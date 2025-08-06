import { test } from "vitest";

import { greet } from "../greet";

test.for([
  ["James", "Hello, James!"],
  ["Mary", "Hello, Mary!"],
])(
  "When calling greet with %s, it should return '%s'.",
  ([name, expected], { expect }) => {
    const actual = greet(name);

    expect(actual).toBe(expected);
  },
);
