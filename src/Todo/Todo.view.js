export class TodoView {
    initialize = (data) => {
        this.$root = document.getElementById("root");
        this.renderElements(data);
    };

    renderElements = (data) => {
        this.attachHTML(this.$root, "afterbegin", this.compileTemplate(data));
    };

    compileTemplate = (data) => {
        return require("./Todo.handlebars")(data);
    };

    attachHTML = (element, position, template) => {
        element.textContent = "";
        element.insertAdjacentHTML(position, template);
    };
}
