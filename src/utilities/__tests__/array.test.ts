import { test } from "vitest";

import { range } from "../array";

test.for<[number, { start?: number; step?: number } | undefined, number[]]>([
  [9, undefined, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]],
  [9, { start: 5 }, [5, 6, 7, 8, 9]],
  [8, { step: 2 }, [0, 2, 4, 6, 8]],
  [0.9, { step: 0.1 }, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]],
  [8, { start: 4, step: 2 }, [4, 6, 8]],
])(
  "When stop is %s and option is %s, result is [%s].",
  ([length, option, expected], { expect }) => {
    const actual = range(length, option);

    expect(actual).toStrictEqual(expected);
  },
);
