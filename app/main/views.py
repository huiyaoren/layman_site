from flask import render_template

from . import main
from app.home_center import weatherParser, goldParser, bitcoinParser

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/home_center')
@main.route('/homecenter')
def home_center():
    weather = weatherParser['data']
    gold = goldParser['data']
    bitcoin = bitcoinParser['data']
    return render_template('home_center.html', **locals())