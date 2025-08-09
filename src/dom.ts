// HTML DOM manipulation utility class
class Body {
  private readonly doc: Document;

  /**
   * Constructor
   */
  private constructor() {
    this.doc = document;
  }

  /**
   * Factory method to create an instance of Dom
   * @returns An instance of Dom
   */
  public static create(): Body {
    return new Body();
  }

  /**
   * Creates a new HTML element with the specified tag name
   * @param tagName The tag name of the element to create
   * @returns An Element instance wrapping the created HTMLElement
   */
  public create(tagName: keyof HTMLElementTagNameMap) {
    const element = this.doc.createElement(tagName);
    return Element.create(element);
  }

  /**
   * Sets the inner HTML of the body element
   * @param id The id of the element to set as child
   * @param children The child elements to append
   * @returns The Body instance for chaining
   */
  public setChildToElement(id: string, children: Element[]): void {
    const parent = this.doc.body.querySelector(`#${id}`);
    if (!parent) throw new Error(`Element with id ${id} not found`);
    Element.create(parent).setChildren(children);
  }
}

// Element class to encapsulate HTMLElement operations
class Element {
  private readonly element: HTMLElement | globalThis.Element;

  /**
   * Constructor
   * @param element The HTMLElement or globalThis.Element to wrap
   */
  private constructor(element: HTMLElement | globalThis.Element) {
    this.element = element;
  }

  /**
   * Factory method to create an Element instance
   * @param element The HTMLElement or globalThis.Element to wrap
   * @returns An instance of Element
   */
  public static create(element: HTMLElement | globalThis.Element): Element {
    return new Element(element);
  }

  /**
   * sets the children of the element
   * @param children The child elements to append
   * @return The Element instance for chaining
   */
  public setChildren(children: Element[]): Element {
    children.forEach((c) => this.element.appendChild(c.element));
    return Element.create(this.element);
  }

  /**
   * Sets the class names of the element
   * @param name The first class name
   * @param names Additional class names
   * @returns The Element instance for chaining
   */
  public setClass(name: string, ...names: string[]): Element {
    [name, ...names].forEach((n) => this.element.classList.add(n));
    return Element.create(this.element);
  }

  /**
   * Sets the id of the element
   * @param id The id to set for the element
   * @return The Element instance for chaining
   */
  public setId(id: string): Element {
    this.element.id = id;
    return Element.create(this.element);
  }

  /**
   * Sets the inner HTML of the element
   * @param text The text to set as inner HTML
   * @returns The Element instance for chaining
   */
  public setText(text: string): Element {
    this.element.innerHTML = text;
    return Element.create(this.element);
  }
}

export const dom = Body.create();
