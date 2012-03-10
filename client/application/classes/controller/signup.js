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
        return this._process(this.request().params, form);
      }
      this._displayForm(form);
    },
    _process: function(params, form) {
      var self = this,
          loading = require('View/Loading'),
          values, options;
      form.values(params, { exclude: false });
      loading.begin();
      values = form.values();
      var model = new (require('Model/User'));
      model.save(_.extend(values, {
        password: require('Security').hashPassword(values.password)
      }))
        .always(function() {
          loading.end();
        }).then(function() {
          console.error("XXX: 'success' not implemented.");
        }, function(model, request) {
          options = { failure: request.responseText };
        }).always(function() {
          self._displayForm(form, options);
        });
    },
    _displayForm: function(form, options) {
      new (require('View/SignUp/Index'))().display(_.extend({
        form: form
      }, options));
    }
  });
});
