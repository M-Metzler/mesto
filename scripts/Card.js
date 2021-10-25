class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
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
    // Добавим данные
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__header').textContent = this._name;
    this._element.querySelector('.card__header').alt = this._name;
    // Вернём элемент наружу
    return this._element;
  }
}

initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, '.card-template');
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  document.querySelector('.cards__items').append(cardElement);
});
