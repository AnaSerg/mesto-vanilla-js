export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        const elementImage = this._element.querySelector('.element__image');
        this._element.querySelector('.element__text').textContent = this._name;
        elementImage.src = this._link;
        elementImage.alt = this._name;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._likeImage();
        });

        this._element.querySelector('.element__delete-button').addEventListener('click', () => {
            this._deleteCard();
        });

        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    _likeImage() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    _deleteCard() {
        const cardToDelete = this._element.querySelector('.element__delete-button').closest('.element');
        cardToDelete.remove();
    }
}