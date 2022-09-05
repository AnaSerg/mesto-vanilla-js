import { Popup } from './Popup.js';

export class PopupConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popupElement.querySelector('.form');
    }

    handleSubmit(handler) {
        this._handleSubmitHandler = handler;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitHandler();
        });
    }
}