# routes/task_routes.py
from flask import Blueprint, render_template, request, session, redirect, url_for
from services.task_service import list_user_tasks, create_new_task, delete_user_task

tasks_bp = Blueprint("tasks", __name__)

@tasks_bp.route("/tasks", methods=["GET"])
def list_tasks():
    email = session.get("email")
    if not email:
        return redirect(url_for("auth.home"))

    tasks = list_user_tasks(email)
    return render_template("tasks.html", tasks=tasks)

@tasks_bp.route("/new-task", methods=["POST"])
def new_task():
    email = session.get("email")
    if not email:
        return redirect(url_for("auth.home"))

    title = request.form["title"]
    description = request.form["description"]

    if title and description:
        create_new_task(email, title, description)

    return redirect(url_for("tasks.list_tasks"))

@tasks_bp.route("/delete-task", methods=["POST"])
def delete_task():
    email = session.get("email")
    if not email:
        return redirect(url_for("auth.home"))

    task_id = request.form["id"]
    delete_user_task(task_id)
    return redirect(url_for("tasks.list_tasks"))
