'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  var form = document.querySelector('.review-form');
  var markParent = form.querySelector('.review-form-group-mark');
  var name = form.querySelector('#review-name');
  var text = form.querySelector('#review-text');

  var hintParent = form.querySelector('.review-fields');
  var nameHint = hintParent.querySelector('.review-fields-name');
  var textHint = hintParent.querySelector('.review-fields-text');

  var submit = form.querySelector('.review-submit');

  // Открываем форму
  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
    // Вставляем в поле "имя" значение из cookie
    name.value = docCookies.getItem('review-name');
    // Достаём значение "оценки" из cookie
    var markFromCookie = docCookies.getItem('review-mark');
    // Проверяем, что оно не пустое
    if (markFromCookie !== null) {
      // Находим радио-баттон с совпадающим значением
      var markToBeChecked = markParent.querySelector('[name="review-mark"][value="' + markFromCookie + '"]');
      // И добавляем ему атрибут checked
      markToBeChecked.setAttribute('checked', '');
    }
    validateForm();
  };

  // Закрываем форму
  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  // Событие - изменение поля "оценка"
  markParent.onchange = validateForm;

  // Событие - изменение поля "имя"
  name.onkeyup = validateForm;

  // Событие - изменение поля "отзыв"
  text.onkeyup = validateForm;

  // Событие - отправка формы
  form.onsubmit = function(evt) {
    evt.preventDefault();

    var mark = form.querySelector('[name=review-mark]:checked');

    var myBirthDay = +new Date(2015, 1, 2);
    var dateToExpire = +Date.now() + (+Date.now() - myBirthDay);

    document.cookie = docCookies.setItem('review-mark', mark.value, dateToExpire);
    document.cookie = docCookies.setItem('review-name', name.value, dateToExpire);

    form.submit();
  };

  /**
   * Ф-ция валидации формы.
   */
  function validateForm() {
    var mark = form.querySelector('[name=review-mark]:checked');

    var isTextRequired = Number(mark.value) < 3;
    var isTextEmpty = text.value === '';
    var isNameEmpty = name.value === '';
    var isTextRequiredAndEmpty = isTextRequired && isTextEmpty;

    if (isTextRequired) {
      text.setAttribute('required', '');
    } else {
      text.removeAttribute('required', '');
    }

    if (isNameEmpty || isTextRequiredAndEmpty) {
      hintParent.classList.remove('invisible');
      submit.setAttribute('disabled', '');
    } else {
      hintParent.classList.add('invisible');
      submit.removeAttribute('disabled');
    }

    if (isTextRequiredAndEmpty) {
      textHint.classList.remove('invisible');
    } else {
      textHint.classList.add('invisible');
    }

    if (isNameEmpty) {
      nameHint.classList.remove('invisible');
    } else {
      nameHint.classList.add('invisible');
    }
  }
})();
