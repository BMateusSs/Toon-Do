from backend.src.database.connection import connection

def total_projects(user_id):
    conn = connection()
    cursor = conn.cursor()

    try: 
        query='''
        SELECT COUNT(*) FROM projects WHERE user_id = %s
        '''
        cursor.execute(query, (user_id,))
        data = cursor.fetchone()
        return data[0]
    finally:
        cursor.close()
        conn.close()

def projects(user_id):
    conn = connection()
    cursor = conn.cursor()

    try: 
        query='''
        SELECT
            p.id,
            p.title,
            p.color
        FROM
            projects p
        WHERE
            p.user_id = %s
        ORDER BY updated_at DESC
        LIMIT 5;
        '''
        cursor.execute(query, (user_id,))
        data = cursor.fetchall()

        response = []
        for project in data:
            response.append({
                'id': project[0],
                'title': project[1],
                'color': project[2]
            })

        return response
    finally:
        cursor.close()
        conn.close()

def tasks_today(user_id):
    conn = connection()
    cursor = conn.cursor()

    try:
        query = '''
        SELECT
            t.id AS task_id,
            t.title,
            t.description_task,
            t.color AS task_color,
            t.limit_date,
            p.id AS proj_id,
            p.color AS proj_color
        FROM
            projects p
        INNER JOIN
            tasks t ON p.id = t.proj_id
        WHERE
            p.user_id = %s AND t.limit_date = CURDATE()
        LIMIT 5;
        '''
        cursor.execute(query, (user_id,))
        tasks = cursor.fetchall()

        response = []
        for task in tasks:
            response.append({
                'task_id': task[0],
                'title': task[1],
                'description': task[2],
                'task_color': task[3],
                'limit_date': task[4],
                'proj_id': task[5],
                'proj_color': task[6]
            })
        return response
    
    except:
        cursor.close()
        conn.close()