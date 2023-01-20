import { TodoView as View } from './Todo.view.js'
import { TodoModel as Model } from './Todo.model.js'

import { todoItems } from './components/index.js'


const ul = todoItems.render();
console.log(ul);



export class Todo {
    constructor() {
        this.view = new View;
        this.model = new Model;
    }

    initialise = () => {
        this.view.render();
    }
}