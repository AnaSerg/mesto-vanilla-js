// попапы
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');

// кнопки
const editBtn = document.querySelector('.button_type_edit');
const addBtn = document.querySelector('.button_type_add');
const closeBtn = document.querySelectorAll('.button_type_close');

// объявляем переменные для элементов формы
const formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__input_type_name');
let jobInput = formElement.querySelector('.form__input_type_job');

// объявляем переменные для элементов данных пользователя
const profile = document.querySelector('.profile');
let profileJob = profile.querySelector('.profile__description');
let profileName = profile.querySelector('.profile__name');


const elementsList = document.querySelector('.elements-list');
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

// открытие попапов
const openPopup = (popup) => {
    popup.classList.add('popup_opened');
};

const handleEditProfile = () => {
    openPopup(popupEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
};

const addCard = () => {
    openPopup(popupAdd);
};

editBtn.addEventListener('click', handleEditProfile);
addBtn.addEventListener('click', addCard);

// закрытие попапов
closeBtn.forEach(item => {
    item.addEventListener('click', function (event) {
        const popup = event.target.closest('.popup_opened');
        popup.classList.remove('popup_opened');
    });
});

// функция сохранения введенных данных в попап
function submitForm (evt) {
    evt.preventDefault(); 
    profileJob.textContent = jobInput.value;
    profileName.textContent = nameInput.value;
    popupEdit.classList.remove('popup_opened');
}

formElement.addEventListener('submit', submitForm); 
