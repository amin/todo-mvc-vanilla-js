import { TodoView as View } from "./Todo.view.js";
import { TodoModel as Model } from "./Todo.model.js";
import { todoFactory } from "./components/index.js";

export class Todo {
    constructor() {
        this.view = new View();
        this.model = new Model();
        this.model.addEventListener('update', (() => this.update()))
    }

    initialise = () => {
        todoFactory.todos = this.model.todos;
        this.view.initialise();
        todoFactory.format();
    };

    bindEvents = () => {
        todoFactory.on('input[name="checkbox"]', "click", (e) =>
            console.log(e.currentTarget)
        );
        todoFactory.on('input[name="task"]', "click", (e) =>
            console.log(e.currentTarget)
        );
        todoFactory.on('input[name="destroy"]', "click", (e) =>
            this.model.delete(e.currentTarget.closest('li[data-id]'))
        );
    };

    update = () => {
        todoFactory.todos = this.model.todos;
        todoFactory.format();
        this.render();
    }

    render = () => {
        this.view.renderElements(todoFactory.elements);
        this.bindEvents();
    };
}
