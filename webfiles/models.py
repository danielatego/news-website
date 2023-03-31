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
    liker = db.relationship('Likess', backref='likerr', lazy=True)
    viewerreg= db.Column(db.DateTime, index=True, default=datetime.utcnow)

    def __init__(self, user_name, user_email,
              password_hash):
        self.id = user_name
        self.user_name = user_name
        self.user_email = user_email
        self.password_hash= bcrypt.generate_password_hash(password_hash).decode('utf-8')
        #self.viewerreg = datetime.now()

    def check_password_correction(self, attempted_password):
        return bcrypt.check_password_hash(self.password_hash, attempted_password)
    
    
    def is_authenticated(self):
        return True
    
    def is_author(self):
        return False
    
    def is_subscriber(self):
        authentication = Subscriber.query.filter_by(id=self.id)
        if authentication:
            return True
        else:
            return False

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.user_name
    
    def __repr__(self):
        return f'<Subscriber "{self.user_name}">'

class Creators(db.Model):
    id = db.Column(db.String, primary_key=True)
    admin = db.Column(db.Boolean,default= False)
    user_name=db.Column(db.String,nullable=False, unique= True)
    first_name = db.Column(db.String(20), nullable=False )
    second_name = db.Column(db.String(20), nullable=False)
    about_yourself= db.Column(db.Text)
    visited_on = db.Column(db.DateTime, default=datetime.now)
    blocked =db.Column(db.Boolean, default= False)
    verified = db.Column(db.Boolean, default= False)
    verified_date = db.Column(db.DateTime)
    creator_email = db.Column(db.String, nullable=False, unique=True)
    creator_password = db.Column(db.String, nullable=False)
    like_content = db.relationship('Likess', backref='alikerr', lazy=True)
    reply_comments = db.relationship('Comment',backref='acommenter', lazy=True)
    creations = db.relationship('Content', backref='creator', lazy =True)
    creatorreg = db.Column(db.DateTime,index=True, default=datetime.utcnow)
    confirmed = db.Column(db.Boolean, nullable=False, default=False)
    confirmed_on = db.Column(db.DateTime)

    def __init__(self, user_name, first_name, second_name, about,creator_email,
              creator_password,confirmed=False, confirmed_on=None, visited_on= None):
        self.id = user_name
        self.user_name = user_name
        self.first_name = first_name
        self.second_name = second_name
        self.about_yourself = about
        self.creator_email = creator_email
        self.creator_password= bcrypt.generate_password_hash(creator_password).decode('utf-8')
        self.visited_on = visited_on
        self.blocked= confirmed
        self.confirmed = confirmed
        self.admin = confirmed
        self.confirmed_on = confirmed_on
        self.verified = confirmed
        self.verified_date = confirmed_on
        
    @property
    def status(self):
        if self.blocked is not True:
            return 'active'
        else:
            return 'blocked'
        
    def is_subscriber(self):
        return False
    
    def is_author(self):
        authentication = Creators.query.filter_by(id=self.id)
        if authentication:
            print('riba1')
            return True
        else:
            print('riba')
            return False
        
    def author_to_dict(self):  # for build json format
        return {
            "id": self.id,
            "first_name":self.first_name,
            "second_name":self.second_name,
            "username": self.user_name,
            "email": self.creator_email,
            "applicationdate": str(self.confirmed_on.date()),
            "about": self.about_yourself,
            "block": self.blocked
        }
    
    def notification(self):
        return Content.query.filter(Content.contentreg>self.visited_on).count() 
    
    def commentNotification(self):
        return Comment.query.filter(Comment.commentreg>self.visited_on).filter(Comment.creator_co == self.id).count()
    
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
    views = db.Column(db.Integer,default=0)
    likes = db.Column(db.Integer,default=0)
    introduction =db.Column(db.String, nullable=False)
    title =db.Column(db.String, nullable=False)
    image=db.Column(db.String, nullable=False)
    authorized = db.Column(db.Boolean, nullable=False,default=False)
    genre = db.Column( db.String, nullable=False)
    creator_id = db.Column( db.String,db.ForeignKey('creators.id'))
    content= db.Column(db.Text, nullable=False )
    comment = db.relationship('Comment', backref='comments', lazy =True)
    liked = db.relationship('Likess', backref='likedd', lazy=True)
    contentreg = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    # def __repr__(self):
    #     return f'<Content "{self.introduction[:20]}...">'
    def content_to_dict(self):  # for build json format
        return {
            "id": self.id,
            "introduction": self.introduction,
            "title": self.title,
            "image": self.image,
            "genre": self.genre,
            "contentreg": str(self.contentreg.date()),
            "views": self.viewsEdit(),
            "likes": self.likesEdit(),
            "verified": self.authorized
        }

    def viewsEdit(self):
        t = self.views
        if t < 1000:
            return t
        elif t >= 1000 and t < 1000000:
            t=int(t/1000)
            return f'{t}k'
        elif t >= 1000000:
            t=int(t/1000000)
            return f'{t}m'
        
    def likesEdit(self):
        t = self.likes
        if t < 1000:
            return t
        elif t >= 1000 and t < 1000000:
            t=int(t/1000)
            return f'{t}k'
        elif t >= 1000000:
            t=int(t/1000000)
            return f'{t}m'
        
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
    content_id = db.Column(db.Integer,db.ForeignKey('content.id'))
    author_id = db.Column(db.String,db.ForeignKey('creators.id'))
    subscriber_id= db.Column(db.String,db.ForeignKey('subscriber.id'))
    commentreg = db.Column(db.DateTime, index=True, default=datetime.now)
    creator_co =db.Column(db.String)
    
    def __init__(self,comment,content_id, author_id,subscriber_id):
        self.comment=comment
        self.content_id=content_id
        self.author_id=author_id
        self.subscriber_id=subscriber_id
        self.creator_co = self.creator_con()

    def creator_con(self):
        creator= Content.query.filter(Content.id==self.content_id).first()
        return creator.creator_id
        
        

    def comment_to_dict(self):
        user= Creators.query.filter(Creators.id==self.author_id).first()
        if not user:
            return {
                "name": self.commenter.user_name,
                "time": self.time_comment_creation(),
                "comment": self.comment,
                "content":self.content_id
            }
        else:
            return {
                "name": self.acommenter.first_name,
                "time": self.time_comment_creation(),
                "comment": self.comment,
                "content":self.content_id
            }

    def __repr__(self):
        return f'<Comment "{self.comment[:20]}...">'
    
    def time_comment_creation(self):
        t1 = datetime.now()
        t2 = self.commentreg
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
            return str(t2.date)
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
        
class Likess(db.Model):
    like_id=db.Column(db.Integer,primary_key= True)
    like_state= db.Column(db.Boolean, default=False)
    liked_id = db.Column(db.Integer, db.ForeignKey('content.id'),nullable=False)
    liker_id = db.Column(db.String, db.ForeignKey('subscriber.id'))
    aliker_id= db.Column(db.String, db.ForeignKey('creators.id'))
    likereg=db.Column(db.DateTime, index=True, default=datetime.now)

class Viewed_pages(db.Model):
    id = db.Column(db.Integer,primary_key = True)
    viewer_id = db.Column(db.String, nullable=False)
    Viewed_page = db.Column(db.Integer, nullable=False)
    viewreg=db.Column(db.DateTime, default=datetime.now)