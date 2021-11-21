export default class Card {
  constructor({ data, userId, handleCardClick, handleCardDelete }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._userId = userId;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;

  }
  // получaем готовую разметку карточки
  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardTemplate;
  }
  // подготовка карточки к публикации
  generateCard() {
    this._element = this._getTemplate();
    this._cardImageElement = this._element.querySelector('.card__image');
    this._cardNameElement = this._element.querySelector('.card__header');
    this._deleteIcon = this._element.querySelector('.card__btn-delete');

    this._setEventListeners();
    // Добавим данные
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardNameElement.textContent = this._name;
    this._removeDeleteIcon();
    // Вернём элемент наружу
    return this._element;
  }
  //слушатели событий на карточку
  _setEventListeners() {
    this._element.querySelector('.card__btn-like').addEventListener('click', () => {
      this._toggleButtonLike();
    });
    this._element.querySelector('.card__btn-delete').addEventListener('click', () => {
      this._handleCardDelete(this._cardId, this);
    });
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

  }
  //лайк карточки
  _toggleButtonLike() {
    this._element.querySelector('.card__btn-like').classList.toggle('card__btn-like_active');
  }
  //удаление карточки
  deleteElement() {
    this._element.remove();
    this._element = null;
  }

  _removeDeleteIcon() {
    if (this._ownerId !== this._userId) {
      this._deleteIcon.classList.add('card__btn-delete_hidden')
    }
    else {
      this._deleteIcon.classList.remove('card__btn-delete_hidden')
    }
  }
}

