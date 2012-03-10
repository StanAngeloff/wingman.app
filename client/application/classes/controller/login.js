define('Controller/Login', function(Controller, Form, Model, QueryString, Route) {
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
        return this._process(this.request().params, form);
      }
      this._displayForm(form);
    },
    _process: function(params, form) {
      var self = this,
          loading = require('View/Loading'), values, options;
      form.values(params, { exclude: false });
      loading.begin();
      values = form.values();
      values.password = 'XXX: ********';
      Model.sync('read', new (require('Model/User')), {
        data: $.param(values)
      })
        .always(function() {
          loading.end();
        }).then(function() {
          console.error("XXX: 'success' not implemented.");
        }, function(request) {
          options = { failure: request.responseText };
        }).always(function() {
          self._displayForm(form, options);
        });
    },
    _displayForm: function(form, options) {
      new (require('View/Login/Index'))().display(_.extend({
        form: form
      }, options));
    }
  });
});
