import { popupImage, popupImageImg, popupImageText } from "./utils.js";
import { openPopup } from "./utils.js";

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
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
    this._element.querySelector('.gallery__item-img').addEventListener('click', () => {
      this._openPopupImage();
    });
  }

  _isLiked() {
    this._element.querySelector('.gallery__description-img').classList.toggle('gallery__description-img_selected');
  }
  _removeCard() {
    this._element.remove();
    this._element = null;
  }
  _openPopupImage() {
    openPopup(popupImage)
    popupImageImg.src = this._link;
    popupImageImg.alt = this._name;
    popupImageText.textContent = this._name;

  }

}
