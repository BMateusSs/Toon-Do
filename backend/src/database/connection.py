import mysql.connector
from mysql.connector import errorcode
from backend.config import Config

def connection():
    config = Config()
    conn = None
    try:
        conn = mysql.connector.connect(
            host=config.DB_HOST,
            user=config.DB_USER,
            password=config.DB_PASSWORD,
            database=config.DB_NAME
        )
        print("Conexão com o banco de dados bem sucedida")
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Erro: nome de usuário ou senha incorretos")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Erro: o banco de dados não existe")
        else:
            print(f"Erro inesperado: {err}")
    return conn
