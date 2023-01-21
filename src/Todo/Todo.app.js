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
        TodoFactory.on('[name="new"]', "keyup", (e) => {
            if (event.key !== 'Enter') return;
                this.model.create(e.currentTarget.parentNode.children.new.value);
                console.log(e)
                e.currentTarget.focus();
        });

        TodoFactory.on('[name="create"]', "click", (e) => {
            this.model.create(e.currentTarget.parentNode.children.new.value);
        });

        TodoFactory.on('[name="completed"]', "click", (e) =>{
            this.model.check(e.currentTarget.closest("[data-id]").dataset.id)
        });

        TodoFactory.on('[name="task"]', "focusout", (e) =>
            this.model.update(e.currentTarget.closest("[data-id]").dataset.id)
        );

        TodoFactory.on('[name="destroy"]', "click", (e) =>
            this.model.delete(e.currentTarget.closest("[data-id]").dataset.id)
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
