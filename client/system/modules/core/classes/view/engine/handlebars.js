define('View/Engine/Handlebars',
/**
 * A <code>View</code> engine based on Handlebars.js.
 *
 * @requires module:View/Engine
 * @exports View/Engine/Handlebars
 * @see http://handlebarsjs.com/
 */
function(View_Engine) {
  var __cache = {};
  return View_Engine.extend({
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
