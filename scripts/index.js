import { Card } from './Сard.js';
import { initialCards } from './cards.js';

// попапы
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_big-image');

// кнопки
const editBtn = document.querySelector('.button_type_edit');
const addBtn = document.querySelector('.button_type_add');
const closeBtns = document.querySelectorAll('.button_type_close');

// элементы формы
const formElementEdit = document.querySelector('.form_type_edit');
const nameInput = formElementEdit.querySelector('.form__input_type_name');
const jobInput = formElementEdit.querySelector('.form__input_type_job');

const formElementAdd = document.querySelector('.form_type_add');
const textInput = formElementAdd.querySelector('.form__input_type_text');
const imageInput = formElementAdd.querySelector('.form__input_type_image');

// элементы данных пользователя
const profile = document.querySelector('.profile');
const profileJob = profile.querySelector('.profile__description');
const profileName = profile.querySelector('.profile__name');

// элементы попапа увеличения картинок
const image = document.querySelector('.popup__image');
const imageDescription = document.querySelector('.popup__image-description');


initialCards.forEach((item) => {
    const card = new Card(item, '.elements-template');
    const cardElement = card.generateCard();

    document.querySelector('.elements-list').prepend(cardElement);
});

// увеличение изображений
/*
const zoomImage = (imageLink, imageText, zoomBtn) => {
    zoomBtn.addEventListener('click', function () {
        image.src = imageLink;
        image.alt = imageText;
        imageDescription.textContent = imageText;
        openPopup(popupImage);
    });
};
*/

// ОТКРЫТИЕ попапов

const openPopup = (popup) => {
    popup.classList.add('popup_opened');
};

const handleEditProfile = () => {
    resetValidation(formElementEdit);
    openPopup(popupEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
};

const openAddCardPopup = () => {
    resetValidation(formElementAdd);
    openPopup(popupAdd);
};

editBtn.addEventListener('click', handleEditProfile);
addBtn.addEventListener('click', openAddCardPopup);

// ЗАКРЫТИЕ попапов

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
};

// закрыте по клику на оверлей
popups.forEach((popup) => {
    popup.addEventListener('click', function(evt) {
        if(evt.target === evt.currentTarget) {
            closePopup(evt.target);
        }
    });
});

// закрытие на Esc
document.addEventListener('keydown', function(evt) {
    popups.forEach((popup) => {
        if(evt.key === 'Escape') {
            closePopup(popup);
        }
    });
});

// закрытие по клику на кнопку
closeBtns.forEach(item => {
    item.addEventListener('click', function (event) {
        const eventTarget = event.target.closest('.popup_opened');
        closePopup(eventTarget);
    });
});

// сохранение данных, введенных в формы

function submitFormEdit (evt) {
    evt.preventDefault();
    profileJob.textContent = jobInput.value;
    profileName.textContent = nameInput.value;
    closePopup(popupEdit);
}

formElementEdit.addEventListener('submit', submitFormEdit);

function submitFormAdd (evt) {
    evt.preventDefault();
    closePopup(popupAdd);
    renderCard({name: `${textInput.value}`, link: `${imageInput.value}`});
    formElementAdd.reset();
}

formElementAdd.addEventListener('submit', submitFormAdd);



