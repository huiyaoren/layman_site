from .parsers import HtmlParser


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
            '天气': '//*[@id="wrap"]/div[7]/div[2]/div[1]/div[3]/div/a/text()',
            '气温': '//*[@id="wrap"]/div[7]/div[2]/div[1]/div[3]/div/a/i/text()',
            '发布时间': '//*[@id="wrap"]/div[7]/div[1]/div[2]/text()',
        }

    def after_parse(self):
        self.data['气压'] = self.data['气压'].replace(' ', '')


class Gold(HtmlParser):
    def set_config(self):
        self.url = 'http://www.icbc.com.cn/ICBCDynamicSite/Charts/GoldTendencyPicture.aspx'
        self.patterns = {
            '账户黄金(人民币)': '//*[@id="TABLE1"]/tbody/tr[2]/td[5]/text()',
        }


class BlockMarket(HtmlParser):
    def set_config(self):
        self.url = 'https://block.cc/'
        self.patterns = {
            '名称': '//*[@id="app"]/div[1]/div[2]/div/div[2]/div/div[3]/div/a/div[2]/div/span/span/em[1]/text()',
            '全称': '//*[@id="app"]/div[1]/div[2]/div/div[2]/div/div[3]/div/@id',
            '价格 (USD)': '//*[@id="app"]/div[1]/div[2]/div/div[2]/div/div[3]/div/a/div[3]/span/span/text()',
            '涨幅 (24H)': '//*[@id="app"]/div[1]/div[2]/div/div[2]/div/div[3]/div/a/div[4]/span/span/text()',
            '交易量': '//*[@id="app"]/div[1]/div[2]/div/div[2]/div/div[3]/div/a/div[6]/span/text()',
            '市值': '//*[@id="app"]/div[1]/div[2]/div/div[2]/div/div[3]/div/a/div[7]/span/text()',
        }

    def after_parse(self):
        result = {self.data['名称'][i].strip(): {
            'name': self.data['名称'][i].strip(),
            'fname': self.data['全称'][i].strip(),
            'price': self.data['价格 (USD)'][i].strip(),
            'increase': self.data['涨幅 (24H)'][i].strip(),
            'transaction': self.data['交易量'][i].strip(),
            'market_value': self.data['市值'][i].strip(),
        } for i in range(60)}
        self.data = result


class Dollar(HtmlParser):
    def set_config(self):
        self.url = 'http://www.currencydo.com/'
        self.patterns = {
            '美元/人民币(中间价)': '//*[@id="worldBanks"]/tbody/tr[26]/td[2]/text()',
        }

    def after_parse(self):
        self.data['美元/人民币(中间价)'] = round(float(self.data['美元/人民币(中间价)']) / 100, 2)


class ZhihuDaily(HtmlParser):
    def set_config(self):
        self.url = 'https://daily.zhihu.com/'
        self.patterns = {
            'title': '/html/body/div[3]/div/div[2]/div/div/div/div/a/span/text()',
            'image': '/html/body/div[3]/div/div[2]/div/div/div/div/a/img/@src',
            'page': '/html/body/div[3]/div/div[2]/div/div/div/div/a/@href',
        }

    def after_parse(self):
        for k, i in enumerate(self.data['page']):
            self.data['page'][k] = 'https://daily.zhihu.com{0}'.format(i)
