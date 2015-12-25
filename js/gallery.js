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
    this._currentPhotoNumber = 0;

    // Меняем контекст выполнения
    this._onCloseClick = this._onCloseClick.bind(this);
    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
    this._onLeftControlClick = this._onLeftControlClick.bind(this);
    this._onRightControlClick = this._onRightControlClick.bind(this);
  };

  /**
   * Открыть галерею.
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
   * Закрыть галерею.
   */
  Gallery.prototype.hide = function() {
    // Прячем галерею
    this.element.classList.add('invisible');
    // Чистим адресную строку
    location.hash = '';
    // Убираем обработчики
    this._closeButton.removeEventListener('click', this._onCloseClick);
    window.removeEventListener('keydown', this._onDocumentKeyDown);
    this._leftControl.removeEventListener('click', this._onLeftControlClick);
    this._rightControl.removeEventListener('click', this._onRightControlClick);
  };

  /**
   * Обработчик клика по крестику.
   * @private
   */
  Gallery.prototype._onCloseClick = function() {
    this.hide();
  };

  /**
   * Обработчик нажатия клавиши ESC.
   * @param {Event} evt
   * @private
   */
  Gallery.prototype._onDocumentKeyDown = function(evt) {
    var ESC_CODE = 27;
    if (evt.keyCode === ESC_CODE) {
      this.hide();
    }
  };

  /**
  * Обработчик клика по левому контролу.
  * @private
  */
  Gallery.prototype._onLeftControlClick = function() {
    var currentPhotoNumber = this._currentPhotoNumber;
    if (currentPhotoNumber > 0) {
      this.setCurrentPicture(currentPhotoNumber - 1);
    }
  };

  /**
   * Обработчик клика по правому контролу.
   * @private
   */
  Gallery.prototype._onRightControlClick = function() {
    var currentPhotoNumber = this._currentPhotoNumber;
    var lastPhotoNumber = this._photos.length;
    if (currentPhotoNumber + 1 < lastPhotoNumber) {
      this.setCurrentPicture(currentPhotoNumber + 1);
    }
  };

  /**
   * Метод принимает на вход массив объектов Photo и сохраняет его.
   * @param {Array.<Photo>} photos
   */
  Gallery.prototype.setPictures = function(photos) {
    this._photos = photos;
  };

  /**
   * Метод берёт фотографию с переданным индексом из массива фотографий
   * и отрисовываёт её в галерее.
   * @param {number|string} data
   */
  Gallery.prototype.setCurrentPicture = function(data) {
    var photos = this._photos;
    var preview = document.querySelector('.overlay-gallery-preview');
    var currentImage = preview.querySelector('img');
    var currentNumber = document.querySelector('.preview-number-current');
    var totalNumber = document.querySelector('.preview-number-total');
    var image = new Image();

    if (currentImage) {
      preview.removeChild(currentImage);
    }

    image.width = 300;
    image.height = 300;
    image.alt = 'screenshot';

    if (typeof data === 'number') {
      this._currentPhotoNumber = data;

      image.src = photos[data]._src;

      currentNumber.innerHTML = data + 1;
      totalNumber.innerHTML = photos.length;

    } else if (typeof data === 'string') {

      data = location.origin + data;

      for (var i = 0; i < photos.length; i++) {
        if (photos[i]._src === data) {
          image.src = data;

          currentNumber.innerHTML = i + 1;
          totalNumber.innerHTML = photos.length;
        }
      }
    }
    preview.appendChild(image);
  };

  window.Gallery = Gallery;
})();
