// объявляем переменные для открытия и закрытия попапа
const popup = document.querySelector('.popup');
const editBtn = document.querySelector('.button_type_edit');
const closeBtn = document.querySelector('.button_type_close');

// объявляем переменные для элементов формы
const formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__input_type_name');
let jobInput = formElement.querySelector('.form__input_type_job');

// объявляем переменные для элементов данных пользователя
const profile = document.querySelector('.profile');
let profileJob = profile.querySelector('.profile__description');
let profileName = profile.querySelector('.profile__name');

// функция открытия попапа при нажатии на кнопку редактирования
function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

editBtn.addEventListener('click', openPopup);

// функция закрытия попапа при нажатии на крестик
function closePopup() {
    popup.classList.remove('popup_opened');
}

closeBtn.addEventListener('click', closePopup);

// функция сохранения введенных данных в попап
function submitForm (evt) {
    evt.preventDefault(); 
    profileJob.textContent = jobInput.value;
    profileName.textContent = nameInput.value;

    closePopup();
}

formElement.addEventListener('submit', submitForm); 