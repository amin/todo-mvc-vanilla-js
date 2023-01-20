export class TodoView {
    constructor() {
        this.$root = document.getElementById('root');
    }

    initialise = () => {
        const baseView = require('./templates/Todo.handlebars')()
        this.renderHTML(this.$root, 'afterbegin', baseView)
    }

    render = (data) => {
        console.log(data)
    }

    renderHTML = (element, position, template) => {
        element.textContent = ''
        element.insertAdjacentHTML(position, template)
    }
}