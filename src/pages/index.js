// import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
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
} from '../utlis/constants.js';

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

