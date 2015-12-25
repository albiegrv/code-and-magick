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
    event.preventDefault();
    var clickedElement = evt.target;

    for (var i = 0; i < photoCollection.length; i++) {
      if (clickedElement === photoCollection[i]) {
        //gallery.setCurrentPicture(Number(i));
        //gallery.show();
        var photoFileName = i + 1;
        var photoAdress = 'img/screenshots/' + photoFileName + '.png';
        location.hash = location.hash.indexOf(photoAdress) !== -1 ? '' : photoAdress;
        gallery.setCurrentPicture(photoAdress);
      }
    }
  });

//   var onHashChange = function() {
//   var REG_EXP = /#photo\/(\S+)/;
//
//   if (location.hash.match(REG_EXP)) {
//     gallery.show();
//     var srcString = location.hash.substr(7);
//     console.log(srcString);
//     gallery.setCurrentPicture(srcString);
//   } else {
//     gallery.hide();
//   }
// };
//
//   window.addEventListener('hashchange', onHashChange);
})();
