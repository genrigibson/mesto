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

/*  initialCards.forEach((item) => {
    renderCard(item);
  });*/
const cardValidator = new FormValidator(validationConfig, cardForm);
cardValidator.enableValidation();
const profileValidator = new FormValidator(validationConfig, formElement)
profileValidator.enableValidation();
const userInfo = new UserInfo({
  name: '.profile__info-title',
  text: '.profile__info-subtitle',
});

const profilePopup = new PopupWithForm({
  handleFormSubmit: (inputs) => {
    userInfo.setUserInfo(inputs);
    profilePopup.close();
  },
  popupSelector: '.profilepopup',
});

const cardPopup = new PopupWithForm({
  handleFormSubmit: ({ title, link }) => {
    const card = createCard(title, link);
    cardsList.addItem(card, "prepend");
    cardPopup.close();
  },
  popupSelector: '.cards',
});

const photoPopup = new PopupWithImage('.image');

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item.name, item.link);
      cardsList.addItem(card, "append");
    },
  },
  cardContainer
);
function handleCardClick(cardElement) {
  photoPopup.open(cardElement);//открыть lookImg
}
function openProfilePopup() {
  const { name, text } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = text;
  profileValidator.toggleButtonState();
  profilePopup.open();
}

function openCardPopup() {
  cardValidator.toggleButtonState();
  cardPopup.open();
}

function createCard(name, link) {
  return new Card(name, link, cardTemplate, {
    handleCardClick: (name, link) => {
      photoPopup.open(name, link);
    },
  }).generateCard();
}

popUpOpenBtn.addEventListener("click", openProfilePopup);
openCrdBtn.addEventListener("click", openCardPopup);


profilePopup.setEventListeners();
photoPopup.setEventListeners();
cardPopup.setEventListeners();

cardsList.renderItems();


/*function renderCard(data) {
  const card = new Card(data, '#gallery');
  const cardElement = card.generateCard();

  cardContainer.prepend(cardElement);
}
function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const about = jobInput.value;
  nameInfo.textContent = name;
  jobInfo.textContent = about;
  closePopup(profilePopup);
}

function cardPopupFormSubmit(evt) {
  evt.preventDefault();
  const cardName = titleInput.value;
  const cardLink = linkInput.value;
  renderCard({name: cardName, link: cardLink});
  titleInput.value = "";
  linkInput.value = "";
  cardValidator.toggleButtonState();
  closePopup(cardsEl);
}

popUpOpenBtn.addEventListener("click", function () {
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
  openPopup(profilePopup);
});
openCrdBtn.addEventListener("click", function () {
  openPopup(cardsEl);
});
for (const closeIcon of closeIcons) {
  closeIcon.addEventListener("click", function () {
    const closestPopup = closeIcon.closest(".popup");
    closePopup(closestPopup);
  });
}
formElement.addEventListener("submit", profileFormSubmitHandler);
cardForm.addEventListener("submit", cardPopupFormSubmit);*/


