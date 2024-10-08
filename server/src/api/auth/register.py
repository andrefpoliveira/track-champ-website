from . import auth_bp
import re
from flask import request, jsonify

from src.api.auth.utils.security import encrypt_password
from src.database.wrapper import authentication
from src.validator.validator import Validator

@auth_bp.route('/register', methods=['POST'])
def register():
	payload = request.json

	for k, v in payload.items():
		snake_case_key = re.sub(r'(?<!^)(?=[A-Z])', '_', k).lower()
		verifier = getattr(Validator, snake_case_key)
		valid, message = verifier(v)

		if not valid:
			return { 'error': message, 'field': k }, 400

	password, salt = encrypt_password(payload['password'])

	if (authentication.account_exists(payload['email'])):
		return jsonify({ 'error': 'Este email já tem uma conta associada.', 'field': 'email' }), 400
	

	authentication.create_new_user(
		first_name=payload['firstName'],
		last_name=payload['lastName'],
		email=payload['email'],
		password=password,
		salt=salt,
		birthday=payload['birthday']
	)
	
	return jsonify({ 'success': True }), 200