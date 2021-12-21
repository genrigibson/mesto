import Popup  from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, imageText, popupImage) {
    super(popupSelector);
    this._popupText = document.querySelector(imageText);
    this._popupImage = document.querySelector(popupImage);
  }

  open(name, link) {
    super.open();
    this._popupText.textContent = name;
    this._popupImage.src = link;
    this._popupImage.alt = name;
  };
}
