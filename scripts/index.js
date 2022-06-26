// попапы
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');

// кнопки
const editBtn = document.querySelector('.button_type_edit');
const addBtn = document.querySelector('.button_type_add');
const closeBtn = document.querySelectorAll('.button_type_close');

// элементы формы
const formElementEdit = document.querySelector('.form_type_edit');
let nameInput = formElementEdit.querySelector('.form__input_type_name');
let jobInput = formElementEdit.querySelector('.form__input_type_job');

const formElementAdd = document.querySelector('.form_type_add');
let textInput = formElementAdd.querySelector('.form__input_type_text');
let imageInput = formElementAdd.querySelector('.form__input_type_image');

// элементы данных пользователя
const profile = document.querySelector('.profile');
let profileJob = profile.querySelector('.profile__description');
let profileName = profile.querySelector('.profile__name');

const initialCards = [
    {
      name: 'Нью-Йорк',
      link: 'https://images.unsplash.com/photo-1562649375-10a87a607863?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGNpdGllcyUyMG5ldyUyMHlvcmt8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
    },
    {
      name: 'Барселона',
      link: 'https://images.unsplash.com/photo-1622649440704-7f65fef23d25?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNpdGllcyUyMHN0cmVldHN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
    },
    {
      name: 'Сан-Франциско',
      link: 'https://images.unsplash.com/photo-1564508940884-2069e7943cc3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bW9zY293JTIwc3RyZWV0fGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60'
    },
    {
      name: 'Берлин',
      link: 'https://images.unsplash.com/photo-1588344948644-097b9a9bc3c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGJ1aWxkaW5ncyUyMGJlcmxpbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=800&q=60'
    },
    {
      name: 'Париж',
      link: 'https://images.unsplash.com/photo-1530029619632-57d6123f3537?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2l0aWVzJTIwcGFyaXN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
    },
    {
      name: 'Венеция',
      link: 'https://images.unsplash.com/photo-1575971252847-77ade1fa4997?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnVpbGRpbmdzJTIwdmVuaWNlfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60'
    }
  ]; 

// добавление карточек на страницу
const elementsList = document.querySelector('.elements-list');
const elementTemplate = document.querySelector('.elements-template').content;

const renderCards = () => {
    initialCards.forEach(renderCard);
};

const renderCard = ({name, link}) => {
    
    // отрисовка карточки и лайк
    const element = elementTemplate.cloneNode(true);
    element.querySelector('.element__text').textContent = name;
    element.querySelector('.element__image').src = link;
    element.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });

    elementsList.prepend(element);

    // удаление карточки
    const deleteBtn = document.querySelectorAll('.element__delete-button');
    console.log(deleteBtn);
    deleteBtn.forEach(item => {
        item.addEventListener('click', function (event) {
            const card = event.target.closest('.element');
            card.remove();
    });
    });

    return element;
};

renderCards();

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

// сохранение данных, введенных в формы

function submitFormEdit (evt) {
    evt.preventDefault(); 
    profileJob.textContent = jobInput.value;
    profileName.textContent = nameInput.value;
    popupEdit.classList.remove('popup_opened');
}

formElementEdit.addEventListener('submit', submitFormEdit); 

function submitFormAdd (evt) {
    evt.preventDefault();
    popupAdd.classList.remove('popup_opened');
    renderCard({name: `${textInput.value}`, link: `${imageInput.value}`});
    formElementAdd.reset();
}

formElementAdd.addEventListener('submit', submitFormAdd);


