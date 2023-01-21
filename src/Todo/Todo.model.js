export class TodoModel extends EventTarget {
    constructor() {
        super();
        localStorage.clear();
        this.create('Buy some food');
        this.create('travel the world');
        this.create('buy a car');
        this.create('sell tesla stock to buy a volvo');
        this.create('sell your macbook and get a pc');
    }

    create = (task) => {
        localStorage.setItem(
            Date.now() + Math.floor(Math.random() * 10000),
            JSON.stringify({ task: task, completed: false })
        );
    }

    delete = (todo) => {
        Number(todo.dataset.id)
            ? localStorage.removeItem(todo.dataset.id)
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
