export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`)
            .then((res) => { res.json()})
            .then((data) => {
                console.log(data);
            })
            .catch(() => {
                console.log('Не удалось загрузить карточки');
            })
    }
}