import '../pages/index.css';
import { initialCards,
        elementList,
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

const formEditValidation = new FormValidator(config, formElementEdit);
const formAddValidation = new FormValidator(config, formElementAdd);

const popupImage = new PopupWithImage('.popup_type_big-image');
const popupEdit = new PopupWithForm ({popupSelector: '.popup_type_edit', handleFormSubmit: (data) => userInfo.setUserInfo(data)});

const newCardPopup = new PopupWithForm ({
    popupSelector: '.popup_type_add',
    handleFormSubmit: (data) => {
        createNewCard(data);
    }
});

const userInfo = new UserInfo({profileNameSelector: '.profile__name', profileJobSelector: '.profile__description'});

const createNewCard = (data) => {
    const card = new Card(data, '.elements-template', handleCardClick);
    const cardElement = card.generateCard();

    cardsList.addItems(cardElement);
};

const cardsList = new Section({
    items: initialCards,
    renderer: (data) => {
        createNewCard(data);
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

cardsList.renderItems();
