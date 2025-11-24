# routes/auth_routes.py
from flask import Blueprint, render_template, request, session, redirect, url_for
from services.auth_service import login_user, register_user
from repositories.user_repository import get_user_by_email

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/", methods=["GET"])
def home():
    return render_template("index.html")


# NUEVA: página de login
@auth_bp.route("/login-page", methods=["GET"])
def login_page():
    return render_template("login.html")


@auth_bp.route("/login", methods=["POST"])
def login():
    email = request.form["email"]
    password = request.form["password"]

    user = login_user(email, password)

    if user is not None:
        # user = (id, name, surnames, email)
        session["email"] = user[3]
        session["name"] = user[1]
        session["surnames"] = user[2]
        return redirect(url_for("auth.home"))  # o a tu página principal ESTO****
    else:
        return render_template("login.html", message="Las credenciales no son correctas")

@auth_bp.route("/new-user", methods=["POST"])
def new_user():
    name = request.form["name"]
    surnames = request.form["surnames"]
    email = request.form["email"]
    password = request.form["password"]


    if not (name and surnames and email and password):
        return render_template("login.html", message="Completa todos los campos del registro")

    # Verificar si el correo ya existe
    existing = get_user_by_email(email)
    if existing:
        return render_template("login.html", message="Este correo ya está registrado")

    # Registrar en la BD
    register_user(name, surnames, email, password)

    # Volver al login con mensaje de éxito
    return render_template("login.html", message="Cuenta creada, ahora puedes iniciar sesión")


@auth_bp.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("auth.home"))

