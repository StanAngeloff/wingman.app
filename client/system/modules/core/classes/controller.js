define('Controller',
/**
 * @exports Controller
 */
function() {
  /**
   * Create a new instance of a <code>Controller</code>.
   *
   * @class A controller responds to routed actions as the User navigates in the application.
   */
  function Controller() {
    this.initialize.apply(this, arguments);
  };

  /**
   * Initialize a newly created instance of a <code>Controller</code>.
   */
  Controller.prototype.initialize = function() { };

  /**
   * Define a new subclass of <code>Controller</code> with its own set of methods.
   *
   * @function
   * @return {Controller}
   */
  Controller.extend = Backbone.Router.extend;

  return Controller;
});
