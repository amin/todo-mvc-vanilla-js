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
        this.dispatchEvent(new CustomEvent("update"));
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
        this.dispatchEvent(new CustomEvent("update"));
    };

    filter = () => {
        if (this.todos.filter((e) => e.completed).length === null) return;
        return this.todos.filter((e) => e.completed);
    };

    update = (e) => {
        this.create(
            e.currentTarget.value,
            e.currentTarget.closest("li[data-id]").dataset.id
        );
    };

    get todos() {
        if (!localStorage.length) return null;
        return Object.keys(localStorage).reduce((accumulator, key, index) => {
            accumulator.push(JSON.parse(localStorage.getItem(key)));
            accumulator[index].id = key;
            return accumulator;
        }, []);
    }
}
