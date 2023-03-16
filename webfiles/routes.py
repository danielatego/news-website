from webfiles import app,db
from sqlalchemy import desc
from flask_mail import Message
from webfiles import app, mail
from webfiles.email import send_mail
import os,json
from flask import render_template,url_for,flash,request, redirect
from webfiles.forms import CreatorregForm,ContentForm,ViewerregForm,LoginForm
from webfiles.models import Creators, Content,Subscriber
from webfiles.token import generate_confirmation_token,confirm_token
from datetime import datetime
from flask_login import login_required ,login_user,logout_user,current_user
from werkzeug.utils import secure_filename
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

@app.route('/')
def home_page():
    contents = Content.query.order_by(desc('contentreg')).limit(10)
    # if contents:
    #     contents={'id': contents.id,}
        

    return render_template ('homepage.html',contents = contents)

@app.route('/creatorregistration', methods=['POST','GET'])
def creatorregister_page():
    form = CreatorregForm()
    if form.validate_on_submit():
        creator_to_add = Creators(user_name=form.username.data,
                                  first_name=form.first_name.data,
                                  second_name= form.second_name.data,
                                  creator_email=form.creator_email.data,
                                  creator_password=form.password1.data,
                                  confirmed=False,)
                                  #creatorreg= datetime.now())
        db.session.add(creator_to_add)
        db.session.commit()
        token = generate_confirmation_token(creator_to_add.creator_email)
        print(token)
        confirm_url= url_for('confirm_email',token = token, _external =True)
        html = render_template('activate.html',confirm_url=confirm_url)
        subject = 'Please confirm your email'
        msg = Message(subject=subject, recipients = [creator_to_add.creator_email],html=html,sender = 'jonathanmurunga254@gmail.com', )
        #msg.body = "Hello Flask message sent from Flask-Mail"
        mail.send(msg)
        #send_mail(creator_to_add.creator_email, subject,html)
        login_user(creator_to_add)
        flash(f'Account created successfully! You are now logged in as: {creator_to_add.first_name}',category= 'success')
        return redirect(url_for('home_page'))
    if form.errors != {}:
        for err_msg in form.errors.values():
            flash(f'There was an error with creating a user:{err_msg}', category='danger')
    return render_template('creatorregistration.html', form = form)

@app.route('/viewerregistration', methods=['POST','GET'])
def viewerregister_page():
    form = ViewerregForm()
    if form.validate_on_submit():
        viewer_to_add = Subscriber(user_name=form.user_name.data,
                                user_email=form.user_email.data,
                                password_hash=form.password1.data,)
        db.session.add(viewer_to_add)
        db.session.commit()
        #login_user(creator_to_add)
        flash(f'Account created successfully! You are now logged in as: {viewer_to_add.user_name}',category= 'success')
        return redirect(url_for('home_page'))
    if form.errors != {}:
        for err_msg in form.errors.values():
            flash(f'There was an error with creating a user:{err_msg}', category='danger')
    return render_template('viewerregistration.html', form = form)

@app.route('/login', methods = ['GET','POST'])
def login_page():
    form = LoginForm()
    if form.validate_on_submit():
        attempted_user = Subscriber.query.filter_by(user_email=form.email_address.data).first()
        attempted_user1= Creators.query.filter_by(creator_email= form.email_address.data).first()
        if attempted_user and attempted_user.check_password_correction(attempted_password=form.password.data):
            login_user(attempted_user)
            flash(f'Success! You are logged in as: {attempted_user.user_name}',category='success')
            return redirect(url_for('home_page'))
        if attempted_user1 and attempted_user1.check_password_correction(attempted_password=form.password.data):
            login_user(attempted_user1)
            flash(f'Success! You are logged in as: {attempted_user1.user_name}',category='success')
            return redirect(url_for('home_page'))
        else:
            flash('Username and password are not match! Please try again', category='danger')

    return render_template('login.html', form=form)  
      
@app.route('/createcontent', methods = ['POST', 'GET'])
@login_required
def createcontent_page():
    form = ContentForm()
    if form.validate_on_submit():
        file = request.files['image']
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        content_to_add = Content(genre = form.genre.data,
                                 introduction = form.introduction.data,
                                 title = form.title.data,
                                 image = filename,
                                 creator_id = current_user.id,
                                 content = form.content.data,
                                 contentreg = datetime.now()) 
        db.session.add(content_to_add)
        db.session.commit()
        flash(f'Content Created successfully! ',category= 'success')
        return redirect(url_for('home_page'))
    if form.errors != {}:
        for err_msg in form.errors.values():
            flash(f'There was and error in creating content{err_msg}',category='danger')
    return render_template('contentcreation.html' ,form = form)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
@app.route('/confirm/<token>')
@login_required
def confirm_email(token):
    try:
        email=confirm_token(token)
    except:
        flash('The confirmation link is invalid or has expired.',category='danger')
    user = Creators.query.filter_by(creator_email= email).first()
    if user.confirmed:
        flash('Account already confirmed. Please login.',category='success')
    else:
        user.confirmed = True
        user.confirmed_on = datetime.now()
        db.session.add(user)
        db.session.commit()
        flash('You have confirmed your account. Thanks!', category='success' )
    return redirect(url_for('home_page'))

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        #print(request.__dict__)
        # print(request.files)
        # check if the post request has the file part
        if 'image' not in request.files:
            print('hello there1')
            flash('No image part')
            return redirect(request.url)
        file = request.files['image']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            my_information = {'file': {'url': f'webfiles/static/files/{filename}'} }
            jsonw = json.dumps(my_information)
            print(jsonw)
            return {
                "success" : 1,
                "file": {
                            "url" : f"/static/{filename}",
                        }
            }
@app.route('/render/<id>')
def render_page(id):
    content = Content.query.filter_by(id=id).first()
    return render_template('render.html',content=content)

def dict_helper(objlist):
        result2 = [item.obj_to_dict() for item in objlist]
        return result2

@app.route('/genre/<genre>')
def genre_page(genre):
    collection = Content.query.filter_by(genre=genre).order_by(desc('contentreg'))
    content_list_dict = dict_helper(collection)
    #print(content_list_dict)
    json_object=json.dumps(content_list_dict)
    #print(json_object)
    return render_template('genre.html' ,collection =json_object)

@app.route('/logout')
def logout_page():
    logout_user()
    flash("You have been logged out!", category='info')
    return redirect(url_for('home_page'))