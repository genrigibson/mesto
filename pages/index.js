const popUp = document.querySelector('.popup');
const popUpCloseBtn = document.querySelector('.popup__close');
const popUpOpenBtn = document.querySelector('.profile__info-button');
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
popUpOpenBtn.addEventListener('click', togglePopUp);
popUpCloseBtn.addEventListener('click', togglePopUp);

function formSubmitHandler (evt) {
	evt.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  togglePopUp();
}
formElement.addEventListener('submit', formSubmitHandler);

