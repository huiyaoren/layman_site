import json
from pprint import pprint

import requests
from lxml import etree

from app.time_recoder import log_time, log_time_with_name


class Parser():
    def __init__(self):
        self.xml_parser = etree.HTMLParser(encoding="utf-8")
        self.url = ''
        self.patterns = {}
        self.data = {}
        self.set_config()
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'
        }

    def set_config(self):
        pass

    def response_from_url(self, url):
        return requests.get(url=url, headers=self.headers).text

    def parse_data(self):
        self.parse()
        self.after_parse()

    def parse(self):
        pass

    def after_parse(self):
        pass

    def __getitem__(self, key):
        if key == 'data':
            self.parse_data()
            return self.data


class HtmlParser(Parser):
    def items_in_html(self, html, xpath_pattern):
        html = etree.HTML(html, parser=self.xml_parser)
        result = html.xpath(xpath_pattern)
        return result[0].strip() if len(result) == 1 else result

    def parse(self):
        patterns = self.patterns
        page = self.response_from_url(self.url)
        self.data = {i: self.items_in_html(page, patterns[i]) for i in patterns}


class JsonParser(HtmlParser):
    def items_in_json(self, json, pattern):
        keys = pattern.split('.')
        result = json
        for k in keys:
            result = result[k]

        if isinstance(result, str):
            result = result.strip()

        return result

    def parse(self):
        patterns = self.patterns
        page = self.response_from_url(self.url)
        data = json.loads(page)
        self.data = {i: self.items_in_json(data, patterns[i]) for i in patterns}


class Weather(HtmlParser):
    def set_config(self):
        self.location = 'FuZhou'
        self.url = 'http://tianqi.2345.com/fuzhou/58847.htm'
        self.patterns = {
            '实时气温': '//*[@id="weaLiveInfo"]/ul/li[1]/i/text()',
            '湿度': '//*[@id="weaLiveInfo"]/ul/li[2]/i/text()',
            '风级': '//*[@id="weaLiveInfo"]/ul/li[3]/i/text()',
            '气压': '//*[@id="weaLiveInfo"]/ul/li[4]/i/text()',
            '日出时间': '//*[@id="weaLiveInfo"]/ul/li[5]/i/text()',
            '日落时间': '//*[@id="weaLiveInfo"]/ul/li[6]/i/text()',
            '紫外线': '//*[@id="weaLiveInfo"]/ul/li[7]/i/text()',
            '天气': '//*[@id="wrap"]/div[6]/div[2]/div[1]/div[3]/div/a/text()',
            '气温': '//*[@id="wrap"]/div[6]/div[2]/div[1]/div[3]/div/a/i/text()',
            '发布时间': '//*[@id="wrap"]/div[6]/div[1]/div[2]/text()',
        }


class Gold(HtmlParser):
    def set_config(self):
        self.url = 'http://www.icbc.com.cn/ICBCDynamicSite/Charts/GoldTendencyPicture.aspx'
        self.patterns = {
            '账户黄金(人民币)': '//*[@id="TABLE1"]/tbody/tr[2]/td[5]/text()',
        }


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


class BlockMarket(HtmlParser):
    def set_config(self):
        self.url = 'https://block.cc/'
        self.patterns = {
            '名称': '//*[@id="app"]/div[1]/div[2]/div/div[2]/div/div[3]/div/a/div[2]/div/span/span/em[1]/text()',
            '价格 (USD)': '//*[@id="app"]/div[1]/div[2]/div/div[2]/div/div[3]/div/a/div[3]/span/span/text()',
            '涨幅 (24H)': '//*[@id="app"]/div[1]/div[2]/div/div[2]/div/div[3]/div/a/div[4]/span/span/text()',
            '交易量': '//*[@id="app"]/div[1]/div[2]/div/div[2]/div/div[3]/div/a/div[6]/span/text()',
            '市值': '//*[@id="app"]/div[1]/div[2]/div/div[2]/div/div[3]/div/a/div[7]/span/text()',
        }

    def after_parse(self):
        result = {self.data['名称'][i].strip(): {
            'name': self.data['名称'][i].strip(),
            'price': self.data['价格 (USD)'][i].strip(),
            'increase': self.data['涨幅 (24H)'][i].strip(),
            'transaction': self.data['交易量'][i].strip(),
            'market_value': self.data['市值'][i].strip(),
        } for i in range(60)}
        self.data = result


class BlockMarketJson(JsonParser):
    def set_config(self):
        self.url = 'https://block.cc/api/v1/coin/flow?size=500&orderby=-1'
        self.patterns = {
            'list': 'data.list',
        }

    def after_parse(self):
        _ = {}
        li = self.data
        for i in li['list']:
            _[i['symbol']] = i
        self.data = _


class Dollar(HtmlParser):
    def set_config(self):
        self.url = 'http://www.currencydo.com/'
        self.patterns = {
            '美元/人民币(中间价)': '//*[@id="worldBanks"]/tbody/tr[26]/td[2]/text()',
        }

    def after_parse(self):
        self.data['美元/人民币(中间价)'] = round(float(self.data['美元/人民币(中间价)']) / 100, 2)


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


parserGroup = ParserGroup()


@log_time_with_name('main')
def main():
    test = BlockMarketJson()
    pprint(test['data'])


if __name__ == '__main__':
    main()
