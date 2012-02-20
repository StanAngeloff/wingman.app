(function() {

<!--#include file="system/modules/core/functions.js" -->

<!--#include file="system/modules/core/classes/controller.js" -->
<!--#include file="system/modules/core/classes/error.js" -->
<!--#include file="system/modules/core/classes/guard.js" -->
<!--#include file="system/modules/core/classes/i18n.js" -->
<!--#include file="system/modules/core/classes/route.js" -->

<!--#include file="application/classes/controller/login.js" -->

define(function(Route) {
  Route
    .match(false, { controller: 'Login', action: 'index' })
    .find();
})();

}).call(this.Wingman = {});
