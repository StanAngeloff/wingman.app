from flask import g


def create_storage(app, type=None):
    if type is None:
        type = app.config['STORAGE_TYPE']
    klass = type.capitalize()
    module = __import__('%ss.%s' % (__name__, type), globals(), locals(), [klass], -1)
    _bind_storage(app, getattr(module, klass))

def _bind_storage(app, initialize):

    @app.before_request
    def before_request():
        g.storage = initialize(app)

    @app.teardown_request
    def teardown_request(response):
        if hasattr(g, 'storage'):
            del g.storage
        return response
