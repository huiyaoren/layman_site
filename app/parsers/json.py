from datetime import datetime

from flask import current_app

from app.parsers import Dollar
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
        data = {i['symbol']: i for i in self.data['list']}

        dollar_price = float(Dollar.get_data()['美元/人民币(中间价)'])

        current_market = {currency: round(dollar_price * float(data[currency]['price']), 2)
                          for currency in current_app.config['CURRENT_LIST']
                          if data.get(currency) is not None}

        self.data = self._get_balance_stat(current_market, current_app.config['BALANCE'])

    def _get_balance_stat(self, current_market, balance):
        total_earned = 0
        total_cost = 0
        total_balance = {}
        total_result = []

        for i in balance:
            for j in balance[i]:
                total_cost += balance[i][j][0]
                total_balance[j] = total_balance.get(j, [0, 0])
                total_balance[j][0] += balance[i][j][0]
                total_balance[j][1] += balance[i][j][1]

        for i in total_balance:
            old_price = total_balance[i][0] / total_balance[i][1]
            earned = total_balance[i][1] * (current_market[i] - old_price)
            total_earned += earned
            total_result.append({
                'CurrencyName': i,
                'totalCost': total_balance[i][0],
                'balance': round(total_balance[i][1], 6),
                'price': round(old_price, 2),
                'currentPrice': current_market[i],
                'earnedPer': round(100 * earned / total_balance[i][0], 2),
                'earned': round(earned, 2),
            })

        total_result = sorted(total_result, key=lambda x: float(x['earnedPer']), reverse=True)

        return {
            'total_earned': total_earned,
            'total_cost': total_cost,
            'total_result': total_result,
        }


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
