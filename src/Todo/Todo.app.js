import { TodoView as View } from './Todo.view.js'
import { TodoModel as Model } from './Todo.model.js'

import { todoFactory } from './components/index.js'

export class Todo {
    constructor() {
        this.view = new View;
        this.model = new Model;
        todoFactory.todos = this.model.todos;
    }

    initialise = () => {
        this.todos = this.model.todos;
        this.view.initialise();
        todoFactory.build();
        this.events()
    }

    events = () => {
        todoFactory.on('li', 'click', ((e) => console.log(e.currentTarget)))
    }

    render = () => {
        this.view.render(todoFactory.view());
    }
}