export default class UserInfo {
  constructor({ name, job }) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
  }

  getUserInfo() {
    const userInfo = {
      nameInfo: this._name.textContent,
      jobInfo: this._job.textContent
    }
    return userInfo;
  }

  setUserInfo(name, job) {
    this._name.textContent = name.value;
    this._job.textContent = job.value;
  }
}
