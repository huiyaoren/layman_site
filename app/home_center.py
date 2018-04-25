import json

import requests
from lxml import etree


class Parser():
    def __init__(self):
        self.xml_parser = etree.HTMLParser(encoding="utf-8")
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
        return result[0] if len(result) == 1 else result

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
        }


class Gold(HtmlParser):
    def set_config(self):
        self.url = 'http://www.icbc.com.cn/ICBCDynamicSite/Charts/GoldTendencyPicture.aspx'
        self.patterns = {
            '账户黄金(美元)': '//*[@id="TABLE1"]/tbody/tr[2]/td[5]/text()',
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


def main():
    pass


weatherParser = Weather()
goldParser = Gold()
bitcoinParser = Bitcoin()

if __name__ == '__main__':
    main()
