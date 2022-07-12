const config = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.button_type_submit',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'error_active'
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
};
  
const toggleButtonState = (inputList, buttonElement, { inactiveButtonClass }, formElement) => {
    if(hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    } 
};

const showInputError = (formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, rest) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, rest);
    } else {
        hideInputError(formElement, inputElement, rest);
    }
};

// Если вводим несоответствующие данные в форму и закрываем попап. 
// При следующем открытии форма очищается от ошибок.

const disableButton = (formElement) => {
    const button = formElement.querySelector('.button_type_submit');
    console.log(button);
    button.classList.add('button_inactive');
    button.setAttribute('disabled', true);
};

const resetValidation = (formElement) => {
    const errorText = formElement.querySelectorAll('.error');
    const errorInput = formElement.querySelectorAll('.form__input');
    errorInput.forEach((input) => {
        input.classList.remove('form__input_type_error');
    });
    errorText.forEach((error) => {
        error.textContent = '';
    });
    disableButton(formElement);
};

const setEventListeners = (formElement, { inputSelector, submitButtonSelector, ...rest} ) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, rest);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, rest);
        toggleButtonState(inputList, buttonElement, rest);
        });
    });
};

const enableValidation = ( { formSelector, ...rest } ) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, rest);
    });
};

enableValidation(config);



