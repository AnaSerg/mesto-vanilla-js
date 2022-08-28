export class Api {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
                headers: {
                    authorization: '2cee6aa2-b4a3-48c5-9c04-a35e285f1434',
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => { res.json()})
            .then((data) => {
                console.log(data);
            })
            .catch(() => {
                console.log('Не удалось загрузить карточки');
            })
    }
}