import { TodoView as View } from './Todo.view.js';
import { TodoModel as Model } from './Todo.model.js';

import { todoItem } from './components/index.js'

console.log(todoItem)

export class Todo {
    constructor() {
        this.view = new View;
        this.model = new Model;
    }

    initialise = () => {
        this.view.render();
    }
}