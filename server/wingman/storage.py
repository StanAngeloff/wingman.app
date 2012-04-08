from flask import g


class StorageError(Exception):
    pass


class Storage:
    pass


def create_storage(app, type=None):
    if type is None:
        type = app.config['STORAGE_TYPE']
    klass = type.capitalize()
    module = __import__('%ss.%s' % (__name__, type), globals(), locals(), [klass], -1)
    _bind_storage(app, getattr(module, klass))

def _bind_storage(app, initialize):

    @app.before_request
    def before_request():
        storage = initialize(app)
        if not isinstance(storage, Storage):
            raise StorageError("A storage instance was initialized which does not implemented the base 'Storage' class.")
        g.storage = storage

    @app.teardown_request
    def teardown_request(response):
        if hasattr(g, 'storage'):
            del g.storage
        return response
