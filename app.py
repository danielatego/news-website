from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home_page():
    render_template ('base.html')