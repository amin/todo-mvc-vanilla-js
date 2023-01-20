export const componentFactory = {

    init: function (element) {
        if (!element) throw element
        this.el = element;
        return this;
    },

    on: function (element, handler) {
        element.addEventListener(event, handler)
        return this;
    }
}