const popUpContainer = document.querySelector('.popup__container');
const editInfo = document.querySelector('#edit-info');
function popUpOpen() {
  popUpContainer.classList.toggle('.popup__container');
  popUpContainer.classList.toggle('.popup_opened');
}
editInfo.addEventListener('click', popUpOpen());

```jsx
// Находим форму в DOM
let formElement = // Воспользуйтесь методом querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
												// Так мы можем определить свою логику отправки.
												// О том, как это делать, расскажем позже.

	// Находим поля формы в DOM
	let nameInput = // Воспользуйтесь инструментом .querySelector()
	let jobInput = // Воспользуйтесь инструментом .querySelector()

	// Получите значение полей из свойства value

	// Выберите элементы, куда должны быть вставлены значения полей

	// Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
```
