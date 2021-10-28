class Card {
  constructor(data, cardSelector, openPopup) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._openPopup = openPopup;
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
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._cardImageElement = this._element.querySelector('.card__image');
    this._cardNameElement = this._element.querySelector('.card__header');
    this._setEventListeners();
    // Добавим данные
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardNameElement.textContent = this._name;
    // Вернём элемент наружу
    return this._element;
  }
  //слушатели событий на карточку
  _setEventListeners() {
    this._element.querySelector('.card__btn-like').addEventListener('click', () => {
      this._toggleButtonLike();
    });
    this._element.querySelector('.card__btn-delete').addEventListener('click', () => {
      this._deleteCard();
    });
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._openImgFullscreen();
    });
  }
  //лайк карточки
  _toggleButtonLike() {
    this._element.querySelector('.card__btn-like').classList.toggle('card__btn-like_active');
  }
  //удаление карточки
  _deleteCard() {
    this._element.remove();
  }
  //открытие фото fullscreen
  _openImgFullscreen() {
    const popupImage = document.querySelector(".popup_type_fullscreen");
    const popupImageFullscreen = popupImage.querySelector(".popup__image");

    popupImageFullscreen.src = this._link;
    popupImageFullscreen.alt = this._name;
    popupImage.querySelector(".popup__caption").textContent = this._name;
    this._openPopup(popupImage);
  }
}

export { Card };
