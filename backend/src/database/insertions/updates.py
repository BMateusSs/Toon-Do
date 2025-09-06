from backend.src.database.connection import connection

def update_habit_status(user_id, habit_id, status):
    conn = connection()
    cursor = conn.cursor()

    try: 
        query = '''
        UPDATE habits
        SET is_active = %s
        WHERE user_id = %s AND id = %s
        '''

        cursor.execute(query, (status, user_id, habit_id))
        conn.commit() 

        return True
    
    except Exception as e:
        print(f"Erro ao atualizar hábito: {e}")
        return False
    finally:
        cursor.close()
        conn.close()

def update_task_status(user_id, task_id, status):
    conn = connection()
    cursor = conn.cursor()

    try: 
        query = '''
        UPDATE tasks t
        LEFT JOIN projects p
        ON t.proj_id = p.id
        SET t.status = %s
        WHERE t.id = %s AND p.user_id = %s
        '''

        cursor.execute(query, (status, task_id, user_id))
        conn.commit()
        return True

    except Exception as e:
        print(f"Erro ao atualizar hábito: {e}")
        return False
    finally:
        cursor.close()
        conn.close()