(function() {

<!--#include file="system/modules/core/functions.js" -->

<!--#include file="system/modules/core/classes/controller.js" -->
<!--#include file="system/modules/core/classes/exception.js" -->
<!--#include file="system/modules/core/classes/guard.js" -->
<!--#include file="system/modules/core/classes/i18n.js" -->
<!--#include file="system/modules/core/classes/route.js" -->

<!--#include file="application/classes/controller/login.js" -->

define(['Controller/Login', 'Route'], function(ControllerLogin, Route) {
  Route
    .match(false, { controller: ControllerLogin, action: 'index' })
    .find();
});

}).call(this.Wingman = {});
