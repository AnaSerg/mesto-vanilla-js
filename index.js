const popup = document.querySelector('.popup');
const editBtn = document.querySelector('.button_type_edit');
const closeBtn = document.querySelector('.button_type_close');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.input_type_name');
let jobInput = document.querySelector('.input_type_job');

editBtn.addEventListener('click', () => {
    popup.classList.add('popup_opened');
});

closeBtn.addEventListener('click', () => {
    popup.classList.remove('popup_opened');
});

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    let profileJob = document.querySelector('.profile__description');
    let profileName = document.querySelector('.profile__name');
    profileJob.textContent = jobInput.value;
    profileName.textContent = nameInput.value;

    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler); 