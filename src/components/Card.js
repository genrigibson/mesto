class Card {
  constructor(data, selector, handleCardClick, handleDeleteClick, handlePutLike, handleDeleteLike, userId) {
    this._name = data.name;
    this._link = data.link;
    this._likeId = data.likes;
    this._likesCount = data.likes.length;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._cardId = data._id;
    this._selector = selector;
    this._template = document.querySelector(this._selector).content;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handlePutLike = handlePutLike;
    this._handleDeleteLike = handleDeleteLike;
  }

  _cloneCard() {
    const cardElement = this._template.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListener(cardElement) {
    this._buttonLike = cardElement.querySelector(".element__like");
    this._buttonLike.addEventListener("click", () => {
      if (this._buttonLike.classList.contains('element__like_active')) {
        this._likeDelete();
        this._handleDeleteLike(this._cardId, this._element);
      } else {
        this._likeActivation();
        this._handlePutLike(this._cardId, this._element);
      }
    });

    this._buttonDelete = cardElement.querySelector(".element__delete");
    this._checkIdOwner(this._buttonDelete);
    this._buttonDelete.addEventListener("click", () => this._handleDeleteClick(this._cardId));

    this._image = cardElement.querySelector(".element__image");
    this._image.addEventListener("click", () => this._handleCardClick());

    return cardElement;
  }

  _likeActivation() {
    this._buttonLike.classList.add("element__like_active");
  }

  _likeDelete() {
    this._buttonLike.classList.remove("element__like_active");
  }

  deleteCard() {
    this._element.remove();
  }

  _getCard() {
    return this._setEventListener(this._cloneCard());
  }

  _checkIdOwner(buttonDelete) {
    if (this._userId !==  this._ownerId) {
      buttonDelete.remove();
    }
  }

  _checkMyLike(like) {
    if (like) {
      this._likeActivation();
    }
  }

  _checkLikeOwner() {
    return Boolean(this._likeId.find((obj => obj._id == this._userId)));
  }

  _findImage(element) {
    return element.querySelector('.element__image')
  }

  generateCard() {
    this._element = this._getCard();
    this._checkMyLike(this._checkLikeOwner());
    this._element.querySelector('.element__title').textContent = this._name;
    this._findImage(this._element).src = this._link;
    this._findImage(this._element).alt = this._name;
    this._element.querySelector('.element__likes-count').textContent = this._likesCount;
    return this._element;
  }
}

export {Card};
