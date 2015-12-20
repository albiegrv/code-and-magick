'use strict';

(function() {

  /**
  * @param {Object} data
  * @constructor
  */
  function Review(data) {
    this._data = data;
  }

  Review.prototype.render = function() {
    var template = document.querySelector('#review-template');

    if ('content' in template) {
      this.element = template.content.children[0].cloneNode(true);
    } else {
      this.element = template.children[0].cloneNode(true);
    }

    this.element.querySelector('.review-text').textContent = this._data.description;

    var stars = this.element.querySelector('.review-rating');
    var ratingSuffix = '';

    switch (this._data.rating) {
      case 2:
        ratingSuffix = 'two';
        break;

      case 3:
        ratingSuffix = 'three';
        break;

      case 4:
        ratingSuffix = 'four';
        break;

      case 5:
        ratingSuffix = 'five';
        break;

      default:
        ratingSuffix = 'one';
        break;
    }
    stars.classList.add('review-rating-' + ratingSuffix);

    var userImg = new Image();
    var tempImg = this.element.querySelector('.review-author');
    var IMAGE_TIMEOUT = 10000;

    var imageLoadTimeout = setTimeout(function() {
      userImg.src = '';
      this.element.classList.add('review-load-failure');
    }, IMAGE_TIMEOUT);

    userImg.onload = function() {
      clearTimeout(imageLoadTimeout);
      this.element.replaceChild(userImg, tempImg);
      userImg.width = 124;
      userImg.height = 124;
      userImg.classList.add('review-author');
    }.bind(this);

    userImg.onerror = function() {
      this.element.classList.add('review-load-failure');
    }.bind(this);

    userImg.src = this._data.author.picture;
    userImg.alt = this._data.author.name;
    userImg.title = this._data.author.name;
  };

  window.Review = Review;
})();
