'use strict';

(function() {
  /**
  * @constructor
  */
  var Gallery = function() {
    this.element = document.querySelector('.overlay-gallery');
    this._closeButton = this.element.querySelector('.overlay-gallery-close');
    this._leftControl = this.element.querySelector('.overlay-gallery-control-left');
    this._rightControl = this.element.querySelector('.overlay-gallery-control-right');

    // Меняем контекст выполнения
    this._onCloseClick = this._onCloseClick.bind(this);
    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
    //this._onLeftControlClick = this._onLeftControlClick.bind(this);
    //this._onRightControlClick = this._onRightControlClick.bind(this);
  }

  /**
  * Открыть галерею
  */
  Gallery.prototype.show = function() {
    // Показываем галерею
    this.element.classList.remove('invisible');
    // Обработка клика по крестику
    this._closeButton.addEventListener('click', this._onCloseClick);
    // Обработка нажатия на ESC
    window.addEventListener('keydown', this._onDocumentKeyDown);
    // Обработка клика на левый контрол
    this._leftControl.addEventListener('click', this._onLeftControlClick);
    // Обработка клика на правый контрол
    this._rightControl.addEventListener('click', this._onRightControlClick);
  };

  /**
  * Закрыть галерею
  */
  Gallery.prototype.hide = function() {
    // Прячем галерею
    this.element.classList.add('invisible');
    // Убираем обработчики
    this._closeButton.removeEventListener('click', this._onCloseClick);
    window.removeEventListener('keydown', this._onDocumentKeyDown);
    this._leftControl.removeEventListener('click', this._onLeftControlClick);
    this._rightControl.removeEventListener('click', this._onRightControlClick);
  };

  /**
  * Обработчик клика по крестику
  * @private
  */
  Gallery.prototype._onCloseClick = function() {
    this.hide();
  };

  /**
  * Обработчик нажатия клавиши ESC
  * @param {Event} evt
  * @private
  */
  Gallery.prototype._onDocumentKeyDown = function (evt) {
    if (evt.keyCode == 27) {
      this.hide();
    }
  };

  /**
  * Обработчик клика по левому контролу
  * @private
  */
  Gallery.prototype._onLeftControlClick = function () {
    console.log('Left control is clicked');
  };

  /**
  * Обработчик клика по правому контролу
  * @private
  */
  Gallery.prototype._onRightControlClick = function () {
    console.log('Right control is clicked');
  };

  window.Gallery = Gallery;

  // Создаём объект галлереи
  var gallery = new Gallery();
  var images = document.querySelectorAll('.photogallery-image');

  // Ловим клики на картинки
  Array.prototype.forEach.call(images, function(image) {
    image.addEventListener('click', function(evt) {
      evt.preventDefault();
      gallery.show();
    });
  });
})();
