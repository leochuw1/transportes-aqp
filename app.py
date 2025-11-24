# app.py
from flask import Flask
import config
from db import init_app as init_db
from routes.auth_routes import auth_bp
from routes.task_routes import tasks_bp

def create_app():
    app = Flask(__name__)

    # Configuración de Flask y MySQL (desde config.py)
    app.config["SECRET_KEY"] = config.HEX_SEC_KEY
    app.config["MYSQL_HOST"] = config.MYSQL_HOST
    app.config["MYSQL_USER"] = config.MYSQL_USER
    app.config["MYSQL_PASSWORD"] = config.MYSQL_PASSWORD
    app.config["MYSQL_DB"] = config.MYSQL_DB
    app.config["MYSQL_PORT"] = config.MYSQL_PORT

    # Inicializar MySQL
    init_db(app)

    # Registrar blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(tasks_bp)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
