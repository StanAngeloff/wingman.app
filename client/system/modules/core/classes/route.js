define('Route',
/**
 * @requires module:Controller
 * @requires module:Guard
 * @requires module:I18n
 * @requires module:Error~RuntimeError
 * @exports Route
 */
function(Controller, Guard, I18n, ResourceError, RuntimeError) {
  /**
   * Create a new instance of a router.
   *
   * @class A router handles all navigational aspects of an application.
   */
  var Route = Backbone.Router.extend({
    initialize: function() {
      /** @private */
      this._uuid = 0;
    },
    uuid: function() {
      return (this._uuid ++);
    },
    process: function(options, args) {
      Guard.expectHash('Route.process', 'options', options, {
        controller: true,
        action: true
      });
      var invoke = function(instance) {
        if ( ! (options.action in instance)) {
          throw new ResourceError(I18n.format("Route ':route' (:name) failed as the requested controller does not have a method for action ':action' defined.", {
            ':route': options.route,
            ':name': options.name,
            ':action': options.action
          }), 1329669800);
        }
        instance[options.action].apply(instance, args);
      };
      if (_.isObject(options.controller)) {
        invoke(new (options.controller));
      } else {
        define(['Controller/' + options.controller], function(klass) {
          invoke(new klass());
        })();
      }
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
   * <dl>
   *   <dt><code>options</code></dt>
   *   <dd><code>controller</code> The controller type which will be initialized when the route is navigated to.</dd>
   *   <dd><code>action</code> The controller action to call.</dd>
   *   <dd><code>name</code> Optional name for the route(s).</dd>
   * </dl>
   *
   * @param {String|RegExp|Array} routes The route to match, either as a string, a regular expression or an array of those.
   * @param {Object} options A hash of options for this route. <code>{ controller, action }</code> must be specified.
   * @see <a href="http://documentcloud.github.com/backbone/#Router-route">Router (Backbone.js)</a>
   * @return {Route} A reference to self (useful for chaining methods).
   */
  Route.match = function(routes, options) {
    Guard.expectHash('Route.match', 'options', options, {
      controller: true,
      action: true
    });
    var instance = Route.instance();
    if ( ! ('name' in options)) {
      options.name = options.action + '-' + instance.uuid();
    }
    if (routes === false) {
      routes = /^$|^\/$/;
    }
    if ( ! _.isArray(routes)) {
      routes = [routes];
    }
    if (routes.length === 1 && routes[0] === '/') {
      routes.push('');
    }
    _.each(routes, function(route) {
      instance.route(route, options.name, function() {
        instance.process(_.extend({}, options, {
          route: route
        }), Array.prototype.slice.call(arguments));
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
   * @throws {module:Error~RuntimeError} If no routes have been registered.
   */
  Route.find = function() {
    if (typeof (Backbone.history) === 'undefined') {
      throw new RuntimeError(I18n.format("':method' called without any routes set up. See ':relative'.", {
        ':method': 'Route.find',
        ':relative': 'Route.match'
      }), 1329505536);
    }
    Backbone.history.start();
    return this;
  };

  return Route;
});
