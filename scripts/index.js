const popupProfile = document.querySelector(".popup_type_profile");
const popupCard = document.querySelector(".popup_type_card");
// объявление переменных кнопок открытия/закрытия попапов
const popupOpenProfile = document.querySelector(".profile__button-edit");
const popupOpenCard = document.querySelector(".profile__button-add");
const popupCloseProfile = popupProfile.querySelector(".popup__btn-close");
const popupCloseCard = popupCard.querySelector(".popup__btn-close");
// объявление переменных формы профиля
const formProfile = document.querySelector(
  ".popup__container_type_profile-form"
);
const nameInput = formProfile.querySelector(".popup__text_type_name");
const jobInput = formProfile.querySelector(".popup__text_type_about-self");
// объявление переменных профиля
const profJob = document.querySelector(".profile__about-self");
const profName = document.querySelector(".profile__name");
// объявление переменных карточки
const cardListItem = document.querySelector(".cards__items");
const cardFormItem = document.querySelector(".popup__container_type_card-form");
const cardTemplateItem = document.querySelector(".card-template");

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

// функция добавления карточек
function renderCard(item) {
  const card = cardTemplateItem.content.cloneNode(true);

  card.querySelector(".card__image").src = item.link;
  card.querySelector(".card__header").textContent = item.name;
  card
    .querySelector(".card__btn-like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__btn-like_active");
    });

  card.querySelector(".card__btn-delete").addEventListener("click", deleteCard);

  cardListItem.prepend(card);
}

initialCards.map(renderCard);

//Открытие/закрытие формы редактирования профиля
function popupToggleProfle() {
  if (!popupProfile.classList.contains("popup_opened")) {
    nameInput.value = profName.textContent;
    jobInput.value = profJob.textContent;
    popupProfile.classList.add("popup_opened");
  } else {
    popupProfile.classList.remove("popup_opened");
  }
}

//Открытие/закрытие формы добавления карточки
function popupToggleCard() {
  if (!popupCard.classList.contains("popup_opened")) {
    popupCard.classList.add("popup_opened");
  } else {
    popupCard.classList.remove("popup_opened");
  }
}

//Функция удаления карточки
function deleteCard(evt) {
  const cardDel = evt.currentTarget.closest(".card");
  cardDel.remove();
}

// --- закрытие popup вне формы
function clickOverlay(event) {
  if (event.target === event.currentTarget) {
    popupToggleProfle();
  }
}
//

//Событие отправки формы добавления карточки
function addCard(evt) {
  evt.preventDefault();

  let createCard = {};
  createCard.name = evt.currentTarget.querySelector(
    ".popup__text_type_title"
  ).value;
  createCard.link = evt.currentTarget.querySelector(
    ".popup__text_type_url"
  ).value;

  renderCard(createCard);
  evt.currentTarget.reset();
  popupToggleCard();
}

cardFormItem.addEventListener("submit", addCard);

//Событие отправки формы редактрования профиля
function formSubmitHandler(evt) {
  evt.preventDefault();

  profName.textContent = nameInput.value;
  profJob.textContent = jobInput.value;
  popupToggleProfle();
}

formProfile.addEventListener("submit", formSubmitHandler);

popupProfile.addEventListener("click", clickOverlay);
popupOpenProfile.addEventListener("click", popupToggleProfle);
popupOpenCard.addEventListener("click", popupToggleCard);
popupCloseProfile.addEventListener("click", popupToggleProfle);
popupCloseCard.addEventListener("click", popupToggleCard);
