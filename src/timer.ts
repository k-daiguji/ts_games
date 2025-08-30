export function timer(func: () => void, sec: number) {
  const timeout = setInterval(func, sec * 1000);
  return () => clearInterval(timeout);
}
