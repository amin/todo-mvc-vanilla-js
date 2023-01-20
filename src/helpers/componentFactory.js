export const componentFactory = {
    on: function (element, event, handler) {
        if (!element) return;
        this.elements
            .querySelectorAll(element)
            .forEach((entry) => entry.addEventListener(event, handler));
        return this;
    },
};
