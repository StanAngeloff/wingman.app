define('Controller/Login', function(Controller, I18n) {
  return Controller.extend({
    initialize: function() {
      console.log(I18n.format('DEBUG: Controller/Login initialized.'));
    },
    index: define(function(View_Login_Index) {
      new View_Login_Index().render({
        message: 'Hello World'
      });
    })
  });
});
