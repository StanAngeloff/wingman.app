define('Model',
/**
 * @requires module:Form
 * @requires module:I18n
 * @requires module:Error~RuntimeError
 * @exports Model
 */
function(Form, I18n, RuntimeError) {
  /**
   * Create a new instance of a <code>Model</code>.
   *
   * @class A Model handles data on the client and communicating with the server on updates.
   * @param {String} name The model name which will take part in the sync URL.
   * @throws {module:Error~RuntimeError} If no name has been defined.
   */
  function Model(name) {
    Backbone.Model.apply(this, Array.prototype.slice.call(arguments, 1));
    this.name || (this.name = name);
    if ( ! this.name) {
      throw new RuntimeError(I18n.translate("An instance of a Model was created without a 'name' property."), 1331383243);
    }
    return this;
  };

  Model.prototype = new Backbone.Model();
  Model.prototype.constructor = Model;

  /**
   * Set a hash of model attributes on the object, firing <code>change</code>
   * unless you choose to silence it.
   *
   * <p>You may also pass a <code>Form</code> object and its values will be
   * used to populate the model.</p>
   *
   * @param {module:Form~Form|Object|String} key
   * @param {Object} value
   * @param {Object} options
   * @return {Model} A reference to self (useful for chaining methods).
   */
  Model.prototype.set = function(key, value, options) {
    if (key instanceof Form) {
      key = key.values();
    }
    return Backbone.Model.prototype.set.apply(this, [key, value, options]);
  };

  /**
   * The URL root for sync URLs.
   *
   * <p>If you don't override this in your classes, <code>Model.root</code>
   * will be used along with the <code>Model</code> name.</p>
   *
   * <p>If you haven't defined <code>Model.root</code>, the function will fallback
   * to the <code>{ root }</code> option in <code>Route.start(..)</code>.</p>
   *
   * @return {String}
   */
  Model.prototype.urlRoot = function() {
    return (Model.root || (Backbone.history && Backbone.history.options.root) || '').replace(/\/$/, '') + '/' + this.name;
  };

  /**
   * Guard against setting propertries on the model which are not explicitly defined.
   *
   * <p>Each model is expected to define an internal <code>defaults</code> hash
   * of all attributes it accepts. When a key from <code>attrs</code> is not found
   * in this hash, it is erased.</p>
   *
   * <p>This behaviour can be turned off by passing <code>{ validate: false }</code>
   * in the <code>options</code> hash.
   *
   * @private
   * @param {Object} attrs
   * @param {Object} options
   */
  Model.prototype._validate = function(attrs, options) {
    if (_.isObject(attrs) && ! (('validate' in options) && ! options.validate)) {
      var properties = _.extend({}, this.defaults);
      properties[this.idAttribute] = null;
      _.each(_.keys(attrs), function(key) {
        if ( ! (key in properties)) {
          delete attrs[key];
        }
      });
    }
    return Backbone.Model.prototype._validate.apply(this, [attrs, options]);
  };

  /**
   * Define a new subclass of <code>Model</code> with its own set of methods.
   *
   * @function
   * @return {Model}
   */
  Model.extend = Backbone.Model.extend;

  /**
   * The root for sync URLs.
   *
   * <p>You may want to override this if your back-end is not at <code>/</code>.</p>
   *
   * @field
   * @type {String}
   */
  Model.root = null;

  return Model;
});
