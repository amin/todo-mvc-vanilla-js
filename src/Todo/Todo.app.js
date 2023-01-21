import { TodoModel as Model } from "./Todo.model.js";
import { TodoView as View } from "./Todo.view.js";

import "./Todo.sass";

export class Todo {
    constructor() {
        this.view = new View();
        this.model = new Model();
        this.#initialise();
    }

    #initialise = () => {
        this.view.initialise(this.model.todos);
        this.#bindEvents();
        this.model.addEventListener("render", () =>
            this.render(this.model.todos)
        );
    };

    #bindEvents = () => {
        this.#on("click", '[type="checkbox"]', (e) => {
            this.model.check(e.currentTarget.closest("[data-id]").dataset.id);
        });

        this.#on("click", '[name="submit"]', (e) => {
            this.model.create(e.currentTarget.value);
            e.stopPropagation();
            e.preventDefault();
        });

        this.#on("keyup", '[name="create"]', (e) => {
            e.stopPropagation();
            e.preventDefault();
            if (event.key !== "Enter") return;
            this.model.create(e.currentTarget.value);
            e.currentTarget.focus();
        });

        this.#on("change", '[name="task"]', (e) => {
            this.model.update(e);
        });

        this.#on("click", '[name="delete"]', (e) => {
            this.model.delete(e.currentTarget.closest("[data-id]").dataset.id);
        });

        this.#on("click", '[name="filter"]', () => {
            this.#filter(this.model.todos);
        });

        this.#on("click", '[name="reset-filter"]', () => {
            this.render(this.model.todos);
        });
    };

    #filter = (todos) => {
        this.render(this.model.filter(todos));
    };

    #on = (event, selector, handler) => {
        return this.view.$root
            .querySelectorAll(selector)
            .forEach((entry) => entry.addEventListener(event, handler));
    };

    render = (data) => {
        this.view.renderElements(data);
        this.#bindEvents();
    };
}
