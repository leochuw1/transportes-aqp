# repositories/user_repository.py
from db import mysql

def get_user_by_email_and_password(email, password):
    cur = mysql.connection.cursor()
    cur.execute(
        "SELECT id, name, surnames, email FROM users "
        "WHERE email = %s AND password = %s",
        (email, password)
    )
    user = cur.fetchone()
    cur.close()
    return user

def create_user(name, surnames, email, password):
    cur = mysql.connection.cursor()
    sql = "INSERT INTO users (name, surnames, email, password) VALUES (%s, %s, %s, %s)"
    data = (name, surnames, email, password)
    cur.execute(sql, data)
    mysql.connection.commit()
    cur.close()

def get_user_by_email(email):
    cur = mysql.connection.cursor()
    cur.execute(
        "SELECT id, name, surnames, email FROM users WHERE email = %s",
        (email,)
    )
    user = cur.fetchone()
    cur.close()
    return user