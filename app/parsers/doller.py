from parsers.base import HtmlParser


class DollarAnseoParser(HtmlParser):
    def set_config(self):
        self.url = 'http://hl.anseo.cn/rate_USD.aspx'
        self.patterns = {
            'usd': "/html/body/div[@id='currency']/div[@id='result']/div[@id='rates']/ul/li[@class='ev'][1]/text()"
        }

    def after_parse(self):
        self.data['usd'] = float(self.data['usd'][0].split('1 美元 = ')[1].strip())

if __name__ == '__main__':
    from pprint import pprint

    p = DollarAnseoParser()
    pprint(p['data'])
