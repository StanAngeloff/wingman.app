define('Controller/Login', function(Controller, Route) {
  return Controller.extend({
    index: define(function(View_Login_Index) {
      new View_Login_Index().render();
    }),
    process: function() {
      var params = this.request().params;
      if ( ! params) {
        return Route.get('Login#index');
      }
      console.error('XXX: Not implement.');
      console.log(params);
    }
  });
});
