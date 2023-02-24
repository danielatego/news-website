from dotenv import load_dotenv
load_dotenv()
import os

pg_type = os.environ.get('DB_TYPE')
pg_user = os.environ.get('DB_USERNAME')
pg_pass = os.environ.get('DB_PASS')
pg_db = os.environ.get('DB_NAME')
pg_host = os.environ.get('DB_HOST')
pg_port = os.environ.get('DB_PORT')
print (pg_user)
print (pg_port)
POST = f'{pg_type}://{pg_user}:{pg_pass}@{pg_host}:{pg_port}/{pg_db}'
