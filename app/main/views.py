import json
import sys

from flask import render_template, current_app

from . import main
from app.parsers import parserGroup, parser_data


@main.route('/')
def index():
    return render_template('index.html')


@main.route('/home_center')
@main.route('/home')
def home_center():
    return render_template('home_center.html')


@main.route('/home/<name>', methods=['GET'])
def home_data(name):
    name = name.strip()
    parser = getattr(parserGroup, '{0}Parser'.format(name), {})
    data = parser['data']
    return json.dumps(data)


@main.route('/home/btc_balance')
def btc_balance():
    sys.path.append(current_app.config['ADDITIONAL_PATH'])
    import virtual_coin

    dollar_price = float(parser_data('dollar')['美元/人民币(中间价)'])
    block_market = parser_data('blockMarket')
    print(dollar_price)
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
        virtual_coin.current_market[currency] = round(dollar_price * float(block_market[currency]['price']), 2)

    return json.dumps(virtual_coin.main())
