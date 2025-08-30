from backend.src.database.connection import connection

def register_user(conn, cursor,name, username, email, password):

    query = '''
    INSERT INTO users(user_name, username, email, password_hash)
    VALUES (%s, %s, %s, %s)
    '''
    cursor.execute(query, (name, username, email, password))
    conn.commit()
