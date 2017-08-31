from flask import render_template

from . import main

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/home_center')
def home_center():
    return render_template('home_center.html')