from requests import Session, Request


class Weather():
    def __init__(self):
        self.location = 'FuZhou'
        self.url_weather_day = 'http://www.weather.com.cn/weather1d/101230101.shtml'
        self.url_weather_week = 'http://www.weather.com.cn/weather/101230101.shtml'
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
        self.run()

    def get_response(self, url):
        s = Session()
        req = Request(url=url)
        resp = s.send(req.prepare())
        return str(resp.content, encoding='utf8')

    def run(self):
        self.get_response(self.url_weather_day)
