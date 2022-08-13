import { Card } from './Сard.js';
import { initialCards, elementList } from './utils/constants.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './components/Section.js';

// попапы
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_big-image');

// кнопки
const buttonEdit = document.querySelector('.button_type_edit');
const buttonAdd = document.querySelector('.button_type_add');
const buttonsClose = document.querySelectorAll('.button_type_close');

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

const config = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.button_type_submit',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'error_active'
};

// создание экземпляров класса FormValidator

const formEditValidation = new FormValidator(config, formElementEdit);
formEditValidation.enableValidation();

const formAddValidation = new FormValidator(config, formElementAdd);
formAddValidation.enableValidation();

// увеличение изображений

export function zoomImage(imageText, imageLink) {
    image.src = imageLink;
    image.alt = imageText;
    imageDescription.textContent = imageText;
    openPopup(popupImage);
}

// рендеринг карточек на странице


/*const renderCards = () => {
    initialCards.forEach(renderCard);
};

const renderCard = (data) => {
    const card = new Card(data, '.elements-template');
    const cardElement = card.generateCard();

    elementList.prepend(cardElement);
};*/

// ОТКРЫТИЕ попапов

export const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    // закрытие на Esc
    document.addEventListener('keydown', closeByEsc);
};

const handleEditProfile = () => {
    formEditValidation.resetValidation();
    openPopup(popupEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
};

const openAddCardPopup = () => {
    formAddValidation.resetValidation();
    formAddValidation.disableButton();
    formElementAdd.reset();
    openPopup(popupAdd);
};

// ЗАКРЫТИЕ попапов

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
};

// закрытие по клику на оверлей и крестик
popups.forEach((popup) => {
    popup.addEventListener('mousedown', function(evt) {
        if(evt.target.classList.contains('popup') || evt.target.classList.contains('button_type_close')) {
            closePopup(popup);
        }
    });
});

// функция закрытия с Esc
function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

// сохранение данных, введенных в формы

function submitFormEdit (evt) {
    evt.preventDefault();
    profileJob.textContent = jobInput.value;
    profileName.textContent = nameInput.value;
    closePopup(popupEdit);
}

function submitFormAdd (evt) {
    evt.preventDefault();
    closePopup(popupAdd);
    renderCard({name: `${textInput.value}`, link: `${imageInput.value}`});
}


buttonEdit.addEventListener('click', handleEditProfile);
buttonAdd.addEventListener('click', openAddCardPopup);

formElementEdit.addEventListener('submit', submitFormEdit);
formElementAdd.addEventListener('submit', submitFormAdd);

const cardsList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
      const card = new Card(cardItem, '.elements-template');
      const cardElement = card.generateCard();

      cardsList.addItems(cardElement);
    }
  }, elementList
);

cardsList.renderItems();