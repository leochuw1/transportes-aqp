# services/task_service.py
from datetime import datetime
from repositories.task_repository import (
    get_tasks_by_email,
    create_task,
    delete_task,
)

def list_user_tasks(email):
    return get_tasks_by_email(email)

def create_new_task(email, title, description):
    d = datetime.now()
    date_task = d.strftime("%Y-%m-%d %H:%M:%S")  # corregido el formato
    create_task(email, title, description, date_task)

def delete_user_task(task_id):
    delete_task(task_id)
