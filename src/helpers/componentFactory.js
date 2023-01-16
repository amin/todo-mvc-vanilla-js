export const componentFactory = {
    init: (element) => {
        if (!element) throw element
            this.element = element
        return this;
    },

    on: (event, handler) => {
        this.element.addEventListener(event, handler)
        return this;
    }
}