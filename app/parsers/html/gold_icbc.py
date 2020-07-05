from parsers.parsers import HtmlParser


class GoldIcbcParser(HtmlParser):
    def set_config(self):
        self.url = 'http://www.icbc.com.cn/ICBCDynamicSite/Charts/GoldTendencyPicture.aspx'
        self.patterns = {
            'price': '//*[@id="TABLE1"]/tbody/tr[2]/td[5]/text()',
        }


if __name__ == '__main__':
    from pprint import pprint

    p = GoldIcbcParser()
    pprint(p['data'])
