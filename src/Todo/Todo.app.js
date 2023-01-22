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
        this.model.addEventListener("render", (e) =>
        e.detail ? this.#render(e.detail.todos) : this.#render(this.model.todos)
        );
    };

    #bindEvents = () => {
        this.#on("click", '[type="checkbox"]', (e) => {
            this.model.check(e.currentTarget.closest("[data-id]").dataset.id);
        });

        this.#on("click", '[type="submit"][name="create"]', (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.model.create(e.currentTarget.previousElementSibling.value);
        });

        this.#on("keyup", '[name="create"]', (e) => {
            e.stopPropagation();
            e.preventDefault();
            if (event.key !== "Enter") return;
            this.model.create(e.currentTarget.value);
        });

        this.#on("change", '[name="task"]', (e) => {
            this.model.update(e);
        });

        this.#on("click", '[name="delete"]', (e) => {
            this.model.delete(e.currentTarget.closest("[data-id]").dataset.id);
        });

        this.#on("click", '[name="filter"]', (e) => {
            this.model.filter('completed');
        });

        this.#on("click", '[name="reset-filter"]', () => {
            this.#render(this.model.todos);
        });

        this.#on("click", '[name="clear"]', () => {
            this.model.clear();
        });
    };

    #on = (event, selector, handler) => {
        return this.view.$root
            .querySelectorAll(selector)
            .forEach((entry) => entry.addEventListener(event, handler));
    };

    #render = (data) => {
        this.view.renderElements(data);
        this.#bindEvents();
    };
}