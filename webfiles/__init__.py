from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from webfiles.config import POST

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = POST


#db = SQLAlchemy(app)


from webfiles import routes