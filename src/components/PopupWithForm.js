import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupElement, handleFormSubmit}){
    super (popupElement);
    this._popupForm = this._popupElement.querySelector('.popup__body');
    this._handleFormSubmit = handleFormSubmit;
    this._buttonSave = this._popupForm.querySelector('.popup__save');
}

_getInputValues() {
  this._inputList = this._popupForm.querySelectorAll('.popup__input');
   this._formValues = {};
  this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
  });
  return this._formValues;
}
setEventListeners() {
  super.setEventListeners();
  this._popupForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  });
  }


close() {
  super.close();
  this._popupForm.reset();
}

renderLoading(loading) {
  if (loading) {
    this._buttonSave.textContent = 'Сохранение...';
  } else {
    this._buttonSave.textContent = 'Создать';
  }
}
}
