import { TodoModel as Model } from "./Todo.model.js";
import { TodoView as View } from "./Todo.view.js";

import "./Todo.sass";

export class Todo {
    constructor() {
        this.view = new View();
        this.model = new Model();
        this.#initialize();
    }

    #initialize = () => {
        this.view.initialize(this.model.todos);
        this.#bindEvents();
        this.model.addEventListener("render", () =>
            this.render(this.model.todos)
        );
    };

    #bindEvents = () => {
        this.#on("click", '[type="checkbox"]', (e) => {
            this.model.check(e.currentTarget.closest("[data-id]").dataset.id);
        });

        this.#on("click", '[name="create"]', (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.model.create(e.currentTarget.value);
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

        this.#on("click", '[name="clear"]', () => {
            this.#clear();
        });
    };

    #clear = () => {
        this.model.clear();
        this.render();
    };

    #filter = (filter) => {
        this.render(this.model.filter(filter));
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
