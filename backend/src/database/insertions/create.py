from backend.src.database.connection import connection

def create_task(user_id, proj_id, description, status, limit_date):
    conn = connection()
    cursor = conn.cursor()

    try:
        query = '''
        INSERT INTO tasks(proj_id, description_task, limit_date, status)
        VALUES(%s, %s, %s, %s)
        '''
        cursor.execute(query, (proj_id, description, limit_date, status))
        conn.commit()

        return True, 'Tarefa criada com sucesso.'
    
    except Exception as e:
        
        return False, f'{e}'
    finally:
        cursor.close()
        conn.close()
    

