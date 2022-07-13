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

const elementsList = document.querySelector('.elements-list');
const elementTemplate = document.querySelector('.elements-template').content;

// увеличение изображений

const zoomImage = (imageLink, imageText, zoomBtn) => {
    zoomBtn.addEventListener('click', function () {
        image.src = imageLink;
        image.alt = imageText;
        imageDescription.textContent = imageText;
        openPopup(popupImage);
    });
};

// лайк на картинку

const likeImage = (evt) => {
    evt.target.classList.toggle('element__like_active');
};

// удаление карточки

const deleteCard = (buttonDelete) => { 
    buttonDelete.addEventListener('click', function (event) { 
        const card = event.target.closest('.element'); 
        card.remove(); 
    }); 
}; 

// создание карточек и добавление на страницу

const renderCards = () => {
    initialCards.forEach(renderCard);
};

const renderCard = (data) => {
    const card = createCard(data);
    elementsList.prepend(card);
};

const createCard = ({name, link}) => {
    const element = elementTemplate.cloneNode(true);
    elementImage = element.querySelector('.element__image');
    element.querySelector('.element__text').textContent = name;
    elementImage.src = link;
    elementImage.alt = name;
    const buttonDelete = element.querySelector('.element__delete-button'); // обращение к кнопке удаления
    const buttonLike = element.querySelector('.element__like'); // обращение к кнопке лайка
    
    buttonLike.addEventListener('click', likeImage);
    deleteCard(buttonDelete);
    zoomImage(link, name, elementImage);

    return element;
};

renderCards();

// открытие попапов

const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    // закрытие на Esc
    document.addEventListener('keydown', closeByEsc);
};

const handleEditProfile = () => {
    resetValidation(config);
    disableButton(config);
    openPopup(popupEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
};

const openAddCardPopup = () => {
    resetValidation(config);
    disableButton(config);
    formElementAdd.reset();
    openPopup(popupAdd);
};

buttonEdit.addEventListener('click', handleEditProfile);
buttonAdd.addEventListener('click', openAddCardPopup);

// закрытие попапов

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
};

// функция закрытия с Esc
function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup); 
    }
}  

// закрыте по клику на оверлей
popups.forEach((popup) => {
    popup.addEventListener('mousedown', function(evt) {
        if(evt.target === evt.currentTarget) {
            closePopup(evt.target);
        }
    });
});

// закрытие по клику на кнопку
buttonsClose.forEach(item => {
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
}

formElementAdd.addEventListener('submit', submitFormAdd);



