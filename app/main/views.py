import json
import sys

import logging
from flask import render_template, current_app

from . import main
from app.parsers import parser_data, parsers

logger = logging.getLogger(__name__)


@main.route('/game')
def index():
    return render_template('index.html')


@main.route('/')
@main.route('/home')
def home_center():
    return render_template('home_center.html')


@main.route('/home/<name>', methods=['GET'])
def home_data(name):
    return json.dumps(parser_data(name))


@main.route('/home/future_weather')
def future_weather():
    data = parser_data('futureWeather')
    return render_template('home/futureWeather.html', **locals())


@main.route('/home/zhihu_daily')
def zhihu_daily():
    data = parser_data('zhihuDaily')
    return json.dumps({
        'view': render_template('home/zhihuDaily.html', **locals()),
        'data': data,
    })


@main.route('/home/my_balance')
def btc_balance():
    return json.dumps(parser_data('blockMarket'))

