import { afterEach, beforeEach, test, vi } from "vitest";

import { start } from "../timer";

beforeEach(vi.useFakeTimers);
afterEach(vi.useRealTimers);

test.for<[string, number, number]>([
  ["9.999", 0, 9_999],
  ["10", 1, 10_000],
  ["20", 1, 20_000],
])("After %s sec, the counter equal %s.", ([, expected, ms], { expect }) => {
  let counter = 0;
  start(() => counter++, 10);

  vi.advanceTimersByTime(ms);

  expect(counter).toBe(expected);
});
