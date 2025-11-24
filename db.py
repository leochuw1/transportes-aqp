# db.py
from flask_mysqldb import MySQL

mysql = MySQL()

def init_app(app):
    """
    Inicializa la extensión MySQL con la app Flask.
    Se llama una sola vez desde app.py.
    """
    mysql.init_app(app)
