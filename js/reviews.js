/* global Review: true */

'use strict';

(function() {
  var container = document.querySelector('.reviews-list');
  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsBlock = document.querySelector('.reviews');
  var moreButton = document.querySelector('.reviews-controls-more');

  /** @type {Array.<Object>} Массив всех загруженных отелей. Изначально пуст. */
  var reviews = [];

  /** @type {Array.<Object>} Отфильтрованный массив отелей. Изначально пуст. */
  var filteredReviews = [];

  /** @type {number} Номер текущей страницы с отзывами. Изначально первая(0) страница */
  var currentPage = 0;

  /** @const {number} Размер одной страницы с отзывами */
  var PAGE_SIZE = 3;

  /** @type {string} Активный фильтр. Изначально показываются все отзывы. */
  var activeFilter = localStorage.getItem('active-filter') || 'reviews-all';

  if (activeFilter !== 'reviews-all') {
    var activeRadio = document.querySelector('[name="reviews"][value="' + activeFilter + '"]');
    //var radioToBeChecked = markParent.querySelector('[name="reviews"][value="' + activeFilter + '"]');
    activeRadio.setAttribute('checked', '');
  }

  // Отлов события активации фильтров
  var filters = document.querySelector('.reviews-filter');
  filters.addEventListener('change', function(evt) {
    var clickedElementID = evt.target.id;
    setActiveFilter(clickedElementID);
  });

  // Загружаем отзывы и отрисовываем
  getReviews();

  /**
  * Отрисовка списка отзывов.
  * @param {Array.<Object>} reviewsToRender
  * @param {number} pageNumber
  * @param {boolean=} replace
  */
  function renderReviews(reviewsToRender, pageNumber, replace) {
    if (replace) {
      var renderedElements = container.querySelectorAll('.review');
      Array.prototype.forEach.call(renderedElements, function(el) {
        container.removeChild(el);
      });
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
      var reviewElement = new Review(review);
      reviewElement.render();
      fragment.appendChild(reviewElement.element);
    });

    container.appendChild(fragment);
    reviewsFilter.classList.remove('invisible');
  }

  /**
  * Активация фильтра.
  * @param {number} id
  */
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
    localStorage.setItem('active-filter', id);
  }

  /**
  * Загрузка отзывов из файла reviews.json.
  */
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
      renderReviews(filteredReviews, currentPage);
      // Показываем кнопку "еще отзывы" и ставим на неё обработчик
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

  /**
  * Дорисовка отзывов постранично.
  */
  function addMoreReviews() {
    if (currentPage < Math.round(filteredReviews.length / PAGE_SIZE)) {
      renderReviews(filteredReviews, ++currentPage);
    }
  }
})();
