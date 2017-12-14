import requests
from lxml import etree


class Parser():
    def __init__(self):
        self.xml_parser = etree.HTMLParser(encoding="utf-8")
        self.set_config()
        self.headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}

    def set_config(self):
        pass

    def response_from_url(self, url):
        return requests.get(url=url, headers=self.headers).text

    def items_in_page(self, page, xpath_pattern):
        html = etree.HTML(page, parser=self.xml_parser)
        result = html.xpath(xpath_pattern)
        return result[0] if len(result) == 1 else result

    def parse(self):
        patterns = self.patterns
        page = self.response_from_url(self.url)
        self.data = {i: self.items_in_page(page, patterns[i]) for i in patterns}

    def  __getattribute__(self, name):
        if name == 'data':
            self.parse()
        return super().__getattribute__(name)

    def __getattr__(self, name):
        if name == 'data':
            self.parse()
            return self.data

    def __getitem__(self, key):
        if key == 'data':
            self.parse()
            return self.data


class Weather(Parser):
    def set_config(self):
        self.location = 'FuZhou'
        self.url = 'http://tianqi.2345.com/fuzhou/58847.htm'
        self.patterns = {
            'temperature_current': '//*[@id="weaLiveInfo"]/ul/li[1]/i/text()',
            'humidity': '//*[@id="weaLiveInfo"]/ul/li[2]/i/text()',
            'wind': '//*[@id="weaLiveInfo"]/ul/li[3]/i/text()',
            'pressure': '//*[@id="weaLiveInfo"]/ul/li[4]/i/text()',
            'sunset': '//*[@id="weaLiveInfo"]/ul/li[5]/i/text()',
            'sunrise': '//*[@id="weaLiveInfo"]/ul/li[6]/i/text()',
            'uv': '//*[@id="weaLiveInfo"]/ul/li[7]/i/text()',
            'weather': '//*[@id="wrap"]/div[6]/div[2]/div[1]/div[3]/div/a/text()',
            'temperature_range': '//*[@id="wrap"]/div[6]/div[2]/div[1]/div[3]/div/a/i/text()',
        }


class Gold(Parser):
    def set_config(self):
        self.url = 'http://www.icbc.com.cn/ICBCDynamicSite/Charts/GoldTendencyPicture.aspx'
        self.patterns = {
            '人民币账户黄金中间价': '//*[@id="TABLE1"]/tbody/tr[2]/td[5]/text()',
        }


class Bitcoin(Parser):
    def set_config(self):
        self.url = 'http://www.bestopview.com/rmb/'
        self.patterns = {
            'title': '//title/text()',
            '美元': '//span/text()',
        }

    # def parse(self):
    #     patterns = self.patterns
    #     page = self.response_from_url(self.url)
    #     self.data = {1: page}


def main():
    pass


weatherParser = Weather()
goldParser = Bitcoin()


if __name__ == '__main__':
    main()