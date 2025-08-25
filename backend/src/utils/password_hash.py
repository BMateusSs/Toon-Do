import bcrypt

def password_hash(password):
    salt = bcrypt.gensalt()

    password = password.encode('utf-8')

    hashed_password = bcrypt.hashpw(password, salt)

    return hashed_password

