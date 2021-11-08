export {
  buttonPopupOpenProfile,
  buttonPopupOpenCard,
  formProfile,
  nameInput,
  jobInput,
  cardListItem,
  cardFormItem,
  cardName,
  cardLink,
  enableValidationSettings,
  initialCards
};

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

//объект настроек с селекторами и классами формы
const enableValidationSettings = {
  formSelector: '.popup__container',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_visible'
};

const initialCards = [
  {
    name: "Волгоград",
    link: "./images/volgograd.png",
  },
  {
    name: "Краснодар",
    link: "./images/krasnodar.png",
  },
  {
    name: "Тюмень",
    link: "./images/tumeni.png",
  },
  {
    name: "Хабаровск",
    link: "./images/habarovsk.png",
  },
  {
    name: "Пермь",
    link: "./images/permi.png",
  },
  {
    name: "Санкт-Петербург",
    link: "./images/piter.png",
  },
];

