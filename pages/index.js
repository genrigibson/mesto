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
const popupImage = document.querySelector(".image");
const popupImageImg = document.querySelector(".popup__image");
const popupImageText = document.querySelector(".popup__text");

const initialCards = [
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


function createCard(text, img) {
  const card = cardTemplate.querySelector(".gallery__item").cloneNode(true);

  const cardText = card.querySelector(".gallery__description-title");
  const cardImage = card.querySelector(".gallery__item-img");
  const cardLike = card.querySelector(".gallery__description-img");
  const cardDeleteIcon = card.querySelector(".gallery__delete");
  cardText.textContent = text;
  cardImage.src = img;
  cardImage.alt = text;

  cardImage.addEventListener("click", function () {
    openPopup(popupImage);
    popupImageImg.src = cardImage.src;
    popupImageText.textContent = cardText.textContent;
  });

  cardLike.addEventListener("click", function () {
    cardLike.classList.toggle("gallery__description-img_selected");
  });

  cardDeleteIcon.addEventListener("click", function () {
    const fullElement = cardDeleteIcon.closest(".gallery__item");
    fullElement.remove();
  });
  return card;
}

function renderCard(text, img) {
  const createdCard = createCard(text, img);
  cardContainer.prepend(createdCard);
}

initialCards.forEach((item) => {
  renderCard(item.name, item.link);
});

function openPopup(popup) {
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
  renderCard(cardName, cardLink);
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



