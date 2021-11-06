import Card from './Card.js';
import { initialCards } from './cards.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

// объявление переменных popup
const popupProfile = document.querySelector(".popup_type_profile");
const popupCard = document.querySelector(".popup_type_card");
// переменные popup фотографии fullscreen
const popupImage = document.querySelector(".popup_type_fullscreen");
const popupImageCaption = popupImage.querySelector(".popup__caption");
// объявление переменных кнопок открытия/закрытия попапов
const buttonPopupOpenProfile = document.querySelector(".profile__button-edit");
const buttonPopupOpenCard = document.querySelector(".profile__button-add");
const buttonPopupCloseProfile = popupProfile.querySelector(".popup__btn-close");
const buttonPopupCloseCard = popupCard.querySelector(".popup__btn-close");
const buttonPopupCloseImage = popupImage.querySelector(".popup__btn-close");
// объявление переменных формы профиля
const formProfile = document.querySelector(".popup__container_type_profile-form");
const nameInput = formProfile.querySelector(".popup__text_type_name");
const jobInput = formProfile.querySelector(".popup__text_type_about-self");
// объявление переменных профиля
const profileJob = document.querySelector(".profile__about-self");
const profileName = document.querySelector(".profile__name");
// объявление переменных карточки
const cardListItem = document.querySelector(".cards__items");
const cardFormItem = document.querySelector(".popup__container_type_card-form");
const cardTemplateItem = document.querySelector(".card-template");

//создание  карточки
const createCard = (item) => {
  const card = new Card({
    data: item, handleCardClick: (name, link) => {
      popupImageFullscreen.open(name, link);
    }
  }, '.card-template');
  const cardElement = card.generateCard();
  return cardElement;
};

//отрисовка массива карточек
const addInitialCards = new Section({
  items: initialCards, renderer: (item) => {
    addInitialCards.addItem(createCard(item));
  }
}, '.cards__items');

addInitialCards.renderItems();

//Открытие popup с фото
const popupImageFullscreen = new PopupWithImage('.popup_type_fullscreen');

// функция добавления попапам класса popup_opened
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", closePopupEsc);
}

// функция удаления у попапов класса popup_opened
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closePopupEsc);
}

//--------Функции закрытия попапов кликом на оверлей-------
function closePopupClickOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}

// -------Функции закрытия по Escape----------
function closePopupEsc(evt) {
  const popupVisible = document.querySelector(".popup_opened");
  if (evt.key === 'Escape') {
    closePopup(popupVisible);
  }
}

// -------События ----
//Событие отправки формы добавления карточки
function submitFormCard(evt) {
  evt.preventDefault();

  const addCard = {};
  addCard.name = evt.currentTarget.querySelector(".popup__text_type_title").value;
  addCard.link = evt.currentTarget.querySelector(".popup__text_type_url").value;

  cardListItem.prepend(createCard(addCard));
  closePopup(popupCard);
  evt.currentTarget.reset();
}

//Событие отправки формы редактрования профиля
function submitFormProfile(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

cardFormItem.addEventListener("submit", submitFormCard);
formProfile.addEventListener("submit", submitFormProfile);

//объект настроек с селекторами и классами формы
const enableValidationSettings = {
  formSelector: '.popup__container',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_visible'
};

//Экземпляры класса для каждой формы
const profileFormValidator = new FormValidator(enableValidationSettings, formProfile);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(enableValidationSettings, cardFormItem);
cardFormValidator.enableValidation();

//Слушатели оверлей
popupProfile.addEventListener("mousedown", closePopupClickOverlay);
popupCard.addEventListener("mousedown", closePopupClickOverlay);
popupImage.addEventListener("mousedown", closePopupClickOverlay);

//Слушатели Профиля
buttonPopupOpenProfile.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  profileFormValidator.resetValidation();
  openPopup(popupProfile);
});

buttonPopupCloseProfile.addEventListener("click", () => closePopup(popupProfile));

//Слушатели Карточки
buttonPopupOpenCard.addEventListener("click", () => {
  cardFormValidator.resetValidation();
  openPopup(popupCard);
});

buttonPopupCloseCard.addEventListener("click", () => closePopup(popupCard));

//Слушатель Фотографии
buttonPopupCloseImage.addEventListener("click", () => closePopup(popupImage));

