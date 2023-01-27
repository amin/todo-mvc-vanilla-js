export class TodoModel extends EventTarget {
    constructor() {
        super();
    }

    create = (task, id) => {
        if (!task) return;
        localStorage.setItem(
            id ? id : Date.now(),
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
        Number(id) ? localStorage.removeItem(id) : false;
        this.dispatchEvent(new CustomEvent("render"));
    };

    filter = (filter) => {
        if (!this.todos) return;
        if (!filter) return

        this.dispatchEvent(
            new CustomEvent("render", {
                detail: {
                    todos: {
                        tasks: this.todos.tasks.filter((e) =>
                            filter === "completed"
                            ? e.completed: filter === "active"
                            ? !e.completed : e.id
                        ),
                        [filter]: true
                    },
                },
            })
        );
    };

    update = (task) => {
        this.create(
            task.value,
            task.closest("li[data-id]").dataset.id
        );
    };

    clear = () => {
        localStorage.clear();
        this.dispatchEvent(new CustomEvent("render"));
    };

    get todos() {
        if (!localStorage.length) return null;
        const data = Object.keys(localStorage).reduce(
            (accumulator, key, index) => {
                accumulator.push(JSON.parse(localStorage.getItem(key)));
                accumulator[index].id = key;
                return accumulator;
            },
            []
        );
        return { tasks: data.sort((a, b) => a.id - b.id) };
    }
}
