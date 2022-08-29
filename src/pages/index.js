import '../pages/index.css';
import {elementList,
        buttonEdit,
        buttonAdd,
        formElementEdit,
        formElementAdd,
        nameInput,
        jobInput,
        config
} from '../scripts/utils/constants.js'
import { Card } from '../scripts/components/Сard.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Api } from '../scripts/components/Api.js';

const formEditValidation = new FormValidator(config, formElementEdit);
const formAddValidation = new FormValidator(config, formElementAdd);

const popupImage = new PopupWithImage('.popup_type_big-image');
const popupEdit = new PopupWithForm ({popupSelector: '.popup_type_edit', handleFormSubmit: (data) => userInfo.setUserInfo(data)});

const newCardPopup = new PopupWithForm ({
    popupSelector: '.popup_type_add',
    handleFormSubmit: (data) => {
        addNewCard(data);
    }
});

const userInfo = new UserInfo({profileNameSelector: '.profile__name', profileJobSelector: '.profile__description'});

const createCard = (data) => {
    const card = new Card(data, '.elements-template', handleCardClick);
    const cardElement = card.generateCard();
    return cardElement;
}

const addNewCard = (data) => {
    cardsList.addItems(createCard(data));
};

const cardsList = new Section({
    renderer: (data) => {
        addNewCard(data);
    }
  }, elementList
);


const handleCardClick = (name, link) => {
    popupImage.open(name, link);
};

const openPopupAdd = () => {
    formAddValidation.disableButton();
    newCardPopup.open();
};

const addToProfileInfo = () => {
    popupEdit.open();
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.job;
};

newCardPopup.setEventListeners();
popupImage.setEventListeners();
popupEdit.setEventListeners();

buttonAdd.addEventListener('click', openPopupAdd);
buttonEdit.addEventListener('click', addToProfileInfo);

formEditValidation.enableValidation();
formAddValidation.enableValidation();

//cardsList.renderItems();

const api = new Api ({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
    headers: {
      authorization: '2cee6aa2-b4a3-48c5-9c04-a35e285f1434',
      'Content-Type': 'application/json'
    }
  })

// отображение данных пользователя и карточек, полученных с сервера

Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([cards, user]) => {
        cards.forEach((card) => {
            const {name, link} = card;
            addNewCard({name, link});
        });
        const {name, about} = user;
        userInfo.setUserInfo({name, about});
    })
    .catch(() => {
        console.log('Не удалось отобразить карточки');
    })