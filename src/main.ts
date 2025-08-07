import { greet } from "./greet";

const generateChild = (tagName: keyof HTMLElementTagNameMap) => {
  const child = document.createElement(tagName);
  return document.body.appendChild(child);
};
const checks1 = generateChild("div");
checks1.className = "checks h-20 w-20";
const checks2 = generateChild("div");
checks2.className = "checks2 h-20 w-20";
