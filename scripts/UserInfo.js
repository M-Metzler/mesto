export default class UserInfo {
  constructor({ name, job }) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
  }
  getUserInfo() {
    this._userInfo = {
      nameInfo: this._name.textContent,
      jobInfo: this._job.textContent
    }
    return this._userInfo;
  }
  setUserInfo(nameInput, jobInput) {
    this._name.textContent = nameInput.value;
    this.job.textContent = jobInput.value;
  }
}
