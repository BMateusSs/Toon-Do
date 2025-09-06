from backend.src.database.connection import connection

def all_projects(user_id, status):
    conn = connection()
    cursor = conn.cursor()

    havings = {
        'pending': "SUM(t.status = 'finished') / COALESCE(COUNT(t.id), 1) = 0",
        'progress': "SUM(t.status = 'finished') / COALESCE(COUNT(t.id), 1) > 0 "
                    "AND SUM(t.status = 'finished') / COALESCE(COUNT(t.id), 1) < 1",
        'finished': "SUM(t.status = 'finished') / COALESCE(COUNT(t.id), 1) = 1"
    }

    try:
        if status not in havings:
            return [] 

        having_condition = havings[status]
        
        query = f'''
        SELECT
            p.id,
            p.title,
            p.color,
            COUNT(t.proj_id),
            CAST(SUM(t.status = 'finished') AS FLOAT) / COALESCE(COUNT(t.id), 1) AS percent
        FROM
            projects p
        LEFT JOIN
            tasks t ON p.id = t.proj_id
        WHERE
            user_id = %s
        GROUP BY
            p.id, p.title, p.color
        HAVING {having_condition}
        '''
        
        cursor.execute(query, (user_id,))
        projects = cursor.fetchall()

        data = []
        for project in projects:
            data.append({
                'proj_id': project[0],
                'title': project[1],
                'color': project[2],
                'tasks': project[3],
                'percent': int(project[4] * 100)
            })

        return data
    finally:
        cursor.close()
        conn.close()

def get_projects_tasks(user_id, proj_id, status):
    conn = connection()
    cursor = conn.cursor()

    try:
        query = '''
        SELECT
            t.id,
            t.proj_id,
            t.description_task,
            t.limit_date,
            t.color,
            t.status
        FROM
            projects p
        LEFT JOIN
            tasks t
        ON
            p.id = t.proj_id
        WHERE 
            t.proj_id = %s AND p.user_id = %s AND status = %s;
        '''
        cursor.execute(query, (proj_id, user_id, status,))
        tasks = cursor.fetchall()

        data = []
        for task in tasks:
            data.append({
                'id': task[0],
                'proj_id': task[1],
                'description': task[2],
                'limit_date': task[3],
                'color': task[4],
                'status': task[5]
            })
        return data

    finally:
        cursor.close()
        conn.close()
