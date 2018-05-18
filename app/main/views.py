import json
import sys

from flask import render_template, current_app

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


@main.route('/test')
def btc_balance():
    sys.path.append(current_app.config['ADDITIONAL_PATH'])
    import virtual_coin
    virtual_coin.current_market = {
        'BCH': 8459,
        'XRP': 4.42,
        'BTM': 4.20,
        'EOS': 81.79,
        'ADA': 1.60,
        'BTC': 54241.18,
        'ETC': 115.18,
        'ETH': 4509.62,
        'IOST': 0.35,
    }
    return json.dumps(virtual_coin.main())
