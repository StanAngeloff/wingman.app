define('Controller/Login', function(Controller) {
  return Controller.extend({
    index: define(function(View_Login_Index) {
      new View_Login_Index().render();
    })
  });
});
