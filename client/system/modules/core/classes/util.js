/**
 * A collection of useful functions.
 *
 * @module Util
 */

define('Util', function(Guard) {
  return {
    /**
     * Create an <code>instance(..)</code> static method in the given class.
     *
     * @param {Object} klass The class which will have an <code>instance(..)</code> method added.
     * @return {Object} A reference to the class.
     * @throws {module:Error~ArgumentError} If <code>klass</code> is not an object.
     */
    singleton: function(klass) {
      Guard.expectType('Util.singleton', 'klass', klass, 'Object');
      klass.instance = function() {
        return (this.__instance || (this.__instance = new this()));
      };
      return klass;
    }
  };
});
