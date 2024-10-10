from typing import Tuple

import bcrypt
import secrets

def encrypt_password(password: str, salt: str = None) -> Tuple[str]:
	"""
	Generate a salt if needed and encrypt the password using it

	Parameters:
		password (str): The password introduced
		salt (str): The salt previously generated, if any

	Returns:
		(tuple): Password encrypted and the corresponding salt

	"""
	if salt is None:
		salt = bcrypt.gensalt(12)
	else:
		salt = bytes(salt, 'utf-8')
		
	return bytes.decode(bcrypt.hashpw(bytes(password, 'utf-8'), salt)), bytes.decode(salt)


def generate_verification_code(length: int) -> str:
	"""
	Generates a cryptographically secure x-digit verification code.

	Parameters:
		length (int): The length of the verification code

	Returns:
		(str): The verification code with size length
	"""
	return ''.join(str(secrets.choice(range(10))) for i in range(length))
