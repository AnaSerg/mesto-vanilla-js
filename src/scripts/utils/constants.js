import { Api } from '../components/Api.js';

export const elementList = '.elements-list';
export const buttonEdit = document.querySelector('.button_type_edit');
export const buttonAdd = document.querySelector('.button_type_add');
export const buttonAvatar = document.querySelector('.profile__avatar-button');
export const buttonConfirmDeletion = document.querySelector('.button_type_confirm-deletion');
export const formElementEdit = document.querySelector('.form_type_edit');
export const formElementAdd = document.querySelector('.form_type_add');
export const formElementEditAvatar = document.querySelector('.form_type_edit-photo');
export const nameInput = formElementEdit.querySelector('.form__input_type_name');
export const jobInput = formElementEdit.querySelector('.form__input_type_job');

export const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.button_type_submit',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'error_active'
};

export const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
  headers: {
    authorization: '2cee6aa2-b4a3-48c5-9c04-a35e285f1434',
    'Content-Type': 'application/json'
  }
})