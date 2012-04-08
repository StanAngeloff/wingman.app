from .blueprints.user import user
from .storage import create_storage
from flask import Flask, abort, jsonify, request


def create_app(config_filepath=None, import_name=None):
    if import_name is None:
        import_name = __name__
    app = Flask(import_name, instance_relative_config=True)
    _configure_app(app, config_filepath, import_name)
    _jsonify_app(app)
    _install_error_handlers(app)
    _register_blueprints(app)
    create_storage(app)
    return app

def _configure_app(app, config_filepath, import_name):
    app.config.from_object('%s.default_settings' % import_name)
    if config_filepath is not None:
        app.config.from_pyfile(config_filepath)
    app.config.from_envvar(('%s_SETTINGS' % import_name.upper()), silent=True)

def _jsonify_app(app):

    @app.before_request
    def before_request():
        if request.method != 'OPTIONS' and request.json is None:
            abort(400)

    @app.after_request
    def after_request(response):
        response.headers['Content-Type'] = app.config['DEFAULT_MIME_TYPE']
        return response

def _install_error_handlers(app):
    known_errors = [
        (400, u'The request could not be understood by the server due to malformed syntax.'),
        (404, u'The server has not found anything matching the Request-URI.'),
        (500, u'The server encountered an unexpected condition which prevented it from fulfilling the request. Please try again and if the issue persists, contact the administrator for assistance.'),
    ]
    def make_error_handler(code, message):
        @app.errorhandler(code)
        def error_handler(error):
            response = jsonify({ 'code': code, 'message': message })
            response.status_code = code
            return response
        return error_handler
    for code, message in known_errors:
        make_error_handler(code, message)

def _register_blueprints(app):
    app.register_blueprint(user)



