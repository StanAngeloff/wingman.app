define('view/engine/handlebars', ['handlebars', 'view/engine'],
/**
 * A <code>View</code> engine based on Handlebars.js.
 *
 * @requires module:handlebars
 * @requires module:view/engine
 * @exports view/engine/handlebars
 * @see http://handlebarsjs.com/
 */
function(Handlebars, ViewEngine) {
  "use strict";
  var __cache = {};
  return ViewEngine.extend({
    compile: function(template, contents) {
      if ( ! (template in __cache)) {
        __cache[template] = Handlebars.compile(contents);
      }
      return __cache[template];
    },
    partial: function() {
      return Handlebars.registerPartial.apply(Handlebars, arguments);
    }
  });
});
