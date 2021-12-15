export const profilePopup = document.querySelector('.profilepopup');
export const popUpOpenBtn = document.querySelector('.profile__info-button');
export const openCrdBtn = document.querySelector('.profile__button');
export const cardsEl = document.querySelector('.cards');
export const cardForm = document.querySelector('#cardForm');
export const closeIcons = document.querySelectorAll(".popup__close");
export const titleInput = document.querySelector('#titleInput');
export const linkInput = document.querySelector('#linkInput');
export const formElement = document.querySelector('#profileForm');
export const nameInput = document.querySelector('#nameInput');
export const jobInput = document.querySelector('#jobInput');
export const nameInfo = document.querySelector('#nameInfo');
export const jobInfo = document.querySelector('#jobInfo');
export const cardContainer = document.querySelector(".gallery");
export const popupImage = document.querySelector(".image");
export const popupImageImg = document.querySelector(".popup__image");
export const popupImageText = document.querySelector(".popup__text");
export const cardTemplate = document.querySelector(".template").content;
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

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keyup', closePopupEsc);
  popup.addEventListener('click', closePopupMouse);
}
export function closePopup(popup) {
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
