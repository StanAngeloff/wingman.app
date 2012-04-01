define('view/login/index', ['route', 'view/default'], function(Route, ViewDefault) {
  return ViewDefault.extend({
    template: 'login/index',
    events: {
      'click .signup': 'goToSignUp',
      'submit form': 'processLogin'
    },
    goToSignUp: function(event) {
      event.preventDefault();
      Route.get('signup#index');
    },
    processLogin: function(event) {
      event.preventDefault();
      Route.post('login#index', this.$('form').serialize());
    }
  });
});
