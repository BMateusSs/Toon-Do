from . import tasks_bp
from flask import request, jsonify
from backend.src.utils.token_required import token_required
from backend.src.database.selections.tasks.home import total_projects, projects, tasks_today, habits_today
from backend.src.database.selections.tasks.projects import all_projects
from backend.src.database.insertions.updates import update_habit_status

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
    data = request.get_json()

    pending = all_projects(user_id, 'pending')
    progress = all_projects(user_id, 'progress')
    finished = all_projects(user_id, 'finished')

    response = {
        'pending': pending,
        'progress': progress,
        'finished': finished
    }

    return jsonify(response)

