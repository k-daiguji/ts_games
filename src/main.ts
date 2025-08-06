import { greet } from "./greet";

const app = document.createElement("div");
app.innerHTML = greet("World");
document.body.appendChild(app);
