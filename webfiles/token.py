from itsdangerous import URLSafeTimedSerializer
from webfiles import app

def generate_confirmation_token(email):
    serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])
    return serializer.dumps(email, salt=app.config['SECURITY_PASSWORD_SALT'])

def generate_passwordChange_token(email):
    serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])
    return serializer.dumps(email, salt=app.config['SECURITY_PASSWORD_SALT1'])

def confirm_token(token, expiration=(3600*24)):
    serializer =URLSafeTimedSerializer(app.config['SECRET_KEY'])
    try:
        email= serializer.loads(
            token,
            salt=app.config['SECURITY_PASSWORD_SALT'],
            max_age=expiration
        )
    except:
        return False
    return email

def confirm_token_password(token, expiration=(3600*24)):
    serializer =URLSafeTimedSerializer(app.config['SECRET_KEY'])
    try:
        email= serializer.loads(
            token,
            salt=app.config['SECURITY_PASSWORD_SALT1'],
            max_age=expiration
        )
    except:
        return False
    return email