define('Controller/Login', function(Controller, Form, Route) {
  function createForm() {
    return new Form('login')
      .control('email', {
        type: 'email',
        size: 20,
        required: true,
        autofocus: true
      })
      .control('password', {
        type: 'password',
        size: 10,
        required: true
      });
  };
  return Controller.extend({
    index: function() {
      var form = createForm();
      if (this.request().method === 'POST') {
        this._process(this.request().params, form);
      }
      new (require('View/Login/Index'))().display({
        form: form
      });
    },
    _process: function(params, form) {
      form.values(params);
      console.error(form);
      console.error('XXX: Not implement.');
    }
  });
});
