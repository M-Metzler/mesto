import { Card } from './Card.js';

// объявление переменных popup
const popupProfile = document.querySelector(".popup_type_profile");
const popupCard = document.querySelector(".popup_type_card");
// переменные popup фотографии fullscreen
const popupImage = document.querySelector(".popup_type_fullscreen");
const popupImageFullscreen = popupImage.querySelector(".popup__image");
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

const buttonSubmitCardForm = cardFormItem.querySelector('.popup__btn-save');

function addNewCard(item) {
  const card = new Card(item, '.card-template');
  const cardElement = card.generateCard();
  document.querySelector('.cards__items').prepend(cardElement);
};

//-----Функции Карточек--------
// функция создания карточки
// function createCard(item) {
//   const newCard = cardTemplateItem.content.cloneNode(true);
//   const cardImage = newCard.querySelector(".card__image");
//   cardImage.src = item.link;
//   cardImage.alt = item.name;
//   newCard.querySelector(".card__header").textContent = item.name;
//   newCard
//     .querySelector(".card__btn-like")
//     .addEventListener("click", function (evt) {
//       evt.target.classList.toggle("card__btn-like_active");
//     });
//   newCard.querySelector(".card__btn-delete").addEventListener("click", deleteCard);
//   cardImage.addEventListener("click", openPopupFullscreen);
//   return newCard;
// }

// функция добавления карточки
// function renderCard(item) {
//   const card = createCard(item);
//   cardListItem.prepend(card);
// }

//функция отрисовки массива карточек
// function addInitialCards(item) {
//   const arrayCards = item.map(createCard);
//   cardListItem.append(...arrayCards);
// }

// addInitialCards(initialCards);

//Функция удаления карточки
// function deleteCard(evt) {
//   const selectedCard = evt.currentTarget.closest(".card");
//   selectedCard.remove();
// }

//-------------

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

//функция открытия fullscreen фотографии
// function openPopupFullscreen(evt) {
//   openPopup(popupImage);

//   popupImageFullscreen.src = evt.currentTarget.src;
//   popupImageFullscreen.alt = evt.currentTarget.alt;
//   popupImageCaption.textContent = evt.currentTarget.parentElement.querySelector(".card__header").textContent;
// }

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

  addNewCard(addCard);
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


//Слушатели оверлей
popupProfile.addEventListener("mousedown", closePopupClickOverlay);
popupCard.addEventListener("mousedown", closePopupClickOverlay);
popupImage.addEventListener("mousedown", closePopupClickOverlay);

//Слушатели Профиля
buttonPopupOpenProfile.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
});

buttonPopupCloseProfile.addEventListener("click", () => closePopup(popupProfile));

//Слушатели Карточки
buttonPopupOpenCard.addEventListener("click", () => {
  const inputList = Array.from(popupCard.querySelectorAll(enableValidation.inputSelector));
  toggleButtonState(inputList, buttonSubmitCardForm, enableValidation);
  openPopup(popupCard);
});

buttonPopupCloseCard.addEventListener("click", () => closePopup(popupCard));

//Слушатель Фотографии
buttonPopupCloseImage.addEventListener("click", () => closePopup(popupImage));

export {openPopup};
