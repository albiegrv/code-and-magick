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
    var clickedElement = evt.target;

    for (var i = 0; i < photoCollection.length; i++) {
      if (clickedElement === photoCollection[i]) {
        gallery.setCurrentPicture(Number(i));
        gallery.show();
      }
    }
  });
})();
