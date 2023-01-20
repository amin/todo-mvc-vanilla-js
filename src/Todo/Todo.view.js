export class TodoView {
    initialise = () => {
        this.$root = document.getElementById('root');
        const baseView = require('./templates/Todo.handlebars')()
        this.renderHTML(this.$root, 'afterbegin', baseView)
        this.defineElements();
    }

    defineElements = () => {
        this.$todo = this.$root.querySelector('section.todo');
    }

    renderElements = (data) => {
        if (!(data instanceof Element)) return;
        this.$todo.append(data);
    }

    renderHTML = (element, position, template) => {
        element.textContent = ''
        element.insertAdjacentHTML(position, template)
    }
}