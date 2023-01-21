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
        console.log(TodoFactory.todos)
        TodoFactory.todos = this.model.todos;
        this.view.initialise();
        TodoFactory.format();
        this.model.addEventListener("update", () => this.#update());
    };

    #bindEvents = () => {
        TodoFactory.on('[name="new"]', "keyup", (e) => {
            if (event.key !== 'Enter') return;
                this.model.create(e.currentTarget.parentNode.children.new.value);
        });

        TodoFactory.on('[name="create"]', "click", (e) => {
            this.model.create(e.currentTarget.parentNode.children.new.value);
        });

        TodoFactory.on('[name="completed"]', "click", (e) =>{
            this.model.check(e.currentTarget.closest("[data-id]").dataset.id)
        });

        TodoFactory.on('[name="task"]', "change", (e) =>
            this.model.update(e)
        );

        TodoFactory.on('[name="filter"]', "click", () =>
            this.#filter()
        );

        TodoFactory.on('[name="reset"]', "click", () =>
            this.#reset()
        );

        TodoFactory.on('[name="destroy"]', "click", (e) =>
            this.model.delete(e.currentTarget.closest("[data-id]").dataset.id)
        );
    };

    #reset = () => {
        TodoFactory.todos = this.model.todos
        this.render();
    }

    #filter = () => {
        if(!this.model.filter().length) return;
        TodoFactory.todos = this.model.filter();
        this.render();
    }

    #update = () => {
        TodoFactory.todos = this.model.todos;
        this.render();
    };

    render = () => {
        TodoFactory.format();
        this.#bindEvents();
        this.view.renderElements(TodoFactory.elements);
    };
}
