from backend.src.database.connection import connection

def register_user(conn, cursor, username, email, password):

    query = '''
    INSERT INTO users(username, email, password_hash)
    VALUES (%s, %s, %s)
    '''
    cursor.execute(query, (username, email, password))
    conn.commit()
