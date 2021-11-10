import volgograd from '../images/volgograd.png';
import krasnodar from '../images/krasnodar.png';
import tumeni from '../images/tumeni.png';
import habarovsk from '../images/habarovsk.png';
import permi from '../images/permi.png';
import piter from '../images/piter.png';

export {
  buttonPopupOpenProfile,
  buttonPopupOpenCard,
  formProfile,
  nameInput,
  jobInput,
  cardFormItem,
  cardName,
  cardLink,
  enableValidationSettings,
  initialCards
};

const initialCards = [
  {
    name: "Волгоград",
    link: volgograd,
  },
  {
    name: "Краснодар",
    link: krasnodar,
  },
  {
    name: "Тюмень",
    link: tumeni,
  },
  {
    name: "Хабаровск",
    link: habarovsk,
  },
  {
    name: "Пермь",
    link: permi,
  },
  {
    name: "Санкт-Петербург",
    link: piter,
  },
];

// объявление переменных кнопок открытия/закрытия попапов
const buttonPopupOpenProfile = document.querySelector(".profile__button-edit");
const buttonPopupOpenCard = document.querySelector(".profile__button-add");
// объявление переменных формы профиля
const formProfile = document.querySelector(".popup__container_type_profile-form");
const nameInput = formProfile.querySelector(".popup__text_type_name");
const jobInput = formProfile.querySelector(".popup__text_type_about-self");
// объявление переменных карточки
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


