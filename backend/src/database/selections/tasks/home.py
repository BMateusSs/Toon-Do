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
            p.title
        FROM
            projects p
        WHERE
            p.user_id = %s;
        ORDER BY updated_at DESC
        LIMIT 5
        '''
        cursor.execute(query, (user_id,))
        data = cursor.fetchall()

        response = []
        for project in data:
            response.append({
                'id': project[0],
                'title': project[1]
            })

        return response
    finally:
        cursor.close()
        conn.close()

print(projects(1))