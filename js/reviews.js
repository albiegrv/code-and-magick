/* global reviews: true */

'use strict';

var container = document.querySelector('.reviews-list');
var reviewFilter = document.querySelector('.reviews-filter');
var template = document.querySelector('#review-template');

reviewFilter.classList.add('invisible');

reviews.forEach(function(review) {
  var element = getElementByTemplate(review);
  container.appendChild(element);
});

reviewFilter.classList.remove('invisible');

function getElementByTemplate(data) {

  if ('content' in template) {
    var element = template.content.children[0].cloneNode(true);
  } else {
    var element = template.children[0].cloneNode(true);
  }

  element.querySelector('.review-text').textContent = data.description;

  var stars = element.querySelector('.review-rating');
  var ratingSuffix = '';

  switch(data.rating) {
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
  var tempImg = element.querySelector('.review-author');
  var IMAGE_TIMEOUT = 10000;

  var imageLoadTimeout = setTimeout(function() {
    userImg.src = '';
    element.classList.add('review-load-failure');
  }, IMAGE_TIMEOUT);

  userImg.onload = function() {
    clearTimeout(imageLoadTimeout);
    element.replaceChild(userImg, tempImg);
    userImg.width = 124;
    userImg.height = 124;
    userImg.classList.add('review-author');
  };

  userImg.onerror = function() {
    element.classList.add('review-load-failure');
  };

  userImg.src = data.author.picture;
  userImg.alt = data.author.name;
  userImg.title = data.author.name;

  return element;
}
