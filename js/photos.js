/* global Gallery: true, Photo: true */

'use strict';

(function() {
  var photoGallery = document.querySelector('.photogallery');
  var photoCollection = photoGallery.querySelectorAll('.photogallery-image img');
  var photos = Array.prototype.map.call(photoCollection, function(img) {
    img = new Photo(img.src);
    return img;
  });

  /**
   * @type {Gallery}
   */
  var gallery = new Gallery();
  gallery.setPictures(photos);

  photoGallery.addEventListener('click', function(evt) {
    evt.preventDefault();
    var clickedElement = evt.target;

    for (var i = 0; i < photoCollection.length; i++) {
      if (clickedElement === photoCollection[i]) {
        var photoFileName = i + 1;
        var photoAdress = 'img/screenshots/' + photoFileName + '.png';
        var photoLink = '#photo/' + photoAdress;
        location.hash = location.hash.indexOf(photoLink) !== -1 ? '' : photoLink;
        //gallery.setCurrentPicture(photoAdress);
      }
    }
  });

  var onHashChange = function() {
    var REG_EXP = /#photo\/(\S+)/;
    if (location.hash.match(REG_EXP)) {
      var srcString = location.hash.substr(7);
      console.log(typeof srcString);
      gallery.setCurrentPicture(srcString);
      gallery.show();
    } else {
      gallery.hide();
    }
  };

  window.addEventListener('hashchange', onHashChange);
})();
