init();

function init() {
  const forms = [...document.querySelectorAll('.popup__container-item')];
  forms.forEach(addListenersToForm)
}

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
  const data = [...form.querySelectorAll('.popup__input')].reduce(
    (sum, input) => ({
      ...sum,
      [input.name]: input.value,
    }),
  );
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
}
