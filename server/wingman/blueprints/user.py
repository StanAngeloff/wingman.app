from flask import Blueprint, current_app, jsonify

user = Blueprint('user', __name__, url_prefix='/user')

@user.route('/<int:id>', methods=['GET'])
def get(id):
    return jsonify(message='user.get(%s)' % id)
