let popup = document.querySelector(".popup");
let popupOpen = document.querySelector(".profile__button-edit");
let popupClose = popup.querySelector(".popup__btn-close");
//объявление переменных popup
let formElement = document.querySelector(".popup__container");
let nameInput = formElement.querySelector(".popup__text_type_name");
let jobInput = formElement.querySelector(".popup__text_type_about-self");
// объявление переменных профиля
let profJob = document.querySelector(".profile__about-self");
let profName = document.querySelector(".profile__name");

function popupToggle() {
  if (popup.classList.contains("popup_opened") === false) {
    popup.classList.add("popup_opened");
    nameInput.value = profName.textContent;
    jobInput.value = profJob.textContent;
  } else {
    popup.classList.remove("popup_opened");
  }
}

// --- закрытие popup вне формы
function clickOverlay(event) {
  if (event.target === event.currentTarget) {
    popupToggle();
  }
}
//

function formSubmitHandler(evt) {
  evt.preventDefault();

  profName.textContent = nameInput.value;
  profJob.textContent = jobInput.value;
  popupToggle();
}

formElement.addEventListener("submit", formSubmitHandler);

popup.addEventListener("click", clickOverlay);
popupOpen.addEventListener("click", popupToggle);
popupClose.addEventListener("click", popupToggle);
