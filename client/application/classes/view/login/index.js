define('View/Login/Index', function(View_Default) {
  return View_Default.extend({
    template: 'login/index',
    events: {
      'click #continue': 'postLogin'
    },
    postLogin: function(event) {
      event.preventDefault();
      console.error('XXX: Not implemented.');
    }
  });
});
