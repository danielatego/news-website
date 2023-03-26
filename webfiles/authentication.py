from functools import wraps

from flask import flash, redirect, url_for
from flask_login import current_user


def check_admin(func):
    @wraps(func)
    def admin_check(*args, **kwargs):
        if current_user.admin is not True:
            flash('Admin account required!', 'warning')
            return redirect(url_for('home_page'))
        return func(*args, **kwargs)

    return admin_check

def dict_content(objlist):
        result2 = [item.content_to_dict() for item in objlist]
        return result2

def dict_author(objlist):
        result2 = [item.author_to_dict() for item in objlist]
        return result2

def dict_comment(objlist):
        result2 = [item.comment_to_dict() for item in objlist]
        return result2
        