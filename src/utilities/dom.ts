const doc = document;

const removeElement = (element: globalThis.Element) =>
  doc.body.removeChild(element);

const clone = (element: Element | null) => element?.cloneNode(true);

export const find = (key: string) => doc.querySelector(key);

export const appendChildren = (key: string, children: (Node | undefined)[]) => {
  children
    .filter((child) => !!child)
    .forEach((child) => {
      find(key)?.appendChild(child);
    });
};

export const cache = (key: string) => {
  const target = find(key);
  if (target) {
    removeElement(target);
  }
  return () => clone(target);
};
