export class TodoModel extends EventTarget {
    constructor() {

        super();
        localStorage.clear();
        localStorage.setItem(
            "1374212237",
            JSON.stringify({ task: "Buy some food", completed: false })
        );
        localStorage.setItem(
            "1874238445",
            JSON.stringify({ task: "travel the world", completed: false })
        );
        localStorage.setItem(
            "1974238445",
            JSON.stringify({ task: "buy a car", completed: false })
        );
        localStorage.setItem(
            "2374238445",
            JSON.stringify({ task: "sell your macbook and get a pc", completed: false })
        );
    }

    delete = (todo) => {
        Number(todo.dataset.id) 
        ? localStorage.removeItem(todo.dataset.id)
        : console.warn('Task cannot be found.')
        this.#update();
    }

    #update = () => {
        this.dispatchEvent(new CustomEvent('update'));
    }

    get todos() {
        if (!localStorage.length) return null;
        return Object.keys(localStorage).reduce((accumulator, key, index) => {
            accumulator.push(JSON.parse(localStorage.getItem(key)));
            accumulator[index].id = key;
            return accumulator;
        }, []);
    }
}
