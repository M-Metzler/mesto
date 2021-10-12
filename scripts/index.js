// объявление переменных popup
const popupProfile = document.querySelector(".popup_type_profile");
const popupCard = document.querySelector(".popup_type_card");
// переменные popup фотографии fullscreen
const popupImage = document.querySelector(".popup_type_fullscreen");
const popupImageFullscreen = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");
// объявление переменных кнопок открытия/закрытия попапов
const popupOpenProfile = document.querySelector(".profile__button-edit");
const popupOpenCard = document.querySelector(".profile__button-add");
const popupCloseProfile = popupProfile.querySelector(".popup__btn-close");
const popupCloseCard = popupCard.querySelector(".popup__btn-close");
const popupCloseImage = popupImage.querySelector(".popup__btn-close");
// объявление переменных формы профиля
const formProfile = document.querySelector(".popup__container_type_profile-form");
const nameInput = formProfile.querySelector(".popup__text_type_name");
const jobInput = formProfile.querySelector(".popup__text_type_about-self");
// объявление переменных профиля
const profJob = document.querySelector(".profile__about-self");
const profName = document.querySelector(".profile__name");
// объявление переменных карточки
const cardListItem = document.querySelector(".cards__items");
const cardFormItem = document.querySelector(".popup__container_type_card-form");
const cardTemplateItem = document.querySelector(".card-template");

//кнопки "Сохранить" форм
const submitButtonCardForm = cardFormItem.querySelector('.popup__btn-save');
const submitButtonProfileForm = formProfile.querySelector('.popup__btn-save');
// переменные ошибок input
const errorName = formProfile.querySelector('#name-error');
const errorJob = formProfile.querySelector('#about-self-error');


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

initialCards.reverse();

// функция создания карточки
function createCard(item) {
  const newCard = cardTemplateItem.content.cloneNode(true);
  const cardImage = newCard.querySelector(".card__image");
  cardImage.src = item.link;
  cardImage.alt = item.name;
  newCard.querySelector(".card__header").textContent = item.name;
  newCard
    .querySelector(".card__btn-like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__btn-like_active");
    });
  newCard.querySelector(".card__btn-delete").addEventListener("click", deleteCard);
  cardImage.addEventListener("click", openPopupFullscreen);
  return (newCard);
}

// функция добавления карточки
function renderCard(item) {
  const card = createCard(item);
  cardListItem.prepend(card);
}

initialCards.map(renderCard);

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

//Функция удаления карточки
function deleteCard(evt) {
  const cardDel = evt.currentTarget.closest(".card");
  cardDel.remove();
}

//функция деактивации кнопки "сохранить" формы карточки
const disabledSubmitButton = () => {
  const submitButtonCardForm = cardFormItem.querySelector('.popup__btn-save');
  submitButtonCardForm.setAttribute('disabled', true);
  submitButtonCardForm.classList.add('popup__btn-save_disabled');
}

//функция проверки формы профиля на валидность
const checkFormProfileValidity = () => {
  if(formProfile.checkValidity()) {
    submitButtonProfileForm.removeAttribute('disabled');
    submitButtonProfileForm.classList.remove('popup__btn-save_disabled');
    errorName.textContent = '';
    errorJob.textContent = '';
    nameInput.classList.remove('popup__text_type_error');
    jobInput.classList.remove('popup__text_type_error');
  }
}

//функция открытия fullscreen фотографии
function openPopupFullscreen(evt) {
  openPopup(popupImage);

  popupImageFullscreen.src = evt.currentTarget.src;
  popupImageFullscreen.alt = evt.currentTarget.alt;
  popupImageCaption.textContent = evt.currentTarget.alt;
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

// -------
//Событие отправки формы добавления карточки
function submitFormCard(evt) {
  evt.preventDefault();

  const addCard = {};
  addCard.name = evt.currentTarget.querySelector(".popup__text_type_title").value;
  addCard.link = evt.currentTarget.querySelector(".popup__text_type_url").value;

  renderCard(addCard);
  evt.currentTarget.reset();
  closePopup(popupCard);
}

//Событие отправки формы редактрования профиля
function submitFormProfile(evt) {
  evt.preventDefault();

  profName.textContent = nameInput.value;
  profJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

cardFormItem.addEventListener("submit", submitFormCard);
formProfile.addEventListener("submit", submitFormProfile);


//Слушатели оверлей
popupProfile.addEventListener("click", closePopupClickOverlay);
popupCard.addEventListener("click", closePopupClickOverlay);
popupImage.addEventListener("click", closePopupClickOverlay);

//Слушатели Профиля
popupOpenProfile.addEventListener("click", () => {
  nameInput.value = profName.textContent;
  jobInput.value = profJob.textContent;
  openPopup(popupProfile);
  checkFormProfileValidity();
});
popupCloseProfile.addEventListener("click", () => closePopup(popupProfile));

//Слушатели Карточки
popupOpenCard.addEventListener("click", () => {
  openPopup(popupCard);
  disabledSubmitButton();
});
popupCloseCard.addEventListener("click", () => closePopup(popupCard));

//Слушатель Фотографии
popupCloseImage.addEventListener("click", () => closePopup(popupImage));

