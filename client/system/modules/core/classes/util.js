/**
 * @class A collection of utility functions.
 */
var Util = {
  /**
   * Create a new instance of a given class.
   *
   * <p>As we are operating within a closure and all classes are defined as <code>var</code>s,
   * the only available option to grab a reference to the class by name is to <code>eval</code>.</p>
   *
   * <p>This function exists to prevent <code>eval</code>s being thrown in other places in the code
   * where it wouldn't be acceptable.</p>
   *
   * @param {Object|String} name The class to instantiate, either as a reference or as a string.
   * @throws {ClassDoesNotExistException} If the class to be instantiated does not exist in scope.
   */
  newInstanceOf: function(name) {
    var klass;
    if (typeof (name) === 'string') {
      try {
        klass = eval(name);
      } catch (e) {
        if (e instanceof ReferenceError) {
          throw new ClassDoesNotExistException(e);
        }
      }
    } else {
      klass = name;
    }
    return new klass();
  },
  /**
   * Convert the first letter of a string to upper case.
   *
   * @param {String} string
   * @returns {String}
   */
  upperCaseFirst: function(string) {
    string = ('' + string);
    return (string.substring(0, 1).toUpperCase() + string.substring(1));
  }
};
