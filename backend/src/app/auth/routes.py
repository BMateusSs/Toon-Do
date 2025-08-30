from flask import jsonify, request
from . import auth_bp
from backend.src.database.validate_register import validate_register
from backend.src.database.validate_login import validate_login
from backend.src.utils.generate_token import generate_token

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not all([username, email, password]):
        return jsonify({'Erro': 'Dados imcompleto'}), 400

    status, message = validate_register(name, username, email, password)

    if status:
        return jsonify({'message': 'Usuário registrado com sucesso'}), 201
    else:
        return jsonify({'error': message}), 409
    
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    credential = data.get('credential')
    password = data.get('password')

    status, content = validate_login(credential, password)

    if status:
        user_id = content
        token = generate_token(user_id)
        return jsonify({'token': token}), 200
    else:
        return jsonify({'error': 'Credenciais inválidas.'}), 404