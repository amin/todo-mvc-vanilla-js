import { TodoView as View } from './Todo.view.js';
import { TodoModel as Model } from './Todo.model.js';

export class Todo {
    constructor() {
        this.view = new View;
        this.model = new Model;
    }

    initialise = () => {

    }
}