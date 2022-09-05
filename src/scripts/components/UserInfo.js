export class UserInfo {
    constructor( {profileNameSelector, profileJobSelector, profileAvatarSelector}) {
        this._profileName = document.querySelector(profileNameSelector);
        this._profileJob = document.querySelector(profileJobSelector);
        this._profileAvatar = document.querySelector(profileAvatarSelector)
    }

    getUserInfo () {
        const userInfo = {};
        userInfo.name = this._profileName.innerText;
        userInfo.about = this._profileJob.innerText;
        return userInfo;
    }

    setUserInfo (data) {
        this._profileName.textContent = data.name;
        this._profileJob.textContent = data.about;
    }

    setAvatarInfo (data) {
        this._profileAvatar.src = data.avatar;
    }
}