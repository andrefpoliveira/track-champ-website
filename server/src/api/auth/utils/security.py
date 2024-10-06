import bcrypt

def encrypt_password(password: str, salt: str = None) -> tuple:
	if salt is None:
		salt = bcrypt.gensalt(12)
	else:
		salt = bytes(salt, 'utf-8')
		
	return bytes.decode(bcrypt.hashpw(bytes(password, 'utf-8'), salt)), bytes.decode(salt)