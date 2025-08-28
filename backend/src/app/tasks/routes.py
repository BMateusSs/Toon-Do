from . import tasks_bp
from flask import request, jsonify
from backend.src.utils.token_required import token_required
from backend.src.database.selections.tasks.home import total_projects, projects

@tasks_bp.route('/home', methods=['GET'])
@token_required
def home(user_id):
    total_proj = total_projects(user_id)
    recent_projects = projects(user_id)
    
    response = {
        'total_projects': total_proj,
        'recent_projects': recent_projects
    }

    return jsonify(response)