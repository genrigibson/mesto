class FormValidator {
  constructor(popupElements, popupForm) {
    this._popupForm = popupForm;
    this._popupElements = popupElements;

    this._popupBody = this._popupForm.querySelector(this._popupElements.formSelector);
    this._popupInputList = Array.from(this._popupBody.querySelectorAll(this._popupElements.inputSelector));
    this._popupButton = this._popupBody.querySelector(this._popupElements.submitButtonSelector);

  }
  enableValidation () {
    this._popupBody.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.toggleButtonState();

    });
    this._setEventListeners();
    };

    cleanInputError () {
      this._popupInputList.forEach((inputElement) => {
        const inputError = this._popupBody.querySelector(`.${inputElement.id}-error`);
        this._hideInputError(inputElement, inputError);
        this.toggleButtonState();
      })
    };

  _setEventListeners () {
     this.toggleButtonState();
     this._popupInputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        const inputError = this._popupBody.querySelector(`.${inputElement.id}-error`);
        this._isValid(inputElement, inputError);
        this.toggleButtonState();
      });
    });
  }

  _hasInvalidInput () {
    return this._popupInputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _isValid (input, inputError) {
    if (!input.validity.valid) {
      this._showInputError(input, inputError);
    } else {
      this._hideInputError(input, inputError);
    }
  }

  toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._popupButton.classList.add(this._popupElements.inactiveButtonClass);
      this._popupButton.setAttribute('disabled', true);
    } else {
      this._popupButton.classList.remove(this._popupElements.inactiveButtonClass);
      this._popupButton.removeAttribute('disabled', true);
    }
  }

  _hideInputError (input, inputError) {
    input.classList.remove(this._popupElements.inputErrorClass);
    inputError.textContent = '';
    inputError.classList.remove(this._popupElements.errorClass);
  }

  _showInputError (input, inputError) {
    input.classList.add(this._popupElements.inputErrorClass);
    inputError.textContent = input.validationMessage;
    inputError.classList.add(this._popupElements.errorClass);
  }
}

export {FormValidator}
