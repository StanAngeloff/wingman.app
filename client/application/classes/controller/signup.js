define('Controller/SignUp', function(Controller, Form) {
  function createForm() {
    return new Form('signup')
      .control('email', {
        type: 'email',
        size: 20,
        required: true,
        autofocus: true
      })
      .control('password', {
        type: 'password',
        size: 10,
        required: true,
        minlegth: 6
      })
      .control('password2', {
        type: 'password',
        size: 10,
        required: true,
        minlegth: 6
      });
  };
  return Controller.extend({
    index: function() {
      var form = createForm();
      if (this.request().method === 'POST') {
        this._process(this.request().params, form);
      }
      define(function(View_SignUp_Index) {
        new View_SignUp_Index().display({
          form: form
        });
      })();
    },
    _process: function(params, form) {
      form.values(params);
      console.error(form);
      console.error('XXX: Not implement.');
    }
  });
});
