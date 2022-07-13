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

const disableButton = ( { submitButtonSelector, inactiveButtonClass, ...rest }) => {
    const buttons = Array.from(document.querySelectorAll(submitButtonSelector));
    buttons.forEach((buttonElement) => {
        buttonElement.classList.add(inactiveButtonClass); 
        buttonElement.setAttribute('disabled', true); 
    });
};

const toggleButtonState = (inputList, { submitButtonSelector, inactiveButtonClass, ...rest }) => {
    const buttons = Array.from(document.querySelectorAll(submitButtonSelector));
    buttons.forEach((buttonElement) => {
        if(hasInvalidInput(inputList)) {
            disableButton({ submitButtonSelector, inactiveButtonClass, rest });
        } else {
            buttonElement.classList.remove(inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    });
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

//reset инпутов в форме
const resetValidation = ({ formSelector, inputSelector, ...rest} ) => {
    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach((formElement) => {
        const inputs = Array.from(formElement.querySelectorAll(inputSelector));
        inputs.forEach((inputElement) => {
            hideInputError(formElement, inputElement, rest);
        });
    });
}; 

const setEventListeners = (formElement, { inputSelector, ...rest} ) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    toggleButtonState(inputList, rest);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, rest);
        toggleButtonState(inputList, rest);
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



