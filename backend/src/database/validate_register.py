from backend.src.database.connection import connection
from backend.src.utils.password_hash import password_hash
from backend.src.database.insertions.auth.register_user import register_user

def validate_register(username, email, password):
    conn = None
    cursor = None

    try:
        conn = connection()
        cursor = conn.cursor()

        isValidUsername = is_valid_username(cursor, username)
        if not isValidUsername:
            return False, 'Nome de usuário já em uso'
        
        isValidEmail = is_valid_email(cursor, email)
        if not isValidEmail:
            return False, 'Email já em uso'

        hashed_password = password_hash(password)
        response = register_user(conn, cursor, username, email, hashed_password)

        return True, response
    
    except Exception as e:
        return False, str(e)
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
            
    return True, None

def is_valid_username(cursor, username):
    query = 'SELECT 1 FROM users WHERE username = %s'
    cursor.execute(query, (username,))
    response = cursor.fetchone()
    return response is None

def is_valid_email(cursor, email):
    query = 'SELECT 1 FROM users WHERE email = %s'
    cursor.execute(query, (email,))
    response = cursor.fetchone()
    return response is None
