const doc = document;

const removeElement = (element: globalThis.Element) =>
  doc.body.removeChild(element);

const clone = (element: Element | null) =>
  element?.cloneNode(true) as HTMLElement;

export const find = (key: string) => doc.querySelector(key);

const appendChildren = (parent: Element, children: Node[]) => {
  children.forEach((child) => {
    parent.appendChild(child);
  });
};

export const overwrite = (key: string, children: Node[]) => {
  const parent = find(key);
  if (parent) {
    parent.childNodes.forEach((child) => {
      parent.removeChild(child);
    });
    appendChildren(parent, children);
  }
};

export const cache = (key: string) => {
  const target = find(key);
  if (target) {
    removeElement(target);
  }
  return () => clone(target);
};
