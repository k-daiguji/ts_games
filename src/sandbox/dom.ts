const doc = document;
const $ = doc.querySelector.bind(document);
const removeElement = (element: globalThis.Element) =>
  doc.body.removeChild(element);

export const cache = (key: string) => {
  const target = $(key);
  if (target) {
    removeElement(target);
  }
  return new Element(target);
};
export const createElement = (
  tagName: keyof HTMLElementTagNameMap,
  id = "",
) => {
  const element = doc.createElement(tagName);
  element.id = id;
  return new Element(element);
};
export const findElement = (key: string) => new Element($(key));

class Element {
  private readonly element;

  public constructor(element: globalThis.Element | null) {
    if (element instanceof HTMLElement) {
      this.element = element;
    } else {
      throw new Error("Element wasn't a globalThis.HTMLElement instance.");
    }
  }

  public setChildren(children: Element[]): Element {
    children.forEach((c) => {
      this.element.appendChild(c.element);
    });
    return new Element(this.element);
  }

  public setStyles(styles: [key: "top" | "left", value: string][]) {
    styles.forEach(([key, value]) => {
      this.element.style[key] = value;
    });
  }

  public setText(text: string): Element {
    this.element.innerHTML = text;
    return new Element(this.element);
  }

  public addEvents(events: [key: string, callback: (e: Event) => void][]) {
    events.forEach(([key, callback]) => {
      this.element.addEventListener(key, callback);
    });
    return new Element(this.element);
  }

  public copy() {
    return new Element(this.element.cloneNode(true) as HTMLElement);
  }
}
