from flask import Flask
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from webfiles.config import BaseConfig ,POST
from flask_login import LoginManager
from flask_mail import Mail
from flask_migrate import Migrate
import psycopg2,os

UPLOAD_FOLDER = 'webfiles/static'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'jonathanmurunga254@gmail.com'
app.config['MAIL_PASSWORD'] = 'jbasnmqhjagdmblr'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['ALLOWED_EXTENSIONS']= ALLOWED_EXTENSIONS
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SQLALCHEMY_DATABASE_URI'] = POST
app.config['SECRET_KEY'] = '6e703fb7e48a1dac0851844f'
app.config['SECURITY_PASSWORD_SALT'] = 'Jesus name above every other else'
app.config['SECURITY_PASSWORD_SALT1'] = 'DESIRES BEFORE KNOWLEDGE IS WRONG HOW MUCH MORE WILL HASTY FEET MISS THE WAY.'
mail = Mail(app)
bcrypt = Bcrypt(app)
login_manager= LoginManager(app)
login_manager.login_view = "login_page"
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from webfiles import routes, models