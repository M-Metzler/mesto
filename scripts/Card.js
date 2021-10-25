import { openPopup } from './index.js';
import { initialCards } from './cards.js';

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
    this._setEventListeners();
    // Добавим данные
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__header').textContent = this._name;
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
    openPopup(popupImage);
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

export { Card };
