import Card from './components/Card.js'
import FormValidator from "./components/FormValidator.js"
import { profilePopup as profile, popUpOpenBtn, openCrdBtn, cardsEl, cardForm, closeIcons, titleInput,
linkInput, formElement, nameInput, jobInput, nameInfo, jobInfo, cardContainer,
openPopup, closePopup, cardTemplate, popupImage } from "./utils/utils.js";
import { initialCards } from "./utils/utils.js";
import Popup from "./components/Popup.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
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
const profileValidator = new FormValidator(validationConfig, formElement)
profileValidator.enableValidation();

const userInfo = new UserInfo(
  {name: '.profile__info-title',
  text:'.profile__info-subtitle'});

const profilePopup = new PopupWithForm({
  handleFormSubmit: (values) => {
    profilePopup.close();
    userInfo.setUserInfo(values);

  },
  popupSelector: '.profilepopup',
});
const cardPopup = new PopupWithForm({
  handleFormSubmit: ({name, link} ) => {
    const card = new Card({name, link},".template", handleCardClick)

    const cardEl = card.generateCard(name, link);
    cardContainer.prepend(cardEl);
    cardPopup.close();
  },
  popupSelector: '.cards',
});
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
  profilePopup.setEventListeners();

  profilePopup.open();
}
openCrdBtn.addEventListener("click", openCardPopup);
popUpOpenBtn.addEventListener("click", openProfilePopup);


formElement.addEventListener("submit", profilePopup.setEventListeners);
cardForm.addEventListener('submit', cardPopup.setEventListeners);

const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item, ".template", handleCardClick);
    const cardElement = card.generateCard();
    cardList.setItem(cardElement);
  }
}, ".gallery");

function handleCardClick(name, link) {
  popupImageZoom.open(name, link);
};


cardList.renderItems();

