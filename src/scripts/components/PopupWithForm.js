import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor( { popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector('.form');
        this._inputList = this._form.querySelectorAll('.form__input');
        this._submitButton = this._popupElement.querySelector('.button_type_submit');
        this._buttonText = this._submitButton.textContent;
    }

    _getInputValues () {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners () {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        });
    }

    close () {
        super.close();
        this._form.reset();
    }

    handleLoading(isLoading) {
        if(isLoading) {
          this._submitButton.textContent = 'Сохранение...';
        } else {
        this._submitButton.textContent = this._buttonText;
        }
    }
}