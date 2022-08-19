import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popupElement.querySelector('.popup__image');
        this._imageDescription = this._popupElement.querySelector('.popup__image-description');
    }

    open (name, link) {
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._imageDescription.textContent = name;
        super.open();
    }
}