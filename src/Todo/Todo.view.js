export class TodoView {
    initialize = (data) => {
        this.$root = document.getElementById("root");
        this.render(data);
    };

    render = (data) => {
        this.#attachHTML(
            this.$root, 
            "afterbegin", 
            require("./Todo.handlebars")(data)
            );
    };

    #attachHTML = (element, position, template) => {
        element.textContent = "";
        element.insertAdjacentHTML(position, template);
    };
}