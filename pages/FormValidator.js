

export default class FormValidator {
  constructor(settings, formSelector) {
    this._formSelector = formSelector,
      this._inputSelector = settings.inputSelector,
      this._submitButtonSelector = settings.submitButtonSelector,
      this._inactiveButtonClass = settings.inactiveButtonClass,
      this._inputErrorClass = settings.inputErrorClass,
      this._errorClass = settings.errorClass
  }


  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this._formSelector.addEventListener('submit', this._handleSubmit)
    this._formSelector.addEventListener('input', () => {
      this._toggleButtonState();
    })

    const inputs = Array.from(this._formSelector.querySelectorAll(this._inputSelector));

    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
      })
    })

    this._toggleButtonState();
    this._validateLength();
    this._validateRequired();
    this._validateLink();
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
    const button = this._formSelector.querySelector(this._submitButtonSelector);
    button.disabled = !this._formSelector.checkValidity();
    button.classList.toggle(this._inactiveButtonClass, !this._formSelector.checkValidity());
  }

  _validateLength = () => {
    if (this._element.validity.tooShort || this._element.validity.tooLong) {
      this._element.setCustomValidity(
        'Укажите строку больше 2 и меньше 30 символов.',
      );
    }
  }

  _validateRequired = () => {
    if (this._element.validity.valueMissing) {
      this._element.setCustomValidity('Вы пропустили это поле.');
    }
  }

  _validateLink = () => {
    if (this._element.type === 'url' && this._element.validity.patternMismatch) {
      this._element.setCustomValidity('Введите адрес сайта');
    }
  }
}

