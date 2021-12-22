import './index.css'
import Card from '../components/Card.js'
import FormValidator from "../components/FormValidator.js"
import {  popUpOpenBtn, openCardBtn, cardForm, profileForm, nameInput, jobInput, cardContainer } from "../utils/utils.js";
import { initialCards } from "../utils/utils.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
export const validationConfig = {
  formSelector: ".popup__container-item",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_invalid",
  inputErrorClass: ".error",
  errorClass: ".popup__input_state_invalid",
};


const cardValidator = new FormValidator(validationConfig, cardForm);
cardValidator.enableValidation();
const profileValidator = new FormValidator(validationConfig, profileForm)
profileValidator.enableValidation();

const userInfo = new UserInfo(
  {name: '.profile__info-title',
  text:'.profile__info-subtitle'});

const profilePopup = new PopupWithForm({
  handleFormSubmit: (values) => {
    profileValidator.toggleButtonState();
    userInfo.setUserInfo(values);
    profilePopup.close();

  },
  popupSelector: '.profilepopup',
});
profilePopup.setEventListeners();
const cardPopup = new PopupWithForm({
  handleFormSubmit: (item) => {
    cardList.addItem(createCard(item));
    cardPopup.close();
  },
  popupSelector: '.cards',
});
cardPopup.setEventListeners();
const popupImageZoom = new PopupWithImage('.image', '.popup__text', '.popup__image');
popupImageZoom.setEventListeners();
function openCardPopup() {
  cardValidator.toggleButtonState();
  cardPopup.open();
}
const openProfilePopup = () => {
  profileValidator.toggleButtonState();
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.text;
  profilePopup.open();
}
openCardBtn.addEventListener("click", openCardPopup);
popUpOpenBtn.addEventListener("click", openProfilePopup);

function createCard(item) {
  const card = new Card(item, ".template", handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    cardList.setItem(createCard(item));
  }
}, ".gallery");

function handleCardClick(name, link) {
  popupImageZoom.open(name, link);
};


cardList.renderItems();

