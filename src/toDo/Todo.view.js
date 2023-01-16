export class TodoView {
    constructor() {
        this.$root = document.getElementById('root');
    }

    render = () => {
        const baseView = require('./templates/Todo.handlebars')()
        this.renderHTML(this.$root, 'afterbegin', baseView)
    }

    renderHTML = (element, position, template) => {
        element.textContent = ''
        element.insertAdjacentHTML(position, template)
    }
}