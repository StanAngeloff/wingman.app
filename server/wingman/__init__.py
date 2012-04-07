from flask import Flask


def create_app(config_filepath=None, import_name=None):
    if import_name is None:
        import_name = __name__
    app = Flask(import_name, instance_relative_config=True)
    app.config.from_object('%s.default_settings' % import_name)
    if config_filepath is not None:
        app.config.from_pyfile(config_filepath)
    app.config.from_envvar(('%s_SETTINGS' % import_name.upper()), silent=True)

    @app.after_request
    def after_request(response):
        response.headers['Content-Type'] = app.config['DEFAULT_MIME_TYPE']
        return response

    from .blueprints.user import user

    app.register_blueprint(user)

    return app

