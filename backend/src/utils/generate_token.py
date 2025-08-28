import jwt
import time
import os
from dotenv import load_dotenv

def generate_token(user_id):
    load_dotenv()
    SECRET_KEY = os.getenv('SECRET_KEY_TOKEN')

    payload = {
        'sub': user_id,
        'iat': int(time.time()),
        'exp': int(time.time() + 86400)
    }

    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

    return token

