import requests
from lxml import etree


class Weather():
    def __init__(self):
        self.location = 'FuZhou'
        self.url_weather_day = 'http://tianqi.2345.com/fuzhou/58847.htm'
        # self.url_weather_day = 'http://www.weather.com.cn/weather1d/101230101.shtml'
        # self.url_weather_week = 'http://www.weather.com.cn/weather/101230101.shtml'
        self.now = {
            'time': '23:05',
            'temperature': '24.0',
            'wind': {
                'direction': '东北风',
                'level': '2 级'
            },
            'humidity': '87%',
            'air_quality': '87',
        }
        self.day = []
        self.week = []
        self.xml_parser = etree.HTMLParser(encoding="utf-8")
        self.run()

    def response_from_url(self, url): 
        return requests.get(url=url).text

    def items_in_page(self, page, xpath_pattern):
        html = etree.HTML(page, parser=self.xml_parser)
        result = html.xpath(xpath_pattern)
        print(result)

    def run(self):
        page = self.response_from_url(self.url_weather_day)
        # print(page)
        self.now
        self.items_in_page(page, '//*[@id="weaLiveInfo"]/ul/li[1]/i/text()')
        self.items_in_page(page, '//*[@id="weaLiveInfo"]/ul/li[2]/i/text()')
        self.items_in_page(page, '//*[@id="weaLiveInfo"]/ul/li[3]/i/text()')
        self.items_in_page(page, '//*[@id="weaLiveInfo"]/ul/li[4]/i/text()')
        self.items_in_page(page, '//*[@id="weaLiveInfo"]/ul/li[5]/i/text()')
        self.items_in_page(page, '//*[@id="weaLiveInfo"]/ul/li[6]/i/text()')
        self.items_in_page(page, '//*[@id="weaLiveInfo"]/ul/li[7]/i/text()')
        self.items_in_page(page, '//*[@id="wrap"]/div[6]/div[2]/div[1]/div[3]/div/a/text()')
        self.items_in_page(page, '//*[@id="wrap"]/div[6]/div[2]/div[1]/div[3]/div/a/i/text()')
        self.items_in_page(page, '//*[@id="life_data"]/div[2]/ul/li/div[2]/h4[@class="green"]/text()')
        self.items_in_page(page, '//*[@id="life_data"]/div[2]/ul/li/div[2]/h4[@class="red"]/text()')


def main():
    weather = Weather()

if __name__ == '__main__':
    main()