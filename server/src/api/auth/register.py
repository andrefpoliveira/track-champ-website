from . import auth_bp
import re
from flask import request, jsonify
from http import HTTPStatus

from src.api.auth.utils.security import encrypt_password
from src.database.models.GenderEnum import match_gender
from src.database.wrapper import authentication
from src.validator.validator import Validator

@auth_bp.route('/register', methods=['POST'])
def register():
	"""
	Performs the registration into the app
	"""
	payload = request.json

	for k, v in payload.items():
		snake_case_key = re.sub(r'(?<!^)(?=[A-Z])', '_', k).lower()
		verifier = getattr(Validator, snake_case_key)
		valid, message = verifier(v)

		if not valid:
			return { 'error': message, 'field': k }, HTTPStatus.BAD_REQUEST

	password, salt = encrypt_password(payload['password'])

	if (authentication.account_exists(payload['email'])):
		return jsonify({ 'error': 'Este email já tem uma conta associada.', 'field': 'email' }), HTTPStatus.CONFLICT
	
	authentication.create_new_user(
		first_name=payload['firstName'],
		last_name=payload['lastName'],
		email=payload['email'],
		password=password,
		salt=salt,
		birthday=payload['birthday'],
		gender=match_gender(payload['gender'])
	)
	
	return jsonify({ 'success': True }), HTTPStatus.CREATED