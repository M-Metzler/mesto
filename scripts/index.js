import Card from './Card.js';
import { initialCards } from './cards.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';


// объявление переменных кнопок открытия/закрытия попапов
const buttonPopupOpenProfile = document.querySelector(".profile__button-edit");
const buttonPopupOpenCard = document.querySelector(".profile__button-add");
// объявление переменных формы профиля
const formProfile = document.querySelector(".popup__container_type_profile-form");
const nameInput = formProfile.querySelector(".popup__text_type_name");
const jobInput = formProfile.querySelector(".popup__text_type_about-self");
// объявление переменных карточки
const cardListItem = document.querySelector(".cards__items");
const cardFormItem = document.querySelector(".popup__container_type_card-form");
//inputs карточки
const cardName = document.querySelector(".popup__text_type_title");
const cardLink = document.querySelector(".popup__text_type_url");


//создание  карточки
const createCard = (item) => {
  const card = new Card({
    data: item, handleCardClick: (name, link) => {
      popupImageFullscreen.open(name, link);
      popupImageFullscreen.setEventListeners();
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

//Информация о пользователе
const userInfo = new UserInfo({ name: '.profile__name', job: '.profile__about-self' });

//Редактирование профиля пользователя
const popupEditProfile = new PopupWithForm('.popup_type_profile', {
  submitFormHandler: () => {
    userInfo.setUserInfo(nameInput, jobInput);
    popupEditProfile.close();
  }
}
);
popupEditProfile.setEventListeners();

//Добавление карточки
const popupAddCard = new PopupWithForm('.popup_type_card', {
  submitFormHandler: () => {
    const item = {
      name: cardName.value,
      link: cardLink.value
    }
    cardListItem.prepend(createCard(item));
    popupAddCard.close();
  }
}
)
popupAddCard.setEventListeners();

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


//открытие окна редактирования профиля
buttonPopupOpenProfile.addEventListener("click", () => {

  const data = userInfo.getUserInfo();
  nameInput.value = data.nameInfo;
  jobInput.value = data.jobInfo;

  profileFormValidator.resetValidation();
  popupEditProfile.open();
});


//Открытие окна добавления карточки
buttonPopupOpenCard.addEventListener("click", () => {
  cardFormValidator.resetValidation();
  popupAddCard.open();
});

