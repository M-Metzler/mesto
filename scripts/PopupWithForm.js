import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitFormHandler }) {
    super(popupSelector);
    this._submitFormHandler = submitFormHandler;
    this._form = this._popup.querySelector('.popup__container');
    this._inputList = this._popup.querySelectorAll('.popup__text');
    this._buttonSubmit = this._popup.querySelector('.popup__btn-save');
  }
  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
      }

setEventListeners() {
  super.setEventListeners();
  this._form.addEventListener('submit', (evt) => {
     evt.preventDefault();
     this._submitFormHandler(this._getInputValues());
  })
}
close() {
  super.close();
  this._form.reset();
}
}
