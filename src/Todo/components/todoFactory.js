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

    createListItems: {
        value: function (i) {
            const li = document.createElement("li");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = "checkbox";

            const task = document.createElement("input");
            task.type = "text";
            task.name = "task";
            task.setAttribute("value", this.todos[i].task);

            const destroy = document.createElement("input");
            destroy.type = "button";
            destroy.name = "destroy";
            destroy.setAttribute("value", "delete");

            li.dataset.completed = this.todos[i].completed;
            li.dataset.id = this.todos[i].id;

            li.append(checkbox, task, destroy);
            return li;
        },
    },

    format: {
        value: function (i = 0, ul, arrlength = this.todos?.length) {
            const fragment = new DocumentFragment();
            ul = ul instanceof Element ? ul : document.createElement("ul");

            if (this.todos !== null)
                fragment.appendChild(this.createListItems(i));

            ul.appendChild(fragment);
            this.elements = ul;

            return i < --arrlength ? this.format(++i, ul) : this;
        },
    },
});

export { todoFactory };
