from backend.src.database.connection import connection
from backend.src.utils.password_hash import check_login

def validate_login(credential, password):
    conn = connection()
    cursor = conn.cursor()

    try:
        query = '''
        SELECT
            id,
            password_hash
        FROM 
            users
        WHERE
            username = %s OR email = %s
        '''
        cursor.execute(query, (credential, credential))
        response = cursor.fetchone()

        if response is None:
            return False, 'Usuário/e-mail não encontrado.'
        
        user_id = response[0]
        password_db = response[1]
        isValidPassword = check_login(password, password_db)

        if isValidPassword:
            return True, user_id
    finally:
        cursor.close()
        conn.close()
        
    return False, 'Senha incorreta.'

