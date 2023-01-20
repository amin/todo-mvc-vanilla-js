export class TodoView {
    constructor() {
        this.$root = document.getElementById('root');
    }

    initialise = () => {
        const baseView = require('./templates/Todo.handlebars')()
        this.renderHTML(this.$root, 'afterbegin', baseView)
    }

    renderHTML = (element, position, template) => {
        element.textContent = ''
        element.insertAdjacentHTML(position, template)
    }
}