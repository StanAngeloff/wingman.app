define('View/Login/Index', function(Route, View_Default) {
  return View_Default.extend({
    template: 'login/index',
    events: {
      'click .signup': 'getSignUp',
      'submit form': 'postLogin'
    },
    getSignUp: function(event) {
      event.preventDefault();
      Route.get('SignUp#index');
    },
    postLogin: function(event) {
      event.preventDefault();
      Route.post('Login#index', this.$('form').serialize());
    }
  });
});
