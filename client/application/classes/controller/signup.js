define('Controller/SignUp', function(Controller) {
  return Controller.extend({
    index: define(function(View_SignUp_Index) {
      new View_SignUp_Index().render();
    })
  });
});
