from ..decorators import create, retrieve
from flask import Blueprint, g, jsonify, request


user = Blueprint('user', __name__, url_prefix='/user')

@create(user, '')
def create():
    g.storage.create('user', **request.json)
    return jsonify(message=u'user.create()')

@retrieve(user, '/<int:id>')
def get(id):
    return jsonify(message=u'user.get(%s)' % id)
