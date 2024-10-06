from extension import app, db

from src.database.models.AccountUsers import AccountUsers

def account_exists(email: str) -> bool:
	with app.app_context():
		return AccountUsers.query.filter_by(email=email).first() is not None
		

def create_new_user(first_name: str, last_name: str, email: str, password: str, salt: str, birthday: str):
	with app.app_context():
		new_user = AccountUsers(
			name=f"{first_name.strip()} {last_name.strip()}",
			email=email.strip(),
			password=password,
			salt=salt,
			birthday=birthday
		)
		db.session.add(new_user)
		db.session.commit()


def get_salt(email: str) -> str:
	with app.app_context():
		return AccountUsers.query.filter_by(email=email).first().salt


def login(email: str, password: str) -> bool:
	with app.app_context():
		return AccountUsers.query.filter_by(email=email, password=password).first() is not None