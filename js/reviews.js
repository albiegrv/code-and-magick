/* global reviews: true */

'use strict';

var container = document.querySelector('.reviews-list');
var reviewFilter = document.querySelector('.reviews-filter');

reviewFilter.classList.add('invisible');

reviews.forEach(function(review) {
  var element = getElementByTemplate(review);
  container.appendChild(element);
});

reviewFilter.classList.remove('invisible');

function getElementByTemplate(data) {
  var template = document.querySelector('#review-template');
  var element = template.content.children[0].cloneNode(true);
  var stars = element.querySelector('.review-rating');

  element.querySelector('.review-text').textContent = data.description;

  if (data.rating === 2) {
    stars.classList.add('review-rating-two');
  } else if (data.rating === 3) {
    stars.classList.add('review-rating-three');
  } else if (data.rating === 4) {
    stars.classList.add('review-rating-four');
  } else if (data.rating === 5) {
    stars.classList.add('review-rating-five');
  } else {
    stars.classList.add('review-rating-one');
  }

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
