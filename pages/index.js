import Card from '../src/Card.js'
import FormValidator from "../src/FormValidator.js"
import { profilePopup, popUpOpenBtn, openCrdBtn, cardsEl, cardForm, closeIcons, titleInput,
linkInput, formElement, nameInput, jobInput, nameInfo, jobInfo, cardContainer } from "../src/utils.js";
import { initialCards } from "../src/initialCards.js";

export const validationConfig = {
  formSelector: ".popup__container-item",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_invalid",
  inputErrorClass: ".error",
  errorClass: ".popup__input_state_invalid",
};

  initialCards.forEach((item) => {
    renderCard(item);
  });
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
function renderCard(data) {
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
  cardValidator.enableValidation();
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



