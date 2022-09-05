export class Card {
    constructor(data, userId, templateSelector, {handleDelete, handleLikeCard}, handleCardClick) {
        this._name = data.name;
        this._likes = data.likes;
        this._link = data.link;
        this._ownerId = data.owner._id;
        this._id = data._id;
        this._userId = userId;
        this._cardId = data._id;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDelete = handleDelete;
        this._handleLikeCard = handleLikeCard;
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
        this._deleteButton = this._element.querySelector('.element__delete-button');
        this._imageButton = this._element.querySelector('.element__image');
        this._likesNum = this._element.querySelector('.element__like-count');
        this._likeButton = this._element.querySelector('.element__like');

        this._element.querySelector('.element__text').textContent = this._name;
        this._imageButton.src = this._link;
        this._imageButton.alt = this._name;

        this._setEventListeners();
        this._hideDeleteButton(this._deleteButton);
        this.setLike(this._likes);
        this._checkOwnLike();

        return this._element;
    }

    isLiked() {
        return this._likes.some(like => like._id === this._userId);
    }

    setLike(data) {
        this._likes = data;
        this._likesNum.textContent = this._likes.length;
    }

    _checkOwnLike() {
        if(this.isLiked()) {
            this.likeImage()
        } else {
            this.dislikeImage();
        }
    }

    likeImage() {
        this._likeButton.classList.add('element__like_active');
    }


    dislikeImage() {
        this._likeButton.classList.remove('element__like_active');
    }

    deleteCard () {
        this._element.remove();
        this._element = null;
    }

    _hideDeleteButton(button) {
        if (this._ownerId !== this._userId) {
            button.remove();
        }
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeCard(this);
        });

        this._deleteButton.addEventListener('click', () => {
            this._handleDelete(this._cardId);
        });

        this._imageButton.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }
}