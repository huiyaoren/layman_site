from .parsers import *
from .html import *
from .json import *


def parser_data(parser_name):
    name = parser_name.strip()
    parser = getattr(parserGroup, '{0}Parser'.format(name), {})
    return parser['data']


class ParserGroup():
    def __init__(self):
        self.weatherParser = Weather()
        self.goldParser = Gold()
        self.bitcoinParser = Bitcoin()
        self.blockMarketParser = BlockMarketJson()
        self.dollarParser = Dollar()
        self.futureWeatherParser = FutureWeather()
        self.zhihuDailyParser = ZhihuDaily()


parserGroup = ParserGroup()