export class TodoView {
    initialise = (data) => {
        this.$root = document.getElementById('root');
        this.renderHTML(this.$root, 'afterbegin', this.renderTemplate(data))
        this.$todo = this.$root.querySelector('section.todo');
    }

    renderElements = (data) => {
        this.renderHTML(this.$root, 'afterbegin', this.renderTemplate(data))
    }

    renderTemplate = (data) => {
        return require('./Todo.handlebars')(data)
    }

    renderHTML = (element, position, template) => {
        element.textContent = ''
        element.insertAdjacentHTML(position, template)
    }
}