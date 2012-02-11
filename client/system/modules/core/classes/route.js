/**
 * Create a new instance of a router.
 *
 * @class A router handles all navigational aspects of an application.
 */
var Route = Backbone.Router.extend({
  process: function(options, args) {
    Guard.expectOptions('Route.process', options, ['controller', 'action']);
    var controller = Util.newInstanceOf('Controller' + Util.upperCaseFirst(options.controller));
  }
});

/**
 * Create and return a singleton instance of a <code>Route</code>.
 *
 * <p>There should be one and only once instance per application.</code>
 *
 * @return {Route}
 */
Route.instance = function() {
  return (this.__instance || (this.__instance = new Route()));
};

/**
 * Define a new route for the application.
 *
 * <p>When you pass in <code>false</code> as the route, default empty and root routes will be created.
 * The empty route is needed to ensure your controller action gets called even when the URL doesn't contain any fragments.</p>
 *
 * @param {String|RegExp} route The route to match, either as a string or a regular expression.
 * @param {Object} options A hash of options for this route. <code>{ controller, action }</code> must be specified.
 * @see <a href="http://documentcloud.github.com/backbone/#Router-route">Router (Backbone.js)</a>
 * @return {Route} A reference to self (useful for chaining methods).
 */
Route.match = function(route, options) {
  Guard.expectOptions('Route.match', options, ['controller', 'action']);
  if (route === false) {
    route = /^$|^\/$/;
  }
  if ( ! _.isArray(route)) {
    route = [route];
  }
  if (route.length === 1 && route[0] === '/') {
    route.push('');
  }
  var instance = Route.instance(),
      name = (options.controller + '.' + options.action);
  _.each(route, function(each) {
    instance.route(each, name, function() {
      instance.process(options, Array.prototype.slice.call(arguments));
    });
  });
  return this;
};

/**
 * Start the application.
 *
 * <p>Find a route matching the fragment in the URL and start the application
 * by calling the configured controller action.</p>
 *
 * @see <a href="http://documentcloud.github.com/backbone/#History-start">History (Backbone.js)</a>
 * @return {Route} A reference to self (useful for chaining methods).
 */
Route.find = function() {
  Backbone.history.start();
  return this;
};
