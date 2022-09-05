import '../pages/index.css';
import {elementList,
        buttonEdit,
        buttonAdd,
        buttonAvatar,
        formElementEdit,
        formElementAdd,
        formElementEditAvatar,
        nameInput,
        jobInput,
        config,
        api
} from '../scripts/utils/constants.js'
import { Card } from '../scripts/components/Сard.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupConfirm } from '../scripts/components/PopupConfirm.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';

// отображение данных пользователя и карточек, полученных с сервера
let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([cards, user]) => {
        userId = user._id;
        cardsList.renderItems(cards.reverse());

        userInfo.setUserInfo(user);
        userInfo.setAvatarInfo(user);
    })
    .catch((err) => {
        console.log(err);
    })

const formEditValidation = new FormValidator(config, formElementEdit);
const formAddValidation = new FormValidator(config, formElementAdd);
const formAvatarValidation = new FormValidator(config, formElementEditAvatar);

const popupImage = new PopupWithImage('.popup_type_big-image');
const popupConfirm = new PopupConfirm('.popup_type_confirm-deletion');

const newCardPopup = new PopupWithForm ({
    popupSelector: '.popup_type_add',
    handleFormSubmit: async (data) => {
        try {
            newCardPopup.handleLoading(true);
            const card = await api.sendNewCard(data);
            cardsList.addItems(createCard(card));
            newCardPopup.close();
        }
        catch (err) {
            console.log(err);
        }
        finally {
            newCardPopup.handleLoading(false);
        }
    }
});

const popupEdit = new PopupWithForm ({
    popupSelector: '.popup_type_edit',
    handleFormSubmit: async (data) => {
        try {
            popupEdit.handleLoading(true);
            const profile = await api.sendUserInfo(data);
            userInfo.setUserInfo(profile);
            popupEdit.close();
        }
        catch (err) {
            console.log(err);
        }
        finally {
            popupEdit.handleLoading(false);
        }
    }
});

const changeAvatarPopup = new PopupWithForm ({
    popupSelector: '.popup_type_edit-photo',
    handleFormSubmit: async (data) => {
        try {
            changeAvatarPopup.handleLoading(true);
            const avatar = await api.sendAvatarInfo(data);
            userInfo.setAvatarInfo(avatar);
            changeAvatarPopup.close();
        }
        catch (err) {
            console.log(err);
        }
        finally {
            changeAvatarPopup.handleLoading(false);
        }
    }
});

const userInfo = new UserInfo({profileNameSelector: '.profile__name', profileJobSelector: '.profile__description', profileAvatarSelector: '.profile__avatar'});

const cardsList = new Section({
    renderer: (data) => {
        addNewCard(data);
    }
  }, elementList
);

// Создание карточек

const handleCardClick = (name, link) => {
    popupImage.open(name, link);
};

const addNewCard = (data) => {
    cardsList.addItems(createCard(data));
};

const createCard = (data) => {
    const card = new Card(data, userId, '.elements-template', {handleDelete: () => {
        popupConfirm.open();
        popupConfirm.handleSubmit(() => {
            api.deleteCard(data._id)
            .then(() => {
                card.deleteCard();
                popupConfirm.close();
            })
            .catch((err) => {
                console.log(err);
            })
        })
    },
        handleLikeCard: (card) => {
            if(!card.isLiked()) {
                api.addLike(card._id)
                .then((data) => {
                    card.likeImage();
                    card.setLike(data.likes);
                })
                .catch((err) => {
                    console.log(err);
                })
            } else {
                api.deleteLike(card._id)
                .then((data) => {
                    card.dislikeImage();
                    card.setLike(data.likes);
                })
                .catch((err) => {
                    console.log(err);
                })
            }
        }
}, handleCardClick);

    const cardElement = card.generateCard();
    return cardElement;
}

const openPopupAdd = () => {
    formAddValidation.resetValidation();
    newCardPopup.open();
};

const addToProfileInfo = () => {
    const userData = userInfo.getUserInfo();
    popupEdit.setInputValues(userData);
    popupEdit.open();
};

const changeAvatar = () => {
    formAvatarValidation.resetValidation();
    changeAvatarPopup.open();
}

newCardPopup.setEventListeners();
popupImage.setEventListeners();
popupEdit.setEventListeners();
popupConfirm.setEventListeners();
changeAvatarPopup.setEventListeners();

buttonAdd.addEventListener('click', openPopupAdd);
buttonEdit.addEventListener('click', addToProfileInfo);
buttonAvatar.addEventListener('click', changeAvatar)

formEditValidation.enableValidation();
formAddValidation.enableValidation();
formAvatarValidation.enableValidation();