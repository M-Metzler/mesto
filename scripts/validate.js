// enableValidation({
//   formSelector: '.popup__container',
//   inputSelector: '.popup__text',
//   submitButtonSelector: '.popup__btn-save',
//   inactiveButtonClass: 'popup__btn-save_disabled',
//   inputErrorClass: 'popup__text_type_error',
//   errorClass: 'popup__text-error_visible'
// });


// функция показа ошибки
const showError = (errorElement, inputElement) => {
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add('popup__text_type_error');
}

// функция скрытия ошибки
const hideError = (errorElement, inputElement) => {
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.remove('popup__text_type_error');
}

// функция проверки поля input на валидность
const hasInvalidInput = (formElement, inputElement) => {
  const isInputValid = !inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  if (isInputValid) {
    showError(errorElement, inputElement);
  } else {
    hideError(errorElement, inputElement);
  }
}

//функция кнопки "Сохранить" (активна/неактивна)
const toggleButtonState = (button, isActive) => {
  if (isActive) {
    button.classList.remove('popup__btn-save_disabled');
    button.disabled = false;
  } else {
    button.classList.add('popup__btn-save_disabled');
    button.disabled = 'disabled';
  }

}

const setEventListeners = (formElement) => {
  const inputList = formElement.querySelectorAll('.popup__text');
  const submitButton = formElement.querySelector('.popup__btn-save');



  Array.from(inputList).forEach(inputElement => {
    inputElement.addEventListener('input', (evt) => {
      const ifFormValid = inputElement.checkValidity();
      console.log(evt.target.validity);

      hasInvalidInput(formElement, inputElement);
      toggleButtonState(submitButton, ifFormValid)
    })

  })

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  })
}


const enableValidationForms = () => {
  const forms = document.querySelectorAll('.popup__container');
  Array.from(forms).forEach(formElement => {

    setEventListeners(formElement)
  })
}

enableValidationForms();
