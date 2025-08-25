from flask import jsonify, request
from . import auth_bp
from backend.src.database.validate_register import validate_register

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not all([username, email, password]):
        return jsonify({'Erro': 'Dados imcompleto'}), 400

    status, message = validate_register(username, email, password)

    if status:
        return jsonify({'message': 'Usuário registrado com sucesso'}), 201
    else:
        return jsonify({'error': message}), 409
    
