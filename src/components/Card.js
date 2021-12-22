export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;

  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.gallery__item')
      .cloneNode(true);

    return cardElement;
  }
  generateCard() {

    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector('.gallery__item-img');
    this._imageText = this._element.querySelector('.gallery__description-title');
    this._cardLike = this._element.querySelector('.gallery__description-img');
    this._removeButton = this._element.querySelector('.gallery__delete');
    this._setEventListeners();
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._imageText.textContent = this._name;

    return this._element;
  }
  _setEventListeners() {
    this._cardLike.addEventListener('click', () => {
      this._isLiked();
    });
    this._removeButton.addEventListener('click', () => {
      this._removeCard();
    });
    this._imageElement.addEventListener('click',
      () => {
      this._handleCardClick(this._name, this._link);
    });
  }
  _isLiked() {
    this._cardLike.classList.toggle('gallery__description-img_selected');
  }
  _removeCard() {
    this._element.remove();
    this._element = null;
  }

}
