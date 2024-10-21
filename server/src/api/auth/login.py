from . import auth_bp
from flask import request, jsonify
from http import HTTPStatus

from src.api.auth.utils.security import encrypt_password
from src.database.wrapper import authentication

@auth_bp.route('/login', methods=['POST'])
def login():
	"""
	Performs the login into the system
	"""
	payload = request.json

	account_exists = authentication.account_exists(payload['email'])

	if not account_exists:
		return jsonify({ 'error': 'Account does not exist' }), HTTPStatus.UNAUTHORIZED

	salt = authentication.get_salt(payload['email'])
	password, _ = encrypt_password(payload['password'], salt)

	user = authentication.login(payload['email'], password)
	
	if user is None:
		return jsonify({ 'error': 'Invalid password' }), HTTPStatus.UNAUTHORIZED
	
	authentication.update_last_login(user)
	
	return jsonify({
		'success': True,
		'info': {
			'account_id': user.id,
			'username': user.username,
			'name': user.firstName + ' ' + user.lastName,
			'birthday': user.birthday,
			'gender': user.gender.value,
			'profile_image': user.profileImage
		}
	}), HTTPStatus.OK