import { afterEach, beforeEach, describe, test, vi } from "vitest";
import { start } from "../timer";

beforeEach(vi.useFakeTimers);
afterEach(vi.useRealTimers);

test.for<[number, number]>([
  [9_999, 9],
  [10_000, 10],
  [10_999, 10],
  [11_000, 11],
])(
  "After %s milliseconds, the counter becomes %s.",
  ([ms, expected], { expect }) => {
    let counter = 0;
    start(() => counter++, 1);

    vi.advanceTimersByTime(ms);

    expect(counter).toBe(expected);
  },
);

describe("Multiple timer", () => {
  test("When the timer1 is cleared, the counter1 is not incremented.", ({
    expect,
  }) => {
    let counter1 = 0;
    const timer1 = start(() => counter1++, 1);
    let counter2 = 0;
    start(() => counter2++, 2);
    vi.advanceTimersByTime(2_000);

    timer1.clear();

    vi.advanceTimersByTime(2_000);

    expect(counter1).toBe(2);
    expect(counter2).toBe(2);
  });

  test("When the timer2 is cleared, the counter2 is not incremented.", ({
    expect,
  }) => {
    let counter1 = 0;
    start(() => counter1++, 1);
    let counter2 = 0;
    const timer2 = start(() => counter2++, 2);
    vi.advanceTimersByTime(2_000);

    timer2.clear();

    vi.advanceTimersByTime(2_000);

    expect(counter1).toBe(4);
    expect(counter2).toBe(1);
  });
});

describe("Pause & Resume", () => {
  test("When the timer is paused, the counter is not incremented.", ({
    expect,
  }) => {
    let counter = 0;
    const { pause } = start(() => counter++, 1);
    vi.advanceTimersByTime(1_000);

    pause();
    vi.advanceTimersByTime(2_000);

    expect(counter).toBe(1);
  });

  test("When the timer is paused and then resumed, the counter will be incremented periodically.", ({
    expect,
  }) => {
    let counter = 0;
    const { pause } = start(() => counter++, 1);
    vi.advanceTimersByTime(1_000);
    const resume = pause();
    vi.advanceTimersByTime(2_000);

    resume();
    vi.advanceTimersByTime(4_000);

    expect(counter).toBe(5);
  });
});

test("When the timer period is shifted, the counter increment rate changes.", ({
  expect,
}) => {
  let counter = 0;
  const { shift } = start(() => counter++, 1);
  vi.advanceTimersByTime(1_000);

  shift(10);
  vi.advanceTimersByTime(10_000);

  expect(counter).toBe(2);
});
