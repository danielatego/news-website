from flask_wtf import FlaskForm
from flask_wtf.file import FileRequired,FileAllowed
from wtforms import StringField, PasswordField, SubmitField, SelectField, HiddenField,FileField,TextAreaField
from wtforms.validators import Length, EqualTo, Email,DataRequired,ValidationError
from webfiles.models import Creators, Subscriber
from webfiles import app

class CreatorregForm(FlaskForm):
    def validate_username(self, username_to_check):
       user =Creators.query.filter_by(user_name=username_to_check.data).first()
       user2= Subscriber.query.filter_by(user_name=username_to_check.data).first()
       if (user or user2):
           raise ValidationError('Username already exists! Please try a different username')
    
    def validate_creator_email(self, email_address_to_check):
        email_address=Creators.query.filter_by(creator_email=email_address_to_check.data).first()
        email_address1=Subscriber.query.filter_by(user_email=email_address_to_check.data).first()
        if (email_address or email_address1):
            raise ValidationError('Email Address already exists! Please try another Email Address.')
    first_name = StringField(label='First Name',id='first', validators=[Length(min=2, max=30),
                                                                         DataRequired('First name is required')])
    second_name = StringField(label='Second Name',id='second', validators=[Length(min=2, max=30),
                                                                            DataRequired('Second name is required')])
    username = StringField(label='User Name', validators=[Length(min=2, max=30),
                                                           DataRequired('User name is required')])
    about_yourself = TextAreaField(label='About Yourself',validators=[
                                                            DataRequired('A brief Introduction of yourself is required')])
    creator_email = StringField(label='Email Address', validators= [Email(),
                                                                     DataRequired('Email address is required')])
    password1 = PasswordField(label='Password', validators=[Length(min=6),
                                                             DataRequired('Password is required')])
    password2 = PasswordField(label='Confirm Password', 
                                                validators=[EqualTo('password1',message='Passwords are not the same'),
                                                            DataRequired('Confirmation password is required')])
    submit = SubmitField(label='Create Account',id='username')

class ContentForm(FlaskForm):

    title = StringField(label='Article Title', validators=[DataRequired('Title of the article is required'),
                                                           Length(min=4,max=100,message='Brief and captivating title')])
    genre = SelectField(label='Genre of your article',validators=[DataRequired('Genre of the article is required')],
                                                            choices=[('News'),
                                                            ('Technology'), ('Travelling'),('Celebrities'),
                                                            ('Beauty and Lifestyle'),('Mental Health'),
                                                            ('Food and Beverages'),('Flowers')])
    introduction = TextAreaField(label='Brief Introduction',validators=[Length(min=20, max=100),
                                                            DataRequired('Introduction of the article is required')])
    image        = FileField(label='Article Image Icon',validators =[FileRequired('Article image icon is required'),
                                                            FileAllowed(app.config['ALLOWED_EXTENSIONS'],'Only images')])
    content =HiddenField(label='Content',validators=[DataRequired('Content was not saved or is empty')],id='content')
    post = SubmitField(label='Post')

class CommentForm(FlaskForm):
    comment= TextAreaField(label='Comment',validators=[Length(max=200),DataRequired('Comment field is empty')])
    post = SubmitField(label='Comment')
    
class EditSaveForm(FlaskForm):
    content =HiddenField(label='Content',validators=[DataRequired('Content was not saved or is empty')],id='content')
    post = SubmitField(label='Post')

class LoginForm(FlaskForm):
    email_address = StringField(label='email address', validators=[DataRequired('Email address is required')])
    password = PasswordField(label='Password', validators=[DataRequired('Password is required')])
    submit = SubmitField(label='Sign in')
    
class ViewerregForm(FlaskForm):
    def validate_user_name(self, username_to_check):
       user =Creators.query.filter_by(user_name=username_to_check.data).first()
       user2= Subscriber.query.filter_by(user_name=username_to_check.data).first()
       if (user or user2):
           raise ValidationError('Username already exists! Please try a different username')
    
    def validate_user_email(self, email_address_to_check):
        email_address=Creators.query.filter_by(creator_email=email_address_to_check.data).first()
        email_address1=Subscriber.query.filter_by(user_email=email_address_to_check.data).first()
        if (email_address or email_address1):
            raise ValidationError('Email Address already exists! Please try another Email Address.')
        
    user_name = StringField(label='User Name', validators=[Length(min=2, max=30), DataRequired('user name is required')])
    user_email = StringField(label='Email Address', validators= [Email(message='You have entered an invalid email'),
                                                                DataRequired('Email is required')])
    password1 = PasswordField(label='Password', validators=[Length(min=6), DataRequired('Password is required')])
    password2 = PasswordField(label='Confirm Password', validators=[EqualTo('password1','Passwords are not the same'),
                                                                     DataRequired('Confirmation password is required')])
    submit = SubmitField(label='Create Account')