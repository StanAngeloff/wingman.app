from datetime import timedelta
from flask import make_response, request, current_app
from functools import update_wrapper


def _rest(blueprint, route, methods=None):
    def decorator(function):
        return blueprint.route(route, methods=methods)(
            crossdomain(origin='*', headers=['Content-Type'], methods=methods)(
                function
            )
        )
    return decorator

def create(*args):
    return _rest(*args, methods=['POST', 'OPTIONS'])

def retrieve(*args):
    return _rest(*args, methods=['GET', 'OPTIONS'])

def update(*args):
    return _rest(*args, methods=['PUT', 'OPTIONS'])

def delete(*args):
    return _rest(*args, methods=['DELETE', 'OPTIONS'])


# This snippet by Armin Ronacher can be used freely for anything you like.
# Consider it public domain.
# http://flask.pocoo.org/snippets/56/
def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator
