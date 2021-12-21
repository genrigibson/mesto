import PopupWithImage from "./PopupWithImage.js";

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
    this._setEventListeners();
    this._element.querySelector('.gallery__item-img').src = this._link;
    this._element.querySelector('.gallery__item-img').alt = this._name;
    this._element.querySelector('.gallery__description-title').textContent = this._name;

    return this._element;
  }
  _setEventListeners() {
    this._element.querySelector('.gallery__description-img').addEventListener('click', () => {
      this._isLiked();
    });
    this._element.querySelector('.gallery__delete').addEventListener('click', () => {
      this._removeCard();
    });
    this._element.querySelector('.gallery__item-img').addEventListener('click',
      () => {
      this._handleCardClick(this._name, this._link);
    });
  }
  _isLiked() {
    this._element.querySelector('.gallery__description-img').classList.toggle('gallery__description-img_selected');
  }
  _removeCard() {
    this._element.remove();
    this._element = null;
  }

}
