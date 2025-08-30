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
            p.color,
            COUNT(t.proj_id) AS total_task,
            CAST(SUM(t.completed) AS FLOAT) / COALESCE(COUNT(t.id), 1) AS percent,
            DATEDIFF(p.limit_date, CURDATE()) AS days_remaining
        FROM
            projects p
        LEFT JOIN
            tasks t
        ON p.id = t.proj_id
        WHERE
            p.user_id = %s
        GROUP BY p.id
        ORDER BY p.updated_at DESC
        LIMIT 5;
        '''
        cursor.execute(query, (user_id,))
        data = cursor.fetchall()

        response = []
        for project in data:
            percent = project[4] * 100
            response.append({
                'id': project[0],
                'title': project[1],
                'color': project[2],
                'total_task': project[3],
                'percent': int(percent),
                'days_remaining': project[5]
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

def habits_today(user_id):
    conn = connection()
    cursor = conn.cursor()

    try:
        query = '''
            SELECT id, name, type, image_url FROM habits WHERE user_id = %s AND is_active = 1 ORDER BY created_at ASC;
        '''
        cursor.execute(query, (user_id,))
        tasks = cursor.fetchall()

        response = []
        for task in tasks:
            response.append({
                'habit_id': task[0],
                'name': task[1],
                'type': task[2],
                'image': task[3]
            })
        return response
    
    except:
        cursor.close()
        conn.close()

print(habits_today(1))