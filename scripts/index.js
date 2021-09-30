// объявление переменных popup
const popupProfile = document.querySelector(".popup_type_profile");
const popupCard = document.querySelector(".popup_type_card");
const popupImage = document.querySelector(".popup_type_fullscreen");
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
  return(newCard);
}

// функция добавления карточки
function renderCard(item) {
  const card = createCard(item);
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

//функция открытия fullscreen фотографии
function openPopupFullscreen(evt) {
  popupImage.classList.add("popup_opened");

  popupImage.querySelector(".popup__image").src = evt.currentTarget.src;
  popupImage.querySelector(".popup__image").alt = evt.currentTarget.alt;
  popupImage.querySelector(".popup__caption").textContent = evt.currentTarget.parentElement.querySelector(".card__header").textContent;
}

//функция закрытия фотографии
function closeImage() {
  popupImage.classList.remove("popup_opened");
}

// --- закрытие popup вне формы
function clickOverlay(event) {
  if (event.target === event.currentTarget) {
    popupToggleProfle();
  }
}
//

//Событие отправки формы добавления карточки
function submitFormCard(evt) {
  evt.preventDefault();

  const addCard = {};
  addCard.name = evt.currentTarget.querySelector(".popup__text_type_title").value;
  addCard.link = evt.currentTarget.querySelector(".popup__text_type_url").value;

  renderCard(addCard);
  evt.currentTarget.reset();
  popupToggleCard();
}


//Событие отправки формы редактрования профиля
function submitFormProfile(evt) {
  evt.preventDefault();

  profName.textContent = nameInput.value;
  profJob.textContent = jobInput.value;
  popupToggleProfle();
}

cardFormItem.addEventListener("submit", submitFormCard);
formProfile.addEventListener("submit", submitFormProfile);

popupProfile.addEventListener("click", clickOverlay);
popupOpenProfile.addEventListener("click", popupToggleProfle);
popupOpenCard.addEventListener("click", popupToggleCard);
popupCloseProfile.addEventListener("click", popupToggleProfle);
popupCloseCard.addEventListener("click", popupToggleCard);
popupCloseImage.addEventListener("click", closeImage);


