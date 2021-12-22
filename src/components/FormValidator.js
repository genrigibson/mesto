

export default class FormValidator {
  constructor(settings, form) {
      this._form = form,
      this._inputSelector = settings.inputSelector,
      this._submitButtonSelector = settings.submitButtonSelector,
      this._inactiveButtonClass = settings.inactiveButtonClass,
      this._inputErrorClass = settings.inputErrorClass,
      this._errorClass = settings.errorClass,
      this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
      this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }


  enableValidation = () => {
    this._setEventListeners();
  }

  _setEventListeners() {
    this._form.addEventListener('submit', this._handleSubmit)

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this.toggleButtonState();
      })
    })

    this.toggleButtonState();

  }


  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideInputError(input)
    } else {
      this._showInputError(input);
    }
  }


  _showInputError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    error.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    error.textContent = '';
  }

  _handleSubmit(evt) {
    evt.preventDefault();
  }

  toggleButtonState() {
    this._submitButton.disabled = !this._form.checkValidity();
    this._submitButton.classList.toggle(this._inactiveButtonClass, !this._form.checkValidity());
  }


}

