/**
 * @class A collection of functions to enforce certain rules over arguments.
 */
var Guard = {
  /**
   * Check if a given argument is of the expected type or throw an exception otherwise.
   *
   * @param {String} callee The callee of the method, used in the exception message.
   * @param {String} name The argument name in the callee method, used in the exception message.
   * @param {Object} object The object whose type is being checked.
   * @param {String} type The expected type, e.g., <code>Object</code>.
   * @throws {ArgumentException} If the type of <code>object</code> is not the expected one.
   */
  expectType: function(callee, name, object, type) {
    if ( ! _['is' + type](object)) {
      throw new ArgumentException("'" + callee + "' expects '" + name + "' to be of type '" + type + "'.");
    }
    return this;
  },
  /**
   * Check if a given hash contains all expected keys or throw an exception otherwise.
   *
   * <p><code>expected</code> is a hash of <code>{ key: value }</code> pairs
   * where each <code>key</code> must be present in <code>object</code>. Optionally,
   * <code>value</code> may be an object in which case the target must be an instance of it.</p>
   *
   * @param {String} callee The callee of the method, used in the exception message.
   * @param {String} name The argument name in the callee method, used in the exception message.
   * @param {Object} object The object whose keys (and optionally values) are being checked.
   * @param {Array} expected The list of keys/values that are expected to be in the hash.
   * @throws {ArgumentException} If any of the expected keys was not present in <code>object</code>.
   * @throws {TypeException} If any of the values in <code>object</code> was not of an expected instance.
   */
  expectHash: function(callee, name, object, expected) {
    this.expectType(callee, name, object, 'Object');
    _.each(expected, function(value, key) {
      if ( ! (key in object)) {
        throw new ArgumentException("'" + callee + "' expects '" + name + "' to have a value for '" + key + "'.");
      }
      if (_.isObject(value) && ( ! (object[key].prototype instanceof value))) {
        throw new TypeException("'" + callee + "' expects '" + name + "[" + key + "]' to be of type '" + (value.name || value.constructor.name || value.toString()) + "'.");
      }
    });
    return this;
  }
};
