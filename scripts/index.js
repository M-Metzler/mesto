const popupProfile = document.querySelector(".popup_type_profile");
const popupCard = document.querySelector(".popup_type_card");
// объявление переменных кнопок открытия/закрытия попапов
const popupOpenProfile = document.querySelector(".profile__button-edit");
const popupOpenCard = document.querySelector(".profile__button-add");
const popupCloseProfile = popupProfile.querySelector(".popup__btn-close");
const popupCloseCard = popupCard.querySelector(".popup__btn-close");
// объявление переменных формы профиля
const formProfile = document.querySelector(".popup__container_type_profile-form");
const nameInput = formProfile.querySelector(".popup__text_type_name");
const jobInput = formProfile.querySelector(".popup__text_type_about-self");
// объявление переменных профиля
const profJob = document.querySelector(".profile__about-self");
const profName = document.querySelector(".profile__name");

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

// --- закрытие popup вне формы
function clickOverlay(event) {
  if (event.target === event.currentTarget) {
    popupToggleProfle();
  }
}
//

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
