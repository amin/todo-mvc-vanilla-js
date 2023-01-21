export class TodoModel extends EventTarget {
    constructor() {
        super();
    }

    create = (task, id) => {
        if (!task) return;
        localStorage.setItem(
            id ? id : Date.now() + Math.floor(Math.random()),
            task instanceof Object
                ? JSON.stringify(task)
                : JSON.stringify({ task: task, completed: false })
        );
        this.dispatchEvent(new CustomEvent("render"));
    };

    check = (id) => {
        const task = JSON.parse(localStorage.getItem(id));
        task.completed = !task.completed;
        this.create(task, id);
    };

    delete = (id) => {
        Number(id)
            ? localStorage.removeItem(id)
            : console.warn("Task cannot be found.");
        this.dispatchEvent(new CustomEvent("render"));
    };

    filter = (todos) => {
        return { tasks: todos.tasks.filter((e) => e.completed === true) };
    };

    update = (e) => {
        this.create(
            e.currentTarget.value,
            e.currentTarget.closest("li[data-id]").dataset.id
        );
    };

    get todos() {
        if (!localStorage.length) return null;
        let data = Object.keys(localStorage).reduce(
            (accumulator, key, index) => {
                accumulator.push(JSON.parse(localStorage.getItem(key)));
                accumulator[index].id = key;
                return accumulator;
            },
            []
        );

        data = data.sort((a, b) => b.id - a.id);

        return { tasks: data };
    }
}
