define('View/Engine',
/**
 * @requires module:I18n
 * @requires module:Error~NotImplementedError
 * @exports View/Engine
 */
function(I18n, NotImplementedError) {
  /**
   * Create a new instance of a <code>View</code> HTML engine.
   *
   * @class An engine takes in a template, a view object and spits out HTML.
   */
  function Engine() {
    this.initialize.apply(this, arguments);
  };

  /**
   * Initialize a newly created instance of an <code>Engine</code>.
   */
  Engine.prototype.initialize = function() { };

  /**
   * Compiles the template into a JavaScript function.
   *
   * @abstract
   * @throws {module:Error~NotImplementedError}
   */
  Engine.prototype.compile = function() {
    throw new NotImplementedError(I18n.format("Method ':method' in class ':class' is marked as abstract and must be implemented in derived classes.", {
      ':method': 'compile',
      ':class': 'Engine'
    }), 1330100902);
  };

  /**
   * Define a new subclass of <code>Engine</code> with its own set of methods.
   *
   * @function
   * @return {Engine}
   */
  Engine.extend = Backbone.View.extend;

  return Engine;
});
