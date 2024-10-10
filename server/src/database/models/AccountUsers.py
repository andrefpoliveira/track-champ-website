from extension import db
from src.database.models.GenderEnum import GenderEnum

class AccountUsers(db.Model):
	__tablename__ = 'acc_users'

	id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	name = db.Column(db.String(100), nullable=False)
	email = db.Column(db.String(50), nullable=False, unique=True)
	password = db.Column(db.String(64), nullable=False)
	salt = db.Column(db.String(30), nullable=False)
	birthday = db.Column(db.Date, nullable=False)
	gender = db.Column(db.Enum(GenderEnum), nullable=False)
	profileImage = db.Column(db.String(50), nullable=True)

	def __repr__(self):
		return f'<AccountUsers {self.id} {self.name}>'