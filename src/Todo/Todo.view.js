export class TodoView {
    initialise = () => {
        this.$root = document.getElementById('root');
        const baseView = require('./templates/Todo.handlebars')()
        this.renderHTML(this.$root, 'afterbegin', baseView)
        this.define();
    }

    define = () => {
        this.$todo = this.$root.querySelector('section.todo');
    }

    render = (data) => {
        if (!(data instanceof Element)) return;
        console.log(data);
        this.$todo.append(data);
    }

    renderHTML = (element, position, template) => {
        element.textContent = ''
        element.insertAdjacentHTML(position, template)
    }
}