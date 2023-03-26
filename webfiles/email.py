from flask_mail import Message
from webfiles import app, mail

def send_mail(to, subject, template):
    msg = Message(
        subject,
        recipients=[to],
        html= template,
        sender=app.config['MAIL_USERNAME']
    )
    mail.send(msg)
