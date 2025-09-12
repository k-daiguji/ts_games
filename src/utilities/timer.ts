type Func = () => void;

export const start = (func: Func, sec: number) => setTimeout(func, sec * 1000);
