export class TodoModel extends EventTarget {
    constructor() {
        super();
        localStorage.clear();
        this.create('Buy fruits!');
    }

    create = (task, id) => {
        localStorage.setItem(
            id ? id : Date.now(),
            task instanceof Object ? JSON.stringify(task) : JSON.stringify({ task: task, completed: false })
        );
        this.dispatchEvent(new CustomEvent("update"));
    }

    check = (id) => {
        const task = JSON.parse(localStorage.getItem(id));
        task.completed = !task.completed;
        this.create(task, id);
        this.dispatchEvent(new CustomEvent("update"));
    }

    delete = (id) => {
        Number(id)
            ? localStorage.removeItem(id)
            : console.warn("Task cannot be found.");
        this.dispatchEvent(new CustomEvent("update"));
    };

    update = (todo) => {
        console.log(todo)
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
