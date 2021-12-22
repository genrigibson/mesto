import Popup  from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit , popupSelector }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__container-item');
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    const data = {}
    this._inputs.forEach(input => data[input.name] = input.value);
    return data;
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmit.bind(this));
  }

  close() {
    super.close();
    this._form.reset();

  }
}
