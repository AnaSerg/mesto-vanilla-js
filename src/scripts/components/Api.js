export class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        console.log("Ура!");
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    
    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
          method: 'GET',
          headers: this._headers,
        })
        .then(this._handleResponse);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
          //method: 'GET',
          headers: this._headers,
        })
        .then(this._handleResponse);
    }
}