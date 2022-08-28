export class Section {
    constructor({items, renderer}, selector) {
        this._renderedItems = items;
        this._renderer = renderer;

        this._container = document.querySelector(selector);
    }

    addItems(element) {
        this._container.prepend(element);
    }

    /*renderItems() {
        this._renderedItems.forEach(item => {
            this._renderer(item);
        });
    }*/
}