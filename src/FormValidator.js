

export default class FormValidator {
  constructor(settings, formSelector) {
      this._formSelector = formSelector,
      this._inputSelector = settings.inputSelector,
      this._submitButtonSelector = settings.submitButtonSelector,
      this._inactiveButtonClass = settings.inactiveButtonClass,
      this._inputErrorClass = settings.inputErrorClass,
      this._errorClass = settings.errorClass,
      this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
      this._submitButton = this._formSelector.querySelector(this._submitButtonSelector);
  }


  enableValidation = () => {
    this._setEventListeners();
  }

  _setEventListeners() {
    this._formSelector.addEventListener('submit', this._handleSubmit)
    this._formSelector.addEventListener('input', () => {
      this._toggleButtonState();
    })

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
      })
    })

    this._toggleButtonState();

  }


  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideInputError(input)
    } else {
      this._showInputError(input);
    }
  }


  _showInputError(input) {
    const error = this._formSelector.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    error.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    const error = this._formSelector.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    error.textContent = '';
  }

  _handleSubmit(evt) {
    evt.preventDefault();
  }

  _toggleButtonState() {
    this._submitButton.disabled = !this._formSelector.checkValidity();
    this._submitButton.classList.toggle(this._inactiveButtonClass, !this._formSelector.checkValidity());
  }


}

