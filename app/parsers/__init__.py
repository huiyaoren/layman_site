from .block_market import *
from .daily import *
from .doller import *
from .future_weather import *
from .gold import *
from .weather import *

parsers = {
    'weather': Weather2345Parser,
    'gold': GoldIcbcParser,
    'dollar': DollarAnseoParser,
    'block-market': BlockMarketMifengchaParser,
    'future-weather': FutureWeatherOpenweathermapParser,
    'daily': DailyZhihuParser,
}


def parser_data(parser_name):
    name = parser_name.strip()
    Parser = parsers[name]
    p = Parser()
    return p['data']
