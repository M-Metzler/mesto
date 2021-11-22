export default class Card {
  constructor({ data, userId, handleCardClick, handleCardDelete, handleLikeClick }, cardSelector, api) {
    this._name = data.name;
    this._link = data.link;
    this._api = api;
    this._userId = userId;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClick = handleLikeClick;


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
    this._buttonLike = this._element.querySelector('.card__btn-like');
    this._likesCounter = this._element.querySelector('.card__counter-like');

    this._setEventListeners();
    // Добавим данные
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardNameElement.textContent = this._name;
    this._likesCounter.textContent = this._likes.length;
    this._toggleDeleteIcon();
    this._checkUserLike();

    // Вернём элемент наружу
    return this._element;
  }
  //слушатели событий на карточку
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this.handleLikeClick(this);
    });
    this._deleteIcon.addEventListener('click', () => {
      this._handleCardDelete(this._cardId, this);
    });
    this._cardImageElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

  }
  //лайк карточки
  handleLikeClick() {
    if (this._buttonLike.classList.contains('card__btn-like_active')) {
      this._api.removeLike(this._cardId)
        .then((data) => {
          this._buttonLike.classList.remove('card__btn-like_active');
          this._likesCounter.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
    } else {
      this._api.addLike(this._cardId)
        .then((data) => {
          this._buttonLike.classList.add('card__btn-like_active');
          this._likesCounter.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
    }
  }
  //удаление карточки
  deleteElement() {
    this._element.remove();
    this._element = null;
  }

  _toggleDeleteIcon() {
    if (this._ownerId !== this._userId) {
      this._deleteIcon.classList.add('card__btn-delete_hidden')
    }
    else {
      this._deleteIcon.classList.remove('card__btn-delete_hidden')
    }
  }

  _checkUserLike() {
    if (this._likes.find((item) => this._userId === item._id)) {
      this._buttonLike.classList.add('card__btn-like_active')
    }
  }
}

