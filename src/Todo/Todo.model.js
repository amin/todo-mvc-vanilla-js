export class TodoModel {
    constructor() {
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
