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
    /** @private */
    this._request = null;
    this.initialize.apply(this, arguments);
    return this;
  };

  /**
   * Initialize a newly created instance of a <code>Controller</code>.
   */
  Controller.prototype.initialize = function() { };

  /**
   * Get or set the request object associated with this <code>Controller</code>.
   *
   * @param {Object} request When present, acts as a setter.
   * @return {Object}
   */
  Controller.prototype.request = function(request) {
    if (typeof (request) !== 'undefined') {
      this._request = request;
    }
    return this._request;
  };

  /**
   * Define a new subclass of <code>Controller</code> with its own set of methods.
   *
   * @function
   * @return {Controller}
   */
  Controller.extend = Backbone.Router.extend;

  return Controller;
});
