const enableValidationSettings = ({
  formSelector: '.popup__container',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_visible'
});

class FormValidator {
  constructor(enableValidationSettings, formElement) {
    this._formSelector = enableValidationSettings.formSelector;
    this._inputSelector = enableValidationSettings.inputSelector;
    this._submitButtonSelector = enableValidationSettings.submitButtonSelector;
    this._inactiveButtonClass = enableValidationSettings.inactiveButtonClass;
    this._inputErrorClass = enableValidationSettings.inputErrorClass;
    this._errorClass = enableValidationSettings.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(enableValidationSettings.inputSelector));
    this._submitButton = formElement.querySelector(enableValidationSettings.submitButtonSelector);
  }
  //проверка inputs на валидность
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
  //переключение кнопки отправки формы
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  };
  //показать ошибку input
  _showInputError(inputElement, errorElement) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  };
//скрыть ошибку input
  _hideInputError = (inputElement, errorElement) => {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };
  //при проверке input - показывать или скрывать ошибку
  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement);
    } else {
      this._hideInputError(inputElement, errorElement);
    }
  };
  //Слушатели
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState();
        this._checkInputValidity(inputElement);
      });
    });
  }
  // включение валидации формы
  enableValidation() {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })
    this._setEventListeners();
  }
}

export { FormValidator, enableValidationSettings };
