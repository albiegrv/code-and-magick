'use strict';

(function() {
  /**
  * Функция записывает в прототип дочернего конструктора child
  * методы и свойства родительского конструктора parent.
  * @param {Function} child
  * @param {Function} parent
  */
  function inherit(child, parent) {
    /**
    * @constructor
    */
    var EmptyConstructor = function() {};

    EmptyConstructor.prototype = parent.prototype;

    child.prototype = new EmptyConstructor();
  }

  window.inherit = inherit;
})();
