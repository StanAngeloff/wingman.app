define('View/Login/Index', function(Route, View_Default) {
  return View_Default.extend({
    template: 'login/index',
    events: {
      'click .signup': 'goToSignUp',
      'submit form': 'processLogin'
    },
    goToSignUp: function(event) {
      event.preventDefault();
      Route.get('SignUp#index');
    },
    processLogin: function(event) {
      event.preventDefault();
      Route.post('Login#index', this.$('form').serialize());
    }
  });
});
