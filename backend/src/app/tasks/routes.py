from . import tasks_bp
from flask import request, jsonify
from backend.src.utils.token_required import token_required
from backend.src.database.selections.tasks.home import total_projects, projects, tasks_today, habits_today
from backend.src.database.selections.tasks.projects import all_projects, get_projects_tasks
from backend.src.database.insertions.updates import update_habit_status, update_task_status
from backend.src.database.insertions.create import create_task

@tasks_bp.route('/home', methods=['GET'])
@token_required
def home(user_id):
    total_proj = total_projects(user_id)
    recent_projects = projects(user_id)
    tasks = tasks_today(user_id)
    habits = habits_today(user_id)
    
    response = {
        'total_projects': total_proj,
        'recent_projects': recent_projects,
        'tasks_today': tasks,
        'habits_today': habits
    }

    return jsonify(response)

@tasks_bp.route('/update_active_habits', methods=['POST'])
@token_required
def update_habit(user_id):
    data = request.get_json()
    habit_id = data.get('habit_id')
    status = data.get('status')

    response = update_habit_status(user_id, habit_id, status)

    if response:
        return jsonify({'message': 'tudo certo'}), 200
    
    return jsonify({'error': 'erro'}), 500

@tasks_bp.route('/all_projects', methods=['GET'])
@token_required
def projects_page(user_id):

    pending = all_projects(user_id, 'pending')
    progress = all_projects(user_id, 'progress')
    finished = all_projects(user_id, 'finished')

    response = {
        'pending': pending,
        'progress': progress,
        'finished': finished
    }

    return jsonify(response)

@tasks_bp.route('/projects_tasks', methods=['POST'])
@token_required
def projects_tasks(user_id):
    data = request.get_json()
    proj_id = data.get('proj_id')

    pending = get_projects_tasks(user_id, proj_id, 'pending')
    progress = get_projects_tasks(user_id, proj_id, 'progress')
    finished = get_projects_tasks(user_id, proj_id, 'finished')

    response = {
        'pending': pending,
        'progress': progress,
        'finished': finished
    }

    return jsonify(response)

@tasks_bp.route('/update_task_status', methods=['POST'])
@token_required
def update_task(user_id):
    data = request.get_json()
    task_id = data.get('task_id')
    status = data.get('status')

    response = update_task_status(user_id, task_id, status)

    if response:
        return jsonify({'message': 'tudo certo'}), 200
    
    return jsonify({'error': 'erro'}), 500

@tasks_bp.route('/create_task', methods=['POST'])
@token_required
def create_news_tasks(user_id):
    data = request.get_json()
    proj_id = data.get('proj_id')
    description = data.get('description')
    status = data.get('status')
    limit_date = data.get('limit_date')

    status, message = create_task(user_id, proj_id, description, status, limit_date)

    if status:
        return jsonify({'message': message}), 200
    
    return jsonify({'error': message}), 500