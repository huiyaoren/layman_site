import json
import sys

from flask import render_template, current_app

from . import main
from app.parsers import weatherParser, goldParser, bitcoinParser, BlockMarket, Dolloar, BlockMarketJson


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


@main.route('/home/btc_balance')
def btc_balance():
    sys.path.append(current_app.config['ADDITIONAL_PATH'])
    import virtual_coin

    doller_price = float(Dolloar()['data']['美元/人民币(中间价)'])
    block_market = BlockMarketJson()['data']
    print(doller_price)
    print(block_market)

    virtual_coin.current_market = {
        'BCH': 0,
        'XRP': 0,
        'BTM': 0,
        'EOS': 0,
        'ADA': 0,
        'BTC': 0,
        'ETC': 0,
        'ETH': 0,
        'IOST': 0,
        'HT': 0,
    }

    for currency in virtual_coin.current_market:
        if block_market.get(currency) is None:
            continue
        virtual_coin.current_market[currency] = round(doller_price * float(block_market[currency]['price']), 2)

    block = BlockMarket()
    print(block['data'])

    return json.dumps(virtual_coin.main())
