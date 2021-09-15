let popup = document.querySelector(".popup");
let popupOpen = document.querySelector(".profile__button-edit");
let popupClose = popup.querySelector(".popup__btn-close");
let saveForm = popup.querySelector(".popup__btn-save");



function popupToggle() {
  popup.classList.toggle("popup_opened");
  root.classList.toggle("root_no-scroll");
}
// --- закрытие popup вне формы
function clickOverlay(event) {
  if (event.target === event.currentTarget) {
    popupToggle();
  }
}
popup.addEventListener("click", clickOverlay);
//

popupOpen.addEventListener("click", popupToggle);
popupClose.addEventListener("click", popupToggle);
saveForm.addEventListener("click", popupToggle);

// Код добавления данных в профиль

let formElement = document.querySelector(".popup__container");
let nameInput = formElement.querySelector(".popup__name");
let jobInput = formElement.querySelector(".popup__about-self");

function formSubmitHandler(evt) {
  evt.preventDefault();

  let profJob = document.querySelector(".profile__about-self");
  let profName = document.querySelector(".profile__name");

  profName.textContent = nameInput.value;
  profJob.textContent = jobInput.value;
}

formElement.addEventListener("submit", formSubmitHandler);
