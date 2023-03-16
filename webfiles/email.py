from flask_mail import Message
from webfiles import app, mail

def send_mail(to, subject, template):
    msg = Message(
        subject,
        recipients=[to],
        html= template,
        sender=app.config['MAIL_DEFAULT_SENDER']
        #print(sender)
    )
    mail.send(msg)
# <!--
# <div class="row row-cols-1 row-cols-md-4 g-4">
#     {%for content in collection%}
    
#     <div class="col">
#       <div class="card h-100">
#         <img src="{{url_for('static', filename = content.image)}}" class="object-fit-fill border rounded card-img-top" loading="lazy"alt="...">
#         <div class="card-body">
#           <h5 class="card-title">{{content.title}}</h5>
#           <p class="card-text">{{content.introduction}}</p>
#           <a href="{{ url_for('render_page',id = content.id)}}" class="btn btn-primary">Read Article</a>
#         </div>
#         <div class="card-footer">
#           <small class="text-muted">Last updated 3 mins ago</small>
#         </div>
#       </div>
#     </div>
#     {%endfor%}
#   </div>
# -->