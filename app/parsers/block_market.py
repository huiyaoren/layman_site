from flask import current_app

from parsers.doller import DollarAnseoParser
from parsers.base import JsonParser

Dollar = DollarAnseoParser


class BlockMarketMifengchaParser(JsonParser):
    def set_config(self):
        self.url = 'https://www.mifengcha.com/api/v1/coin/flow?size=2000&orderby=-1'
        self.patterns = {
            'list': 'data.list',
        }

    def after_parse(self):
        data = {i['symbol']: i for i in self.data['list']}

        dollar_price = float(Dollar.get_data()['usd'])

        current_market = {currency: round(dollar_price * float(data[currency]['price']), 2)
                          for currency in current_app.config['BLOCK_CURRENT_LIST']
                          if data.get(currency) is not None}

        self.data = self._get_balance_stat(current_market, current_app.config['BLOCK_BALANCE_DATA'])

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
            influence = abs(earned / (total_balance[i][0] + 100) - earned / total_balance[i][0])
            total_result.append({
                'CurrencyName': i,
                'totalCost': total_balance[i][0],
                'balance': round(total_balance[i][1], 6),
                'price': round(old_price, 2),
                'currentPrice': current_market[i],
                'earnedPer': round(100 * earned / total_balance[i][0], 1),
                'earned': round(earned, 2),
                'influence': round(influence * 100, 1),
            })

        total_result = sorted(total_result, key=lambda x: float(x['earnedPer']), reverse=True)

        return {
            'total_earned': total_earned,
            'total_cost': total_cost,
            'total_result': total_result,
        }


if __name__ == '__main__':
    from manage import app
    from pprint import pprint

    with app.app_context():
        pprint(BlockMarketMifengchaParser()['data'])
