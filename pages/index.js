const popUp = document.querySelector('.popup');
const popUpCloseBtn = document.querySelector('.popup__close');
const popUpOpenBtn = document.querySelector('.profile__info-button');
const openCrdBtn = document.querySelector('.profile__button');
const cardsEl = document.querySelector('.cards');
const cardsClose = document.querySelector('.cards__close');
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
let formElement = document.querySelector('#profileForm');
let nameInput = document.querySelector('#nameInput');
let jobInput = document.querySelector('#jobInput');
let nameInfo = document.querySelector('#nameInfo');
let jobInfo = document.querySelector('#jobInfo');

function togglePopUp() {
  popUp.classList.toggle('popup_opened');
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
}
function toggleCardPopUp(){
  cardsEl.classList.toggle('popup_opened');
}
popUpOpenBtn.addEventListener('click', togglePopUp);
popUpCloseBtn.addEventListener('click', togglePopUp);
openCrdBtn.addEventListener('click', toggleCardPopUp);
cardsClose.addEventListener('click', toggleCardPopUp);
function formSubmitHandler (evt) {
	evt.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  togglePopUp();
}
function formSubmitHandler (evt) {
	evt.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  togglePopUp();
}
formElement.addEventListener('submit', formSubmitHandler);

