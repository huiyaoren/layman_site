import json

from flask import render_template

from . import main
from app.parsers import weatherParser, goldParser, bitcoinParser


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


@main.route('/home/<name>', methods=['GET'])
def home_data(name):
    if name == 'weather':
        data = weatherParser['data']
    elif name == 'bitcoin':
        data = bitcoinParser['data']
    elif name == 'gold':
        data = goldParser['data']
    else:
        data = {}
    return json.dumps(data)
