from webfiles import db 

class Viewers(db.model):
    id = db.Column(db.Integer, primary_key=True )
    UserName = db.Column(db.String(15), nullable=False, unique=True )
    UserEmail = db.Column(db.String, nullable=False, unique=True)
    PasswordHash = db.Column(db.String, nullable= False)
    Comments = db.relationship('Comment', backref='commenter', lazy=True)

    def __repr__(self):
        return f'<Viewers "{self.UserName}">'

class ContentCreators(db.model):
    id = db.Column(db.Integer, primary_key=True)
    FirstName = db.Column(db.String(20), nullable=False )
    SecondName = db.Column(db.String(20), nullable=False)
    creatorEmail = db.Column(db.String, nullable=False, unique=True)
    creatorPassword = db.Column(db.String, nullable=False)
    creations = db.relationship('Content', backref='creator', lazy =True)

    def __repr__(self):
        return f'<ContentCreators "{self.FirstName}">'

class Content(db.model):
    contentId = db.Column( db.Integer, primary_key= True, )
    genre = db.Column( db.String, nullable=False)
    creator_id  = db.Column( db.integer,db.ForeignKey('creator.id'), nullable= False )
    content= db.Column(db.Text, nullable=False )

    def __repr__(self):
        return f'<Content "{self.content[:20]}...">'

class Comment(db.model):
    id= db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.Text, nullable = False)
    comment_id = db.Column(db.Integer,db.ForeignKey('commenter.id'), nullable= False)

    def __repr__(self):
        return f'<Comment "{self.comment[:20]}...">'