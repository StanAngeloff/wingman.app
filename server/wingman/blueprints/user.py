from ..decorators import create, retrieve
from flask import Blueprint, jsonify


user = Blueprint('user', __name__, url_prefix='/user')

@create(user, '')
def create():
    return jsonify(message='user.create()')

@retrieve(user, '/<int:id>')
def get(id):
    return jsonify(message='user.get(%s)' % id)
