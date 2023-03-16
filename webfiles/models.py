from webfiles import db , login_manager, bcrypt
from datetime import datetime

@login_manager.user_loader
def load_user(user_user_name):
    viewer = Subscriber.query.get((user_user_name))
    if viewer:
        return viewer
    else:
        return Creators.query.get((user_user_name))

class Subscriber(db.Model):
    id = db.Column(db.String, primary_key=True )
    user_name= db.Column(db.String(15), nullable=False, unique=True )
    user_email = db.Column(db.String, nullable=False, unique=True)
    password_hash = db.Column(db.String, nullable= False)
    comments = db.relationship('Comment', backref='commenter', lazy=True)
    viewerreg= db.Column(db.DateTime,nullable= False)

    def __init__(self, user_name, user_email,
              password_hash):
        self.id = user_name
        self.user_name = user_name
        self.user_email = user_email
        self.password_hash= bcrypt.generate_password_hash(password_hash).decode('utf-8')
        self.viewerreg = datetime.now()

    def check_password_correction(self, attempted_password):
        return bcrypt.check_password_hash(self.password_hash, attempted_password)
    
    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.user_name
    
    def __repr__(self):
        return f'<Subscriber "{self.UserName}">'

class Creators(db.Model):
    id = db.Column(db.String, primary_key=True)
    user_name=db.Column(db.String,nullable=False, unique= True)
    first_name = db.Column(db.String(20), nullable=False )
    second_name = db.Column(db.String(20), nullable=False)
    creator_email = db.Column(db.String, nullable=False, unique=True)
    creator_password = db.Column(db.String, nullable=False)
    creations = db.relationship('Content', backref='creator', lazy =True)
    creatorreg = db.Column(db.DateTime,nullable= False)
    confirmed = db.Column(db.Boolean, nullable=False, default=False)
    confirmed_on = db.Column(db.DateTime, nullable=True)

    def __init__(self, user_name, first_name, second_name, creator_email,
              creator_password,confirmed=False, confirmed_on=None):
        self.id = user_name
        self.user_name = user_name
        self.first_name = first_name
        self.second_name = second_name
        self.creator_email = creator_email
        self.creator_password= bcrypt.generate_password_hash(creator_password).decode('utf-8')
        self.creatorreg = datetime.now()
        self.confirmed = confirmed
        self.confirmed_on = confirmed_on

    def check_password_correction(self, attempted_password):
        return bcrypt.check_password_hash(self.creator_password, attempted_password)
    
    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.user_name

    def __repr__(self):
        return f'<ContentCreators "{self.first_name}">'

class Content(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    views = db.Column(db.Integer)
    likes = db.Column(db.Integer)
    introduction =db.Column(db.String, nullable=False)
    title =db.Column(db.String, nullable=False)
    image=db.Column(db.String, nullable=False)
    authorized = db.Column(db.Boolean, nullable=False,default=False)
    genre = db.Column( db.String, nullable=False)
    creator_id = db.Column( db.String,db.ForeignKey('creators.id'))
    content= db.Column(db.Text, nullable=False )
    contentreg = db.Column(db.DateTime,nullable= False)

    # def __repr__(self):
    #     return f'<Content "{self.introduction[:20]}...">'
    def obj_to_dict(self):  # for build json format
        return {
            "id": self.id,
            "introduction": self.introduction,
            "title": self.title,
            "image": self.image,
            "genre": self.genre,
            #"contentreg": self.contentreg,
        }
   
    @property
    def time_since_creation(self):
        t1 = datetime.now()
        t2 = self.contentreg
        t3= t1-t2
        t4 = t3.total_seconds()
        yrs = int(t4/(365*86400))
        mnth =int(t4/(30.4167*86400))
        days =int(t4/(86400))
        hrs= int(t4/3600)
        min=int(t4/60)
        if yrs == 1:
            return f'{yrs} year ago'
        elif yrs > 1:
            return f'{yrs} years ago'
        elif mnth == 1:
            return f'{mnth} month ago'
        elif mnth > 1:
            return f'{mnth} months' 
        elif days == 1:
            return f'{days} day ago'
        elif days > 1:
            return f'{days} days ago'
        elif hrs == 1:
            return f'{hrs} hour ago'
        elif hrs > 1:
            return f'{hrs} hours ago'
        elif min == 1:
            return f'{min} minute ago'
        elif min > 1:
            return f'{min} minutes ago'
        else:
            return 'now'


class Comment(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.Text, nullable=False)
    subscriber_id= db.Column(db.String,db.ForeignKey('subscriber.id'))
    commentreg = db.Column(db.DateTime,nullable= False)
    


    def __repr__(self):
        return f'<Comment "{self.comment[:20]}...">'