import Card from './Card.js'
import FormValidator from "./FormValidator.js"
const profilePopup = document.querySelector('.profilepopup');
const popup = document.querySelector('.popup');
const popUpOpenBtn = document.querySelector('.profile__info-button');
const openCrdBtn = document.querySelector('.profile__button');
const cardsEl = document.querySelector('.cards');
const cardForm = document.querySelector('#cardForm');
const closeIcons = document.querySelectorAll(".popup__close");
const titleInput = document.querySelector('#titleInput');
const linkInput = document.querySelector('#linkInput');
const formElement = document.querySelector('#profileForm');
const nameInput = document.querySelector('#nameInput');
const jobInput = document.querySelector('#jobInput');
const nameInfo = document.querySelector('#nameInfo');
const jobInfo = document.querySelector('#jobInfo');
const cardTemplate = document.querySelector("#gallery").content;
const cardContainer = document.querySelector(".gallery");
export const popupImage = document.querySelector(".image");
export const popupImageImg = document.querySelector(".popup__image");
export const popupImageText = document.querySelector(".popup__text");
export const validationConfig = {
  formSelector: ".popup__container-item",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_invalid",
  inputErrorClass: ".error",
  errorClass: ".popup__input_state_invalid",
};

export const initialCards = [
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

const renderer = (data) => {
  data.forEach((item) => {
    const card = new Card(item, '#gallery');
    const cardElement = card.generateCard();

    cardContainer.prepend(cardElement);
  });
};
renderer(initialCards);
const cardValidator = new FormValidator(validationConfig, cardForm);
cardValidator.enableValidation();
const profileValidator = new FormValidator(validationConfig, formElement)
profileValidator.enableValidation();
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keyup', closePopupEsc);
  popup.addEventListener('click', closePopupMouse);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keyup', closePopupEsc);
  popup.removeEventListener('click', closePopupMouse);
}

const closePopupEsc = (event) => {
  event.preventDefault();
  const activePopup = document.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    closePopup(activePopup);
  }
};
const closePopupMouse = (event) => {
  const activePopup = document.querySelector('.popup_opened');
  if (event.target === event.currentTarget) {
    closePopup(activePopup);
  }
};

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
  initialCards.unshift({name: cardName, link: cardLink});
  const newCard = initialCards[0];
  const card = new Card(newCard, '#gallery');
  const cardElement = card.generateCard();

  cardContainer.prepend(cardElement);
  titleInput.value = "";
  linkInput.value = "";
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
cardForm.addEventListener("submit", cardPopupFormSubmit);



