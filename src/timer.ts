export type Resume = () => Timer;

interface Timer {
  clear: () => void;
  pause: () => Resume;
  shift: (sec: number) => Timer;
}

export const start = (func: () => void, sec: number): Timer => {
  const timeout = setInterval(func, sec * 1000);
  const clear = () => clearInterval(timeout);
  return {
    clear,
    pause: () => {
      clear();
      return () => start(func, sec);
    },
    shift: (sec: number) => {
      clear();
      return start(func, sec);
    },
  };
};
