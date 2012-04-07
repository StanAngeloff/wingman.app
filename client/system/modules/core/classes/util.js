/**
 * A collection of useful functions.
 *
 * @module util
 */

define('util',
/**
 * @requires module:guard
 */
function() {
  "use strict";
  return {
    /**
     * Create an <code>instance(..)</code> static method in the given class.
     *
     * @param {Object} klass The class which will have an <code>instance(..)</code> method added.
     * @return {Object} A reference to the class.
     */
    singleton: function(klass) {
      klass.instance = function() {
        return (this.__instance || (this.__instance = new this()));
      };
      return klass;
    },
    extend: function(klass, using) {
      klass.prototype = new using();
      klass.prototype.constructor = klass;
      return klass;
    }
  };
});
