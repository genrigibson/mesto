export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close');
    // this._closeButton = this._closeButton.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    console.log(this._closeButton);
    console.log(typeof this._closeButton);
    this._closeButton.addEventListener("click", this.close.bind(this));
    this._popup.addEventListener("click", this._handleOverlayClose.bind(this));
  }

  open() {
    this._popup.classList.add("popup_opened");
    this.setEventListeners();
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
}
