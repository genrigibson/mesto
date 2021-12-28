export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getCards() {
     return fetch(`${this._url}/cards`, {
        method: 'GET',
        headers: this._headers,
      })
      .then(this._getResponse);
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: this._headers,
      })
      .then(this._getResponse);
  }

  patchUserData(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._getResponse)
  }

  postCard(data) {
    return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.place,
          link: data.image
        })
      })
      .then(this._getResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._getResponse);
  }

  putLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(this._getResponse);
  }

  deleteLike(cardID) {
    return fetch(`${this._url}/cards/likes/${cardID}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._getResponse);
  }

  patchUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.image
        })
      })
      .then(this._getResponse);
  }
}

