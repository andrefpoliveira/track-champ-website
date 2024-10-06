from . import auth_bp
from flask import request, jsonify

from src.api.auth.utils.security import encrypt_password
from src.database.wrapper import authentication

@auth_bp.route('/register', methods=['POST'])
def register():
	payload = request.json
	password, salt = encrypt_password(payload['password'])

	if (authentication.account_exists(payload['email'])):
		return jsonify({ 'error': 'Account already exists' }), 400

	authentication.create_new_user(
		first_name=payload['firstName'],
		last_name=payload['lastName'],
		email=payload['email'],
		password=password,
		salt=salt,
		birthday=payload['birthday']
	)
	
	return jsonify({ 'success': True }), 200