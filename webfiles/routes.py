from webfiles import app
from flask import render_template

@app.route('/')
def home_page():
    return render_template ('homepage.html')