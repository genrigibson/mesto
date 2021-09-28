const popUp = document.querySelector('.popup');
const popUpCloseBtn = document.querySelector('.popup__close');
const popUpOpenBtn = document.querySelector('.profile__info-button');
let formElement = document.querySelector('#profileForm');

function togglePopUp() {
  popUp.classList.toggle('popup__opened');
}
popUpOpenBtn.addEventListener('click', togglePopUp);
popUpCloseBtn.addEventListener('click', togglePopUp);

function formSubmitHandler (evt) {
	evt.preventDefault();
	let nameInput = document.querySelector('#nameInput');
	let jobInput = document.querySelector('#jobInput');
  let nameInfo = document.querySelector('#nameInfo');
  let jobInfo = document.querySelector('#jobInfo');

  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
}
formElement.addEventListener('submit', formSubmitHandler);

