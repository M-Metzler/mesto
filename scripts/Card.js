export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
      this._handleCardClick(this._name, this._link);
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
}

