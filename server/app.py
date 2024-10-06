from extension import app, db

from src.api.auth import auth_bp

from src.database.models.AccountUsers import AccountUsers

with app.app_context():
	db.create_all()

app.register_blueprint(auth_bp, url_prefix='/auth')

if __name__ == "__main__":
	app.run()