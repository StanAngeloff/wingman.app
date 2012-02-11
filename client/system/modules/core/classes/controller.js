/**
 * Create a new instance of a controller.
 *
 * @class A controller responds to routed actions as the User navigates in the application.
 */
function Controller() {
  this.initialize.apply(this, arguments);
};

/**
 * Initialize a newly created instance of a controller.
 *
 * @constructs
 */
Controller.prototype.initialize = function() { };

/**
 * Define a new subclass of Controller with its own set of methods.
 *
 * @return {Controller}
 */
Controller.extend = Backbone.Router.extend;
