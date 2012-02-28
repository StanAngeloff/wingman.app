define('Controller/Login', function(Controller, Form, Route) {
  function createForm() {
    return new Form('login')
      .control('email', {
        type: 'email',
        size: 20,
        required: true,
        autofocus: true
      })
      .control('password', {
        type: 'password',
        size: 10,
        required: true
      });
  };
  return Controller.extend({
    index: define(function(View_Login_Index) {
      new View_Login_Index().display({
        form: createForm()
      });
    }),
    process: function() {
      var params = this.request().params;
      if ( ! params) {
        return Route.get('Login#index', { navigate: false });
      }
      console.error('XXX: Not implement.');
      console.log(params);
    }
  });
});
