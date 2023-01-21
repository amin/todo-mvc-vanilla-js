export class TodoView {
    initialise = () => {
        this.$root = document.getElementById('root');
        const baseView = require('./Todo.handlebars')()
        this.renderHTML(this.$root, 'afterbegin', baseView)
        this.$todo = this.$root.querySelector('section.todo');
    }

    renderElements = (data) => {
        this.$todo.textContent = '';
        this.$todo.appendChild(data);
    }

    renderHTML = (element, position, template) => {
        element.textContent = ''
        element.insertAdjacentHTML(position, template)
    }
}