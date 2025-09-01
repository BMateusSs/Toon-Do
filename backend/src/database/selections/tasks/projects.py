from backend.src.database.connection import connection

def all_projects(user_id, status):
    conn = connection()
    cursor = conn.cursor()

    havings = {
        'pending': 'CAST(SUM(t.completed) AS FLOAT) / COALESCE(COUNT(t.id), 1) = 0',
        'progress': 'CAST(SUM(t.completed) AS FLOAT) / COALESCE(COUNT(t.id), 1) > 0 '
                    'AND CAST(SUM(t.completed) AS FLOAT) / COALESCE(COUNT(t.id), 1) < 1',
        'finished': 'CAST(SUM(t.completed) AS FLOAT) / COALESCE(COUNT(t.id), 1) = 1'
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
            CAST(SUM(t.completed) AS FLOAT) / COALESCE(COUNT(t.id), 1) AS percent
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
