export function loop(func: () => void, sec: number) {
  const timer = setInterval(func, sec * 1000);
  return () => clearInterval(timer);
}
