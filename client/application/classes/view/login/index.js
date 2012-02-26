define('View/Login/Index', function(Route, View_Default) {
  return View_Default.extend({
    template: 'login/index',
    events: {
      'click #signup': 'getSignUp',
      'click #continue': 'postLogin'
    },
    getSignUp: function(event) {
      event.preventDefault();
      Route.get('SignUp#index');
    },
    postLogin: function(event) {
      event.preventDefault();
      console.error('XXX: Not implemented.');
    }
  });
});
