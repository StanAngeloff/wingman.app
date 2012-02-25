define('Controller/Login', function(Controller) {
  return Controller.extend({
    index: define(function(View_Login_Index) {
      return new View_Login_Index();
    })
  });
});
