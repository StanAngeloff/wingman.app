/**
 * @class A collection of functions to enforce certain rules over arguments.
 */
var Guard = {
  /**
   * Check if a given argument is an <code>Object</code> or throw an exception otherwise.
   *
   * @param {String} callee The calle of the method, used in the exception message.
   * @param {Object} object The object whose type is being checked.
   * @throws {ArgumentException} If the type of <code>object</code> is not <code>'object'</code>.
   */
  expectObject: function(callee, object) {
    if (typeof (object) !== 'object') {
      throw new ArgumentException("'" + callee + "' expects options to be an object.");
    }
    return this;
  },
  /**
   * Check if a given hash contains all expected keys or throw an exception otherwise.
   *
   * @param {String} callee The calle of the method, used in the exception message.
   * @param {Object} options The object whose keys are being checked.
   * @param {Array} expected The list of keys that are expected to be in the hash.
   * @throws {ArgumentException} If any of the expected keys was not present in <code>options</code>.
   */
  expectOptions: function(callee, options, expected) {
    this.expectObject(callee, options);
    _.each(expected, function(key) {
      if ( ! (key in options)) {
        throw new ArgumentException("'" + callee + "' expects options to have a value for '" + key + "'.");
      }
    });
    return this;
  }
};
