from datetime import datetime

from .parsers import JsonParser


class Bitcoin(JsonParser):
    def set_config(self):
        self.url = 'https://www.btctrade.com/ajax/imtickerall'
        self.patterns = {
            'BTC 买入价(人民币)': 'data.ybct.buy',
            'BTC 卖出价(人民币)': 'data.ybct.sell',
        }

    def after_parse(self):
        btc_buy = float(self.data['BTC 买入价(人民币)'])
        btc_sell = float(self.data['BTC 卖出价(人民币)'])
        btc = 1 / ((btc_buy + btc_sell) / 2)
        self.data['BTC(人民币)'] = round(btc, 2)
        del self.data['BTC 买入价(人民币)']
        del self.data['BTC 卖出价(人民币)']


class BlockMarketJson(JsonParser):
    def set_config(self):
        self.url = 'https://block.cc/api/v1/coin/flow?size=700&orderby=-1'
        self.patterns = {
            'list': 'data.list',
        }

    def after_parse(self):
        _ = {}
        li = self.data
        for i in li['list']:
            _[i['symbol']] = i
        self.data = _


class FutureWeather(JsonParser):
    def set_config(self):
        self.url = 'http://api.openweathermap.org/data/2.5/forecast?q=fuzhou&APPID=db97196be09b5c80f170423ac3799431&mode=json&lang=zh_cn&units=metric'
        self.patterns = {
            'list': 'list',
        }

    def after_parse(self):
        _ = []
        li = self.data
        for i in li['list']:
            i['dt_txt'] = datetime.fromtimestamp(int(i['dt'])).strftime("%Y-%m-%d %H:%M:%S")
            i['dt_txt'] = i['dt_txt'][5:16]
            i['main']['temp'] = round(float(i['main']['temp']))
            _.append({
                'description': i['weather'][0]['description'],
                'temp': i['main']['temp'],
                'pressure': i['main']['pressure'],
                'humidity': i['main']['humidity'],
                'dt_txt': i['dt_txt'],
                'dt': i['dt'],
            })
        self.data = _
