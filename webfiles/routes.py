from webfiles import app,db
from sqlalchemy import desc
from flask_mail import Message
from webfiles import app, mail
from webfiles.email import send_mail
import os,json
from flask import render_template,url_for,flash,request, redirect
from webfiles.forms import CreatorregForm,ContentForm,ViewerregForm,LoginForm,EditSaveForm,CommentForm
from webfiles.models import Creators, Content,Subscriber,Comment,Likess
from webfiles.token import generate_confirmation_token,confirm_token
from datetime import datetime
from webfiles.authentication import check_admin,dict_author,dict_content,dict_comment,allowed_file
from flask_login import login_required ,login_user,logout_user,current_user
from werkzeug.utils import secure_filename


@app.route('/')
def home_page():
    contents = Content.query.order_by(desc('contentreg')).limit(10)
    return render_template ('homepage.html',contents = contents)

@app.route('/creatorregistration', methods=['POST','GET'])
def creatorregister_page():
    form = CreatorregForm()
    if form.validate_on_submit():
        creator_to_add = Creators(user_name=form.username.data,
                                  first_name=form.first_name.data,
                                  second_name= form.second_name.data,
                                  about=form.about_yourself.data,
                                  creator_email=form.creator_email.data,
                                  creator_password=form.password1.data,
                                  confirmed=False,)
        db.session.add(creator_to_add)
        db.session.commit()
        token = generate_confirmation_token(creator_to_add.creator_email)
        print(token)
        confirm_url= url_for('confirm_email',token = token, _external =True)
        html = render_template('activate.html',confirm_url=confirm_url)
        subject = 'Please confirm your email'
        send_mail(creator_to_add.creator_email, subject, html)
        flash(f'An email has been sent to you. Kindly confirm these account to proceed', category='info')
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

@app.route('/profile/<id>')
@login_required
def profile_page(id):
    user = Creators.query.filter_by(id = id).first()
    comments = Comment.query.filter(Comment.creator_co == id).order_by(desc('commentreg')).all()
    comment_dict= dict_comment(comments)
    comment_json=json.dumps(comment_dict)
    liked = Content.query.join(Likess, Content.id==Likess.liked_id).filter(Likess.aliker_id==id).order_by(desc(Likess.likereg)).all()
    liked_dict= dict_content(liked)
    liked_json=json.dumps(liked_dict)
    created=Content.query.join(Creators, Content.creator_id==Creators.id).filter(Creators.id==id).all()
    print(created)
    created_dict= dict_content(created)
    created_json=json.dumps(created_dict)
    return render_template('profile.html', user= user,comments=comment_json,liked=liked_json,created=created_json)

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

@app.route('/confirm/<token>')
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
        login_user(user)
        #flash('You have confirmed your account. Thanks!', category='success')
        flash(f'Your Account is successfully created and confirmed! You are now logged in as: {user.user_name}',category= 'success')
    return redirect(url_for('home_page'))

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        if 'image' not in request.files:
            print('hello there1')
            flash('No image part')
            return redirect(request.url)
        file = request.files['image']
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            my_information = {'file': {'url': f'webfiles/static/files/{filename}'} }
            return {
                "success" : 1,
                "file": {
                            "url" : f"/static/{filename}",
                        }
            }
        
@app.route('/render/<id>', methods=['GET', 'POST'])
def render_page(id):
    form= CommentForm()
    content = Content.query.filter_by(id=id).first()
    if current_user.is_authenticated:
        if current_user.is_author():
            likes= Likess.query.filter_by(liked_id= id).filter_by(aliker_id= current_user.id).first()
        else:
            likes= Likess.query.filter_by(liked_id= id).filter_by(liker_id= current_user.id).first()
    comments = Comment.query.filter_by(content_id = id).order_by(desc('commentreg')).all()
    comments_dict = dict_comment(comments)
    comment_json = json.dumps(comments_dict)
    if request.method == "POST":
        if current_user.is_subscriber():
            newComment = Comment(comment=form.comment.data,
                                content_id = request.form.get('article_id'),
                                subscriber_id = current_user.id,
                                author_id = None)
            db.session.add(newComment)
            db.session.commit()
        elif current_user.is_author():
            newComment = Comment(comment=form.comment.data,
                                content_id = request.form.get('article_id'),
                                author_id = current_user.id,
                                subscriber_id = None)
            db.session.add(newComment)
            db.session.commit()
        return redirect(url_for('render_page',id = id))
    if current_user.is_authenticated:
        return render_template('render.html',content=content, form=form,comment=comment_json,likes=likes )
    else:
        return render_template('render.html',content=content, form=form,comment=comment_json)

@app.route('/edit/<id>',methods=['POST','GET'])
def edit_page(id):
    form=EditSaveForm()
    content = Content.query.filter_by(id=id).first()
    if form.validate_on_submit():
        content.content = form.content.data
        content.contentreg = datetime.now()
        db.session.add(content)
        db.session.commit()
        flash(f'The edits have been saved successfully', category='')
        return redirect(url_for('message_page'))
    content = Content.query.filter_by(id=id).first()
    return render_template('edit.html',content=content,form= form)

