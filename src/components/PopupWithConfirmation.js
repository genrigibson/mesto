import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._popupForm = this._popupElement.querySelector('.popup__body');
  }

  setSubmitAction(submitHandler) {
    this._handleFormSubmit = submitHandler;

  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
      this.close();
    })
  }
}