import { greet } from "./greet";

const generateChild = (tagName: keyof HTMLElementTagNameMap) => {
  const child = document.createElement(tagName);
  return document.body.appendChild(child);
};
const app = generateChild("div");
app.className = "h-100";
app.innerHTML = greet("World");
