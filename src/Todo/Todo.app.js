import { TodoView as View } from './Todo.view.js'
import { TodoModel as Model } from './Todo.model.js'

import { todoItems } from './components/index.js'


const ul = todoItems.render();
const root = document.querySelector('body');

root.append(ul);

export class Todo {
    constructor() {
        this.view = new View;
        this.model = new Model;

    console.log(...this.model.todos)
    }

    initialise = () => {
        this.view.initialise();
    }
}