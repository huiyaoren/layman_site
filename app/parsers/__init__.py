from .parsers import *
from .html import *
from .json import *


def parser_data(parser_name):
    name = parser_name.strip()
    Parser = parsers[name]
    p = Parser()
    return p['data']


parsers = {
    'weather': Weather,
    'gold': Gold,
    'bitcoin': Bitcoin,
    'blockMarket': BlockMarketJson,
    'dollar': Dollar,
    'futureWeather': FutureWeather,
    'zhihuDaily': ZhihuDaily,
}
