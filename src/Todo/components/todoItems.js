import { componentFactory } from "../../helpers/componentFactory.js";

const todoItems = Object.create(componentFactory, {
    todos: {
        value: [
            {task: "Work on my car", completed: false, id: Date.now()},
            {task: "Buy some food", completed: false, id: Date.now()},
            {task: "Eat some chocolate", completed: false, id: Date.now()},
            {task: "Play some GTA", completed: false, id: Date.now()},
            {task: "Pwn some noobs", completed: false, id: Date.now()},
        ]
    },
    render: {
        value: function (i = 0, ul, arrlength = this.todos.length) {
            const fragment = new DocumentFragment();

            ul = ul instanceof Element ? ul : document.createElement("ul");
            const li = document.createElement("li");

            const checkbox = document.createElement("input");
            checkbox.type = 'checkbox';

            const task = document.createElement("input");
            task.type = 'text';
            task.value = this.todos[i].task;

            const destroy = document.createElement("input");
            destroy.type = 'button';
            destroy.value = 'Remove';

            li.dataset.completed = this.todos[i].completed;
            li.dataset.id = this.todos[i].id;

            li.append(checkbox, task, destroy)

            fragment.appendChild(li);
            ul.appendChild(fragment);

            return i < --arrlength ? this.render(++i, ul) : ul;
        },
    },
});

export { todoItems };
