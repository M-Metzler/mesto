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
}

// функция удаления у попапов класса popup_opened
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//Функция удаления карточки
function deleteCard(evt) {
  const cardDel = evt.currentTarget.closest(".card");
  cardDel.remove();
}

//функция открытия fullscreen фотографии
function openPopupFullscreen(evt) {
  openPopup(popupImage);

  popupImageFullscreen.src = evt.currentTarget.src;
  popupImageFullscreen.alt = evt.currentTarget.alt;
  popupImageCaption.textContent = evt.currentTarget.alt;
  document.addEventListener('keydown', closeImageEsc);
}

//--------Функции закрытия попапов кликов на оверлей-------
// --- закрытие popup Профиля вне формы
function clickOverlayProfile(event) {
  if (event.target === event.currentTarget) {
    closePopup(popupProfile);
    document.removeEventListener('keydown', closeProfileEsc);
  }
}

// --- закрытие popup Карточки вне формы
function clickOverlayCard(event) {
  if (event.target === event.currentTarget) {
    closePopup(popupCard);
    document.removeEventListener('keydown', closeCardEsc);
  }
}

// --- закрытие popup Фотографии вне формы
function clickOverlayImage(event) {
  if (event.target === event.currentTarget) {
    closePopup(popupImage);
    document.removeEventListener('keydown', closeImageEsc);
  }
}

// -------Функции закрытия по Escape----------
//--- Функция закрытия попапа Профиля по Esc
function closeProfileEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(popupProfile);
    document.removeEventListener('keydown', closeProfileEsc);
  }
}

//--- Функция закрытия попапа Карточки по Esc
function closeCardEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(popupCard);
    document.removeEventListener('keydown', closeCardEsc);
  }
}

//--- Функция закрытия попапа Фотографии по Esc
function closeImageEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(popupImage);
    document.removeEventListener('keydown', closeImageEsc);
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
popupProfile.addEventListener("click", clickOverlayProfile);
popupCard.addEventListener("click", clickOverlayCard);
popupImage.addEventListener("click", clickOverlayImage);

//Слушатели Профиля
popupOpenProfile.addEventListener("click", () => {
  nameInput.value = profName.textContent;
  jobInput.value = profJob.textContent;
  openPopup(popupProfile)
  document.addEventListener('keydown', closeProfileEsc);
});
popupCloseProfile.addEventListener("click", () => {
  closePopup(popupProfile);
  document.removeEventListener('keydown', closeProfileEsc);
});

//Слушатели Карточки
popupOpenCard.addEventListener("click", () => {
  openPopup(popupCard);
  document.addEventListener('keydown', closeCardEsc);
});
popupCloseCard.addEventListener("click", () => {
  closePopup(popupCard);
  document.removeEventListener('keydown', closeCardEsc);
});

//Слушатель Фотографии
popupCloseImage.addEventListener("click", () => {
  closePopup(popupImage);
  document.removeEventListener('keydown', closeImageEsc);
});

