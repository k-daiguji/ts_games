import { describe, test, vi } from "vitest";
import { loop } from "../timer";

describe("loop", () => {
  test.for<[number, number]>([
    [9_999, 9],
    [10_000, 10],
    [10_999, 10],
    [11_000, 11],
  ])(
    "After %s milliseconds, the counter becomes %s.",
    ([ms, expected], { expect }) => {
      vi.useFakeTimers();
      let counter = 0;
      loop(() => counter++, 1);

      vi.advanceTimersByTime(ms);

      expect(counter).toBe(expected);
    },
  );

  test("When the timer is stopped, the counter is not incremented.", ({
    expect,
  }) => {
    vi.useFakeTimers();
    let counter = 0;
    const stop = loop(() => counter++, 1);
    vi.advanceTimersByTime(10_000);

    stop();
    vi.advanceTimersByTime(1_000);

    expect(counter).toBe(10);
  });

  describe("Multiple", () => {
    test("When the timer1 is stopped, the counter1 is not incremented.", ({
      expect,
    }) => {
      vi.useFakeTimers();
      let counter1 = 0;
      const stop1 = loop(() => counter1++, 1);
      let counter2 = 0;
      loop(() => counter2++, 2);
      vi.advanceTimersByTime(2_000);

      stop1();

      vi.advanceTimersByTime(2_000);

      expect(counter1).toBe(2);
      expect(counter2).toBe(2);
    });

    test("When the timer2 is stopped, the counter2 is not incremented.", ({
      expect,
    }) => {
      vi.useFakeTimers();
      let counter1 = 0;
      loop(() => counter1++, 1);
      let counter2 = 0;
      const stop2 = loop(() => counter2++, 2);
      vi.advanceTimersByTime(2_000);

      stop2();

      vi.advanceTimersByTime(2_000);

      expect(counter1).toBe(4);
      expect(counter2).toBe(1);
    });
  });
});
