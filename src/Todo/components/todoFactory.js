import { componentFactory } from "../../helpers/componentFactory.js";

const todoFactory = Object.create(componentFactory, {
    todo: {
        set todos(value) {
            this.todos = value;
        },

        get todos() {
            return this.todos;
        },
    },

    view: {
        value: function () {
            return this.elements;
        },
    },

    build: {
        value: function (i = 0, ul, arrlength = +this.todos?.length) {
            if(!this.todos) return;
            const fragment = new DocumentFragment();

            ul = ul instanceof Element ? ul : document.createElement("ul");
            const li = document.createElement("li");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = "checkbox";

            const task = document.createElement("input");
            task.type = "text";
            task.name = "task";
            task.value = this.todos[i].task;

            const destroy = document.createElement("input");
            destroy.type = "button";
            destroy.name = "destroy";
            destroy.value = "delete";

            li.dataset.completed = this.todos[i].completed;
            li.dataset.id = this.todos[i].id;

            li.append(checkbox, task, destroy);

            fragment.appendChild(li);
            ul.appendChild(fragment);
            this.elements = ul;

            return i < --arrlength ? this.build(++i, ul) : this;
        },
    },
});

export { todoFactory };
