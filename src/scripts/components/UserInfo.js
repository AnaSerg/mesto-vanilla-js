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

    setUserInfo ({ name, about, avatar, _id }) {
        this._profileName.textContent = name;
        this._profileJob.textContent = about;
        this._profileAvatar.src = avatar;
    }

    setAvatarInfo (data) {
        this._profileAvatar.src = data.avatar;
    }
}