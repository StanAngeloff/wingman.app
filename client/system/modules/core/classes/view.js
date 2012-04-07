define('view', ['jquery', 'underscore', 'guard', 'i18n', 'view/engine', 'view/engine/default', 'util', 'exceptions'],
/**
 * @requires module:jquery
 * @requires module:underscore
 * @requires module:guard
 * @requires module:i18n
 * @requires module:view/engine
 * @requires module:view/engine/default
 * @requires module:util
 * @requires module:exceptions
 * @exports view
 */
function($, _, Guard, I18n, ViewEngine, ViewEngineDefault, Util, Exceptions) {
  "use strict";
  var __engine = ViewEngineDefault;

  /**
   * Create a new instance of a <code>View</code>.
   *
   * @class A view performs all on-screen updates and handles any User interactions, e.g., clicks.
   * @param {String} template The template name where <code>'/'</code> acts as a delimiter.
   */
  function View(template) {
    Backbone.View.apply(this, Array.prototype.slice.call(arguments, 1));
    /** @private */
    this._engine || (this._engine = __engine);
    /** @private */
    this._target || (this._target = '__page');
    this.template || (this.template = template);
    this.initialize.apply(this, arguments);
    return this;
  };

  Util.extend(View, Backbone.View);

  /**
   * Get or set the HTML rendering engine for this view.
   *
   * @param {module:view/engine~Engine} engine When present, acts as a setter.
   * @return {module:view/engine~Engine}
   * @see View.engine
   */
  View.prototype.engine = function(engine) {
    return View.engine(engine, this);
  };

  /**
   * Get or set the target DOM element for the <code>View</code>.
   *
   * @param {DOMElement|jQuery|String} target When present, acts as a setter.
   * @return {DOMElement}
   */
  View.prototype.target = function(target) {
    if (typeof (target) !== 'undefined') {
      this._target = target;
    }
    if (_.isObject(this._target) && this._target.length) {
      return this._target;
    }
    if (this._target.nodeType) {
      this._target = $(this._target);
    } else {
      var query = ('#' + this._target),
          $element = $(query);
      if ( ! $element.length) {
        throw new (Exceptions.ResourceException)(I18n.format("':method' could not find target element, DOM query was ':query'.", {
          ':method': 'View.target',
          ':query': query
        }), 1330103038);
      }
      this._target = $element;
    }
    return this._target;
  };

  /**
   * Get the contents of a template from the DOM.
   *
   * @param {String} template The template name where <code>'/'</code> acts as a delimiter.
   * @return {String}
   * @throws {module:exceptions~ResourceException} If no template DOM element was found.
   */
  View.prototype.templateContents = function(template) {
    template || (template = this.template);
    var query = this._DOMQuery(template),
        $element = $(query);
    if ( ! $element.length) {
      throw new (Exceptions.ResourceException)(I18n.format("':method' could not find an element for template ':template', DOM query was ':query'.", {
        ':method': 'View.templateContents',
        ':query': query,
        ':template': template
      }), 1330102703);
    }
    return $element.html();
  };

  /**
   * Display the view in the DOM.
   *
   * @param {String} template Optional template name.
   * @param {Object} context Optional hash of <code>{ key: values }</code> pairs which will be available in the template only.
   * @return {View} A reference to self (useful for chaining methods).
   * @throws {module:exceptions~ResourceException} If no target DOM element was found.
   * @see View.prototype.toString
   * @see <a href="http://documentcloud.github.com/backbone/#View-render">View (Backbone.js)</a>
   */
  View.prototype.display = function(template, context) {
    var $element = this.target(),
        previous = $element.data('__view');
    if (previous) {
      previous.undelegateEvents();
    }
    $element
      .data('__view', this)
      .html(this.toString.apply(this, arguments));
    this.setElement($element);
    this.delegateEvents();
    return this;
  };

  /**
   * Render the view and return as <code>String</code>.
   *
   * @param {String} template Optional template name.
   * @param {Object} context Optional hash of <code>{ key: values }</code> pairs which will be available in the template only.
   * @return {String}
   */
  View.prototype.toString = function(template, context) {
    if (_.isObject(template)) {
      context = template;
      template = null;
    }
    template || (template = this.template);
    var contents = this.templateContents(template),
        block = this._engine.instance().compile(template, contents);
    Guard.expectType('View.display', 'block', block, 'Function');
    return block(_.extend({}, this, context));
  };

  /**
   * Format a DOM element ID based on a template name.
   *
   * @private
   * @param {String} template The template name where <code>'/'</code> acts as a delimiter.
   * @return {String}
   */
  View.prototype._DOMQuery = function(template) {
    return ('#__template-' + template.replace(/[\/_]/g, '-'));
  };

  /**
   * Get or set the HTML rendering engine for a given view or all newly created views.
   *
   * @param {module:view/engine~Engine} engine When present, acts as a setter.
   * @param {Object} view Optional view whose engine is being read/set.
   * @return {module:view/engine~Engine}
   * @throws {module:exceptions~TypeException} If the <code>engine</code> was not an instance of <code>Engine</code>.
   * @see module:view/engine/default
   */
  View.engine = function(engine, view) {
    if (typeof (engine) !== 'undefined') {
      Guard.expectType('View.engine', 'engine', engine, ViewEngine);
      if (view) {
        view._engine = engine;
      } else {
        __engine = engine;
      }
    }
    return (view ? view._engine : __engine);
  };

  /**
   * Define a new subclass of <code>View</code> with its own set of methods.
   *
   * @function
   * @return {View}
   */
  View.extend = Backbone.View.extend;

  return View;
});
