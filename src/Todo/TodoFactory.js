import { componentFactory } from "../helpers/componentFactory.js";

const TodoFactory = Object.create(componentFactory, {
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
            li.classList.add('todo__task')

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = "completed";
            checkbox.checked = this.todos[i].completed;
            if (this.todos[i].completed) li.setAttribute('data-completed', '')


            const task = document.createElement("input");
            task.type = "text";
            task.name = "task";
            task.setAttribute("value", this.todos[i].task);

            const destroy = document.createElement("input");
            destroy.type = "button";
            destroy.name = "destroy";
            destroy.setAttribute("value", "delete");

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
            i < --arrlength
                ? this.format(++i, ul)
                : (() => {
                      const input = document.createElement("input");
                      input.type = "text";
                      input.name = "new";

                      const submit = document.createElement("input");
                      submit.type = "button";
                      submit.name = "create";
                      submit.setAttribute("value", "create");

                      const create = document.createElement('div');
                      create.append(input, submit)

                      create.classList.add('todo__new')
                      ul.classList.add('todo__list')

                      fragment.append(create, ul);


                      this.elements = fragment;
                      return this;
                  })();
        },
    },
});

export { TodoFactory };
