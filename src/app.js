import "./base/styles/app.sass";
import { Todo } from "./Todo/Todo.app.js";

document.addEventListener("DOMContentLoaded", () => {
    const template = require("./base/templates/index.handlebars");
    document.body.insertAdjacentHTML("beforeend", template());
    new Todo();
});
