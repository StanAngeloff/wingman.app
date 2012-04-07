define('view/engine', ['backbone', 'i18n', 'util', 'exceptions'],
/**
 * @requires module:backbone
 * @requires module:i18n
 * @requires module:util
 * @requires module:exceptions
 * @exports view/engine
 */
function(Backbone, I18n, Util, Exceptions) {
  "use strict";
  /**
   * Create a new instance of a <code>View</code> HTML engine.
   *
   * @class An engine takes in a template, a view object and spits out HTML.
   */
  function Engine() {
    this.initialize.apply(this, arguments);
    return this;
  };

  /**
   * Initialize a newly created instance of an <code>Engine</code>.
   */
  Engine.prototype.initialize = function() { };

  /**
   * Compiles the template into a JavaScript function.
   *
   * @abstract
   * @throws {module:exceptions~NotImplementedException}
   */
  Engine.prototype.compile = function() {
    throw new (Exceptions.NotImplementedException)(I18n.format("Method ':method' in class ':class' is marked as abstract and must be implemented in derived classes.", {
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

  /**
   * Create and return a singleton instance of an <code>Engine</code>.
   *
   * <p>In order to be able to register partials, helpers, etc. which persist across different views,
   * we need a singleton instance of each <code>View</code> engine.</p>
   *
   * @methodOf module:view/engine~Engine
   * @name module:view/engine~Engine.instance
   * @static
   * @return {Engine}
   */
  Engine = Util.singleton(Engine);

  return Engine;
});
