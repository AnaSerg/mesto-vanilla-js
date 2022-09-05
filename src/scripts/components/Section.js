export class Section {
    constructor(selector) {
        this._container = document.querySelector(selector);
    }

    addItems(element) {
        this._container.prepend(element);
    }
}