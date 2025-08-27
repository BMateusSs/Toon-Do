import bcrypt

def password_hash(password):
    salt = bcrypt.gensalt()

    password = password.encode('utf-8')

    hashed_password = bcrypt.hashpw(password, salt)

    return hashed_password

def check_login(password_login, password_db):

    password_login_byte = password_login.encode('utf-8')
    
    if isinstance(password_db, str):
        password_db_byte = password_db.encode('utf-8')
    else:
        password_db_byte = password_db
        
    if bcrypt.checkpw(password_login_byte, password_db_byte):
        print("Login bem-sucedido!")
        return True
    else:
        print("Senha incorreta.")
        return False
    