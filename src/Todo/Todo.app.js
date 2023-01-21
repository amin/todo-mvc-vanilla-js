import { TodoModel as Model } from "./Todo.model.js";
import { TodoView as View } from "./Todo.view.js";
import { TodoFactory } from "./TodoFactory.js";
import './Todo.sass'

export class Todo {
    constructor() {
        this.view = new View();
        this.model = new Model();
        this.#initialise();
    }

    #initialise = () => {
        TodoFactory.todos = this.model.todos;
        this.view.initialise();
        TodoFactory.format();
        this.model.addEventListener("update", () => this.#update());
    };

    #bindEvents = () => {
        TodoFactory.on('[name="new"]', "click", (e) =>
            console.log(e.currentTarget)
        );

        TodoFactory.on('[name="create"]', "click", (e) =>
            console.log(e.currentTarget)
        );

        TodoFactory.on('[name="completed"]', "click", (e) =>{
            e.currentTarget.closest("[data-id]").toggleAttribute('data-completed');
        });

        TodoFactory.on('[name="task"]', "focusout", (e) =>
            console.log(e.currentTarget.closest("[data-id]"))
        );

        TodoFactory.on('[name="destroy"]', "click", (e) =>
            this.model.delete(e.currentTarget.closest("[data-id]"))
        );
    };

    #update = () => {
        TodoFactory.todos = this.model.todos;
        TodoFactory.format();
        this.render();
    };

    render = () => {
        this.#bindEvents();
        this.view.renderElements(TodoFactory.elements);
    };
}
