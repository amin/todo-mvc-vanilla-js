import { componentFactory } from "../../helpers/componentFactory.js";

const todoItems = Object.create(componentFactory, {
    list: {
        value: [
            "Work on my car",
            "Buy some food",
            "Eat som chocolate",
            "play some gta",
            "pwn some noobs",
        ],
    },
    render: {
        value: function (i = 0, ul, length = this.list.length) {
            ul = ul instanceof Element ? ul : document.createElement("ul");
            const li = document.createElement("li");
            li.textContent = this.list[i];
            ul.appendChild(li);
            return i < --length ? this.render(++i, ul) : ul;
        },
    },
});

export { todoItems };
