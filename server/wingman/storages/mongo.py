from ..storage import Storage, StorageError
from pymongo import Connection


class Mongo(Storage):
    def __init__(self, app):
        self._connection = Connection(host=self._config(app, 'host', '127.0.0.1'), port=self._config(app, 'port', 27017))
        self._db = self._connection[self._config(app, 'dbname')]
        auth = (self._config(app, 'username'), self._config(app, 'password'))
        if all(auth):
            if not self._db.authenticate(*auth):
                raise StorageError('Failed to authenticate against configured storage.')

    def __del__(self):
        self._connection.disconnect()

    def _config(self, app, property, default=None):
        key = ('%s_%s' % (self.__class__.__name__.upper(), property.upper()))
        if key in app.config:
            return app.config[key]
        return default

    def create(self, *args, **kwargs):
        [collection] = args
        return self._db[collection].insert(kwargs)
