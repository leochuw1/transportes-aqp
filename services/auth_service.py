# services/auth_service.py
from repositories.user_repository import (
    get_user_by_email_and_password,
    create_user,
)

def login_user(email, password):
    """
    Devuelve el usuario si las credenciales son correctas,
    o None si no lo son.
    """
    return get_user_by_email_and_password(email, password)

def register_user(name, surnames, email, password):
    """
    Crea un usuario nuevo. Podrías agregar validaciones aquí.
    """
    create_user(name, surnames, email, password)
