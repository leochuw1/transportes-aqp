# repositories/task_repository.py
from db import mysql

def get_tasks_by_email(email):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM tasks WHERE email = %s", (email,))
    rows = cur.fetchall()

    # transformar a lista de dicts
    column_names = [column[0] for column in cur.description]
    tasks = [dict(zip(column_names, row)) for row in rows]

    cur.close()
    return tasks

def create_task(email, title, description, date_task):
    cur = mysql.connection.cursor()
    sql = "INSERT INTO tasks (email, title, description, date_task) VALUES (%s, %s, %s, %s)"
    data = (email, title, description, date_task)
    cur.execute(sql, data)
    mysql.connection.commit()
    cur.close()

def delete_task(task_id):
    cur = mysql.connection.cursor()
    sql = "DELETE FROM tasks WHERE id = %s"
    cur.execute(sql, (task_id,))
    mysql.connection.commit()
    cur.close()
