'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  var form = document.querySelector('.review-form');
  var markParent = form.querySelector('.review-form-group-mark');
  var name = form.querySelector('#review-name');
  var text = form.querySelector('#review-text');
  var nameHint = form.querySelector('.review-fields-name');
  var textHint = form.querySelector('.review-fields-text');
  var submit = form.querySelector('.review-submit');

  markParent.onchange = function() {
    var mark = form.querySelector('[name=review-mark]:checked');
    if (mark.value < 3) {
      text.setAttribute('required', '');
      textHint.classList.remove('invisible');
    } else {
      text.removeAttribute('required', '');
      textHint.classList.add('invisible');
    }
  }

  name.onchange = function() {
    if (name.value !== '') {
      nameHint.classList.add('invisible');
      submit.removeAttribute('disabled', '');
    } else {
      nameHint.classList.remove('invisible');
      submit.setAttribute('disabled', '');
    }
  }

  text.onchange = function() {
    if (!(text.setAttribute('required', '')) && (text.value !== '')) {
      textHint.classList.add('invisible');
      submit.removeAttribute('disabled', '');
    } else {
      textHint.classList.remove('invisible');
      submit.setAttribute('disabled', '');
    }
  }

})();