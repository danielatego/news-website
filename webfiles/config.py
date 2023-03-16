from dotenv import load_dotenv
load_dotenv()
import os


pg_type = os.environ.get('DB_TYPE')
pg_user = os.environ.get('DB_USER')
pg_pass = os.environ.get('DB_PASS')
pg_db = os.environ.get('DB_NAME')
pg_host = os.environ.get('DB_HOST')
pg_port = os.environ.get('DB_PORT')

POST =  f'{pg_type}://{pg_user}:{pg_pass}@{pg_host}:{pg_port}/{pg_db}'
class BaseConfig(object):
    pg_type = os.environ.get('DB_TYPE')
    pg_user = os.environ.get('DB_USER')
    pg_pass = os.environ.get('DB_PASS')
    pg_db = os.environ.get('DB_NAME')
    pg_host = os.environ.get('DB_HOST')
    pg_port = os.environ.get('DB_PORT')

    POST =  f'{pg_type}://{pg_user}:{pg_pass}@{pg_host}:{pg_port}/{pg_db}'
    """Base configuration"""
    # main config
    SECRET_KEY = '18a3d27ad0e4cf629dcbe64dba98862c28b177e82ecce02739e49a23953d9196'
    SECURITY_PASSWORD_SALT = 'Jesus Christ is the name above all names'
    DEBUG = False
    BCRYPT_LOG_ROUNDS = 13
    WTF_CSRF_ENABLED = True
    DEBUG_TB__ENABLED = False
    DEBUG_TB_INTERCEPT_REDIRECTS = False
    SQLALCHEMY_DATABASE_URI = POST
    #mail settings 
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_SERVER = 465
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True

    #gmail authentication
    MAIL_USERNAME = os.environ.get('APP_MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('APP_MAIL_PASSWORD')
    
    #mail accounts
    MAIL_DEFAULT_SENDER = 'jonathanmurunga254@gmail.com'#os.environ.get('APP_DEFAULT_EMAIL')




pg_type = os.environ.get('DB_TYPE')
pg_user = os.environ.get('DB_USER')
pg_pass = os.environ.get('DB_PASS')
pg_db = os.environ.get('DB_NAME')
pg_host = os.environ.get('DB_HOST')
pg_port = os.environ.get('DB_PORT')

POST =  f'{pg_type}://{pg_user}:{pg_pass}@{pg_host}:{pg_port}/{pg_db}'

