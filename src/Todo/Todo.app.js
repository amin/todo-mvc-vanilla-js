import { TodoView as View } from "./Todo.view.js";
import { TodoModel as Model } from "./Todo.model.js";
import { todoFactory } from "./components/index.js";

export class Todo {
    constructor() {
        this.view = new View();
        this.model = new Model();
    }

    initialise = () => {
        todoFactory.todos = this.model.todos;
        this.view.initialise();
        todoFactory.build();
    };

    bindEvents = () => {
        todoFactory.on('input[name="checkbox"]', "click", (e) =>
            console.log(e.currentTarget)
        );
        todoFactory.on('input[name="task"]', "click", (e) =>
            console.log(e.currentTarget)
        );
        todoFactory.on('input[name="destroy"]', "click", (e) =>
            console.log(e.currentTarget)
        );
    };

    render = () => {
        this.view.renderElements(todoFactory.elements);
        this.bindEvents();
    };
}
