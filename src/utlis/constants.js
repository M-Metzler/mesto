
export {
  userId,
  buttonPopupOpenProfile,
  buttonPopupOpenCard,
  buttonPopupOpenAvatar,
  formProfile,
  formAvatar,
  formCard,
  nameInput,
  jobInput,
  enableValidationSettings
};

const userId = '160c074f79acea8bc3450574'; //мой id

// объявление переменных кнопок открытия/закрытия попапов
const buttonPopupOpenProfile = document.querySelector(".profile__button-edit");
const buttonPopupOpenCard = document.querySelector(".profile__button-add");
const buttonPopupOpenAvatar = document.querySelector(".profile__avatar-edit");
// объявление переменных формы профиля
const formProfile = document.querySelector(".popup__container_type_profile-form");
const nameInput = formProfile.querySelector(".popup__text_type_name");
const jobInput = formProfile.querySelector(".popup__text_type_about-self");
// объявление переменных карточки
const formCard = document.querySelector(".popup__container_type_card-form");
//объявление переменных аватара
const formAvatar = document.querySelector(".popup__container_type_avatar-form");

//объект настроек с селекторами и классами формы
const enableValidationSettings = {
  formSelector: '.popup__container',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_visible'
};

