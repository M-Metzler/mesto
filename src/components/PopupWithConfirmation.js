import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { confirmDelete }) {
    super(popupSelector);
    this._confirmDelete = confirmDelete;
    this._form = this._popup.querySelector('.popup__container');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._confirmDelete(this._cardId, this._card);
    })
  }

  open(cardId, card) {
    super.open();
    this._cardId = cardId;
    this._card = card;
  }
}
