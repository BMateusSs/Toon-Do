import jwt
import time
import os
from dotenv import load_dotenv

def generate_token(user_id):
    load_dotenv()
    SECRET_KEY = '507527193a6e369d6236297a20c2000c69c49a7e127babb7ddc9c6c4034f78e2'

    payload = {
        'sub': str(user_id),
        'iat': int(time.time()),
        'exp': int(time.time() + 86400)
    }

    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

    return token

