import jwt
from functools import wraps
from flask import request, jsonify
import os
from dotenv import load_dotenv

load_dotenv()
SECRET_KEY = os.getenv('SECRET_KEY_TOKEN')

def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Token de autenticação ausente ou inválido.'}), 401
        
        token = auth_header.split(' ')[1]

        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            user_id = payload.get('sub')

            if not user_id:
                return jsonify({'error': 'ID do usuário não encontrado no token.'}), 401
            
            kwargs['user_id'] = user_id

        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token expirado. Faça login novamente.'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Token inválido.'}), 401
        except Exception:
            return jsonify({'error': 'Erro desconhecido.'}), 500
        
        return f(*args, **kwargs)
    
    return decorated_function