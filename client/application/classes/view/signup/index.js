define('View/SignUp/Index', function(Route, View_Default) {
  return View_Default.extend({
    template: 'signup/index',
    events: {
      'click .cancel': 'getPrevious',
      'submit form': 'postSignUp'
    },
    getPrevious: function() {
      Route.previous();
    },
    postSignUp: function() {
      event.preventDefault();
      console.error('XXX: Not implemented.');
    }
  });
});
