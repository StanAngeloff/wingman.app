define('Controller/Login', function(Controller, I18n) {
  return Controller.extend({
    index: define(function(View_Login_Index) {
      new View_Login_Index().render({
        message: 'Hello World'
      });
    })
  });
});
