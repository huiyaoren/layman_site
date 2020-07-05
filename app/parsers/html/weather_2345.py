from parsers.parsers import HtmlParser


class Weather2345Parser(HtmlParser):
    def set_config(self):
        self.location = 'FuZhou'
        self.encoding = 'utf-8'
        self.url = 'http://tianqi.2345.com/fuzhou1d/58847.htm'
        self.patterns = {
            "real_time_temp": "//span[@class='real-t']/text()",
            "humidity": "//ul[@class='real-data']/li[1]/span[@class='real-data-mess fl'][2]/text()",
            "wind_level": "//ul[@class='real-data']/li[1]/span[@class='real-data-mess fl'][1]/text()",
            "air_pressure": "//ul[@class='real-data']/li[2]/span[@class='real-data-mess fl'][2]/text()",
            "sunrise": "//div[@class='hours24-data-th-right']/span[1]/text()",
            "sunset": "//div[@class='hours24-data-th-right']/span[2]/text()",
            "uv": "//ul[@class='live-tips-box']/li[5]/p[@class='m-tips']/text()",
            "weather": "//div[@class='real-today']/span/text()",
            "temperature": "//div[@class='real-today']/span/text()",
            "release_time": "//div[@class='hours-info']/div[@class='real-mess']/p[@class='real-wea-info']/text()",
        }

    def after_parse(self):
        self.data['air_pressure'] = self.data['air_pressure'].replace('\xa0', ' ')
        self.data['humidity'] = self.data['humidity'].replace('\xa0', ' ')
        self.data['temperature'] = self.data['temperature'].split('\xa0')[0].split('：')[-1]
        self.data['weather'] = self.data['weather'].split('\xa0')[-1]
        self.data['wind_level'] = self.data['wind_level'].replace('\xa0', ' ')


if __name__ == '__main__':
    from pprint import pprint

    p = Weather2345Parser()
    pprint(p['data'])
