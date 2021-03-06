import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  buttonPopupOpenProfile,
  buttonPopupOpenCard,
  buttonPopupOpenAvatar,
  formProfile,
  formAvatar,
  formCard,
  nameInput,
  jobInput,
  enableValidationSettings
} from '../utlis/constants.js';

let userId;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-30',
  headers: {
    authorization: '7932a217-dd69-48a4-a32e-c1b357e558ff',
    'Content-Type': 'application/json'
  }
});


//Получение данных профиля и карточек
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })

//Открытие popup с фото
const popupImageFullscreen = new PopupWithImage('.popup_type_fullscreen');
popupImageFullscreen.setEventListeners();

//Информация о пользователе
const userInfo = new UserInfo({ name: '.profile__name', job: '.profile__about-self', avatar: '.profile__avatar' });

//Генерация карточке
const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, '.cards__items');

//создание  карточки
const createCard = (data) => {
  const card = new Card({
    data: data,
    userId: userId,
    handleCardClick: (name, link) => {
      popupImageFullscreen.open(name, link);
    },
    handleCardDelete: (cardId, card) => {
      popupConfirmDelete.open(cardId, card);
    },
  }, '.card-template', api);
  const cardElement = card.generateCard();
  return cardElement;
};


//Подтверждение удаления карточки
const popupConfirmDelete = new PopupWithConfirmation('.popup_type_delete-card', {
  confirmDelete: (cardId, card) => {
    api.deleteCard(cardId)
      .then((res) => {
        card.deleteElement();
        popupConfirmDelete.close();
      })
      .catch((err) =>
        console.log(`Ошибка: ${err}`))
  }
})
popupConfirmDelete.setEventListeners();

//Редактирование профиля пользователя
const popupEditProfile = new PopupWithForm('.popup_type_profile', {
  submitFormHandler: (data) => {
    popupEditProfile.showLoading(true);
    api.editUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupEditProfile.showLoading(false);
      })
  }
});
popupEditProfile.setEventListeners();


//Добавление карточки
const popupAddCard = new PopupWithForm('.popup_type_card', {
  submitFormHandler: (data) => {
    popupAddCard.showLoading(true);
    api.addNewCard(data)
      .then((data) => {
        cardList.addItem(createCard(data));
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupAddCard.showLoading(false);
      })
  }
});
popupAddCard.setEventListeners();

//Редактирование аватара
const popupEditAvatar = new PopupWithForm('.popup_type_avatar', {
  submitFormHandler: (data) => {
    popupEditAvatar.showLoading(true);
    api.editUserAvatar(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupEditAvatar.showLoading(false);
      })
  }
})
popupEditAvatar.setEventListeners();


//Экземпляры класса для каждой формы
const profileFormValidator = new FormValidator(enableValidationSettings, formProfile);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(enableValidationSettings, formCard);
cardFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(enableValidationSettings, formAvatar);
avatarFormValidator.enableValidation();


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

//Открытие окна с редактирование аватара
buttonPopupOpenAvatar.addEventListener("click", () => {
  popupEditAvatar.open();
  avatarFormValidator.resetValidation();
})