@app.route('/genre/<genre>')
def genre_page(genre):
    collection = Content.query.filter_by(genre=genre).order_by(desc('contentreg'))
    content_list_dict = dict_content(collection)
    json_object=json.dumps(content_list_dict)
    return render_template('genre.html' ,collection =json_object)

@app.route('/like/<token1>/<token2>')
@login_required
def like_page(token1,token2):
    if token1=='like':
        if current_user.is_subscriber():
            like= Likess(like_state=True,
                        liked_id = token2,
                        liker_id=current_user.id)
            db.session.add(like)
            db.session.commit()
            
        elif current_user.is_author():
            like= Likess(like_state=True,
                        liked_id = token2,
                        aliker_id=current_user.id)
            db.session.add(like)
            db.session.commit()  
        contentLike= Content.query.filter(Content.id==token2).first()
        contentLike.likes += 1
        db.session.commit()
        return redirect(url_for('render_page',id = token2))
    elif token1=='unlike':
        unlike = Likess.query.filter_by(like_id = token2).first()
        db.session.delete(unlike)
        contentLike= Content.query.filter(Content.id==unlike.liked_id).first()
        contentLike.likes -= 1
        db.session.commit()
        return redirect(url_for('render_page',id = unlike.liked_id))
    
@app.route('/admin/<token1>/<token2>')
@login_required
@check_admin
def admin_functions(token1,token2):
    if token1=='edit':
        return redirect(url_for('edit_page',id=token2))
    elif token1=='delete':
        content= Content.query.filter_by(id=token2).first()
        db.session.delete(content)
        db.session.commit()
        flash(f'The article has been deleted successfully', category='danger')
        return redirect(url_for('message_page'))
    elif token1=='verify':
        content= Content.query.filter_by(id=token2).first()
        content.authorized = True
        db.session.add(content)
        db.session.commit()
        flash(f'The article has been verified successfully', category='success')
        return redirect(url_for('message_page'))
    elif token1=='Unverify':
        content= Content.query.filter_by(id=token2).first()
        content.authorized = False
        db.session.add(content)
        db.session.commit()
        flash(f'The article has been verified successfully', category='success')
        return redirect(url_for('message_page'))
    elif token1=='viewAuthor':
        return redirect(url_for('profile_page',id=token2))
    elif token1 == 'verifyAuthor':
        author=Creators.query.filter_by(id=token2).first()
        author.verified=True
        author.verified_date=datetime.now()
        db.session.add(author)
        db.session.commit()
        flash(f'{author.first_name} {author.second_name}  has been verified successfully', category='success')
        return redirect(url_for('message_page'))
    elif token1 == 'blockAuthor':
        author=Creators.query.filter_by(id=token2).first()
        author.blocked=True
        author.verified=False
        db.session.add(author)
        db.session.commit()
        flash(f'{author.first_name} {author.second_name} has been blocked', category='danger')
        return redirect(url_for('message_page'))
    elif token1 == 'unBlockAuthor':
        author=Creators.query.filter_by(id=token2).first()
        author.blocked=False
        db.session.add(author)
        db.session.commit()
        flash(f'{author.first_name} {author.second_name} has been unblocked', category='success')
        return redirect(url_for('message_page'))

@app.route('/messages')
@login_required
@check_admin
def message_page():
    last_visited = current_user.visited_on
    newmessage = Content.query.filter(Content.contentreg>last_visited).order_by(desc('contentreg'))
    newmessage_dict = dict_content(newmessage)
    newmessage_json = json.dumps(newmessage_dict)
    unverified = Content.query.filter(Content.authorized == False).order_by(desc('contentreg'))
    unverified_dict = dict_content(unverified)
    unverified_json = json.dumps(unverified_dict)
    verified = Content.query.filter(Content.authorized == True).order_by(desc('contentreg'))
    verified_dict = dict_content(verified)
    verified_json = json.dumps(verified_dict)
    newauthor = Creators.query.filter(Creators.creatorreg>last_visited).order_by(desc('creatorreg'))
    newauthor_dict = dict_author(newauthor)
    print(newauthor_dict)
    newauthor_json = json.dumps(newauthor_dict)
    unverifiedauthor = Creators.query.filter(Creators.verified==''or Creators.verified==False).order_by(desc('creatorreg'))
    unverifiedauthor_dict = dict_author(unverifiedauthor)
    unverifiedauthor_json = json.dumps(unverifiedauthor_dict)
    verifiedauthor = Creators.query.filter(Creators.verified==True).order_by(desc('creatorreg'))
    verifiedauthor_dict = dict_author(verifiedauthor)
    verifiedauthor_json = json.dumps(verifiedauthor_dict)


    current_user.visited_on = datetime.now()
    db.session.add(current_user)
    db.session.commit()
    return render_template('messages.html', newmessage=newmessage_json,newauthor=newauthor_json,
                                            unverified=unverified_json,unverifiedauthor=unverifiedauthor_json,
                                            verified= verified_json,verifiedauthor=verifiedauthor_json)

@app.route('/logout')
def logout_page():
    logout_user()
    flash("You have been logged out!", category='info')
    return redirect(url_for('home_page'))