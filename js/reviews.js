'use strict';

(function() {

  var container = document.querySelector('.reviews-list');
  var reviewsFilter = document.querySelector('.reviews-filter');
  var template = document.querySelector('#review-template');
  var reviewsBlock = document.querySelector('.reviews');
  var moreButton = document.querySelector('.reviews-controls-more');
  var activeFilter = 'reviews-all';
  var reviews = [];
  var filteredReviews = [];
  var currentPage = 0;
  var PAGE_SIZE = 3;

  // Отлов события активации фильтров
  var filters = document.querySelector('.reviews-filter');
  filters.addEventListener('change', function(evt) {
    var clickedElementID = evt.target.id;
    setActiveFilter(clickedElementID);
  });

  // Загружаем отзывы и отрисовываем
  getReviews();

  // Ф-ция отрисовки отзывов
  function renderReviews(reviewsToRender, pageNumber, replace) {
    if (replace) {
      container.innerHTML = '';
    }

    var fragment = document.createDocumentFragment();

    var from = pageNumber * PAGE_SIZE;
    var to = from + PAGE_SIZE;
    var pageReviews = reviewsToRender.slice(from, to);

    // Если будут отрисованы последние элементы, кнопка исчезает
    if (to >= reviewsToRender.length) {
      moreButton.classList.add('invisible');
    }

    pageReviews.forEach(function(review) {
      var element = getElementByTemplate(review);
      fragment.appendChild(element);
    });

    container.appendChild(fragment);
    reviewsFilter.classList.remove('invisible');
  }

  // Ф-ция активации фильтров
  function setActiveFilter(id) {
    if (activeFilter === id) {
      return;
    }

    filteredReviews = reviews.slice(0);
    moreButton.classList.remove('invisible');

    switch (id) {

      case 'reviews-recent':
        filteredReviews = filteredReviews.filter(function(a) {
          var reviewDate = +new Date(a.date);
          var currentDate = +Date.now();
          var halfYear = 6 * 30 * 24 * 60 * 60 * 1000;
          return reviewDate > (currentDate - halfYear);
        });
        filteredReviews = filteredReviews.sort(function(a, b) {
          var dateA = +new Date(a.date);
          var dateB = +new Date(b.date);
          return dateB - dateA;
        });
        break;

      case 'reviews-good':
        filteredReviews = filteredReviews.filter(function(a) {
          return a.rating > 2;
        });
        filteredReviews = filteredReviews.sort(function(a, b) {
          return b.rating - a.rating;
        });
        break;

      case 'reviews-bad':
        filteredReviews = filteredReviews.filter(function(a) {
          return a.rating < 3;
        });
        filteredReviews = filteredReviews.sort(function(a, b) {
          return a.rating - b.rating;
        });
        break;

      case 'reviews-popular':
        filteredReviews = filteredReviews.sort(function(a, b) {
          return b['review-rating'] - a['review-rating'];
        });
        break;
    }

    currentPage = 0;
    renderReviews(filteredReviews, currentPage, true);
    activeFilter = id;
  }

  // Ф-ция загрузки отзывов из файла reviews.json
  function getReviews() {
    reviewsFilter.classList.add('invisible');

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/reviews.json');

    xhr.onload = function(evt) {
      var rawData = evt.target.response;
      try {
        var loadedReviews = JSON.parse(rawData);
      } catch (e) {
        console.error('Error while loading data', e.message);
      }
      // Сохраняем загруженные отзывы
      // для фильтрации
      reviews = loadedReviews;
      filteredReviews = reviews.slice(0);
      // Удаляем класс для прелоадера
      reviewsBlock.classList.remove('reviews-list-loading');
      // Обработка загруженных данных
      renderReviews(filteredReviews, currentPage, true);
      // Показываем кнопку "еще отзывы"
      moreButton.classList.remove('invisible');
      moreButton.addEventListener('click', addMoreReviews);
    };

    xhr.onreadystatechange = function() {
      // Пока загрузка не закончилась
      // Добавляем класс для прелоадера
      if (this.readyState !== 4) {
        reviewsBlock.classList.add('reviews-list-loading');
      }

      // Если произошла ошибка
      if (this.status !== 200) {
        reviewsBlock.classList.add('reviews-load-failure');
      }
    };

    xhr.send();
  }

  // Ф-ция постраничной дозагрузки отзывов
  function addMoreReviews() {
    if (currentPage < Math.round(filteredReviews.length / PAGE_SIZE)) {
      renderReviews(filteredReviews, ++currentPage);
    }
  }

  // Ф-ция загрузки шаблона
  function getElementByTemplate(data) {
    var element;

    if ('content' in template) {
      element = template.content.children[0].cloneNode(true);
    } else {
      element = template.children[0].cloneNode(true);
    }

    element.querySelector('.review-text').textContent = data.description;

    var stars = element.querySelector('.review-rating');
    var ratingSuffix = '';

    switch (data.rating) {
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
})();
