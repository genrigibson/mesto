

export default class FormValidator {
  constructor(settings, formSelector) {
      this._formSelector = formSelector,
      this._inputSelector = settings.inputSelector,
      this._submitButtonSelector = settings.submitButtonSelector,
      this._inactiveButtonClass = settings.inactiveButtonClass,
      this._inputErrorClass = settings.inputErrorClass,
      this._errorClass = settings.errorClass
  }


  enableValidation = () => {
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
}

/*export const validationConfig = {
  formSelector: ".popup__container-item",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: ".popup__button_invalid",
  inputErrorClass: ".error",
  errorClass: ".popup__input_state_invalid",
};
function enableValidation(config) {
  const forms = [...document.querySelectorAll(config.formSelector)];
  forms.forEach(addListenersToForm);
}
enableValidation(validationConfig);
function addListenersToForm(form) {
  const inputs = form.querySelectorAll('.popup__input');

  inputs.forEach(addListenersToInput);

  form.addEventListener('submit', handleSubmit);
  form.addEventListener('input', handleFormInput);

  setSubmitButtonState(form);
}

function handleFormInput(event) {
  const {
    currentTarget: form,
    target: {
      validity: {valid},
    },
  } = event;

  setSubmitButtonState(form);
}

function setSubmitButtonState(form) {
  const button = form.querySelector('.popup__button');
  button.disabled = !form.checkValidity();
  button.classList.toggle('popup__button_invalid', !form.checkValidity());
}

function handleSubmit(event) {
  event.preventDefault();

  const {target: form} = event;

}

function addListenersToInput(input) {
  input.addEventListener('input', handleFieldValidation);
}

function handleFieldValidation(event) {
  const {target: element} = event;
  element.setCustomValidity('');

  const errorContainer = document.querySelector(`#${element.id}-error`);

  validateLength(element);
  validateRequired(element);
  validateLink(element);

  errorContainer.textContent = element.validationMessage;

  element.classList.toggle(
    'popup__input_state_invalid',
    !element.validity.valid,
  );
}

function validateLength(inputElement) {
  if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
    inputElement.setCustomValidity(
      'Укажите строку больше 2 и меньше 30 символов.',
    );
  }
}

function validateRequired(inputElement) {
  if (inputElement.validity.valueMissing) {
    inputElement.setCustomValidity('Вы пропустили это поле.');
  }
}

function validateLink(inputElement) {
  if (inputElement.type === 'url' && inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity('Введите адрес сайта');
  }
}*/
