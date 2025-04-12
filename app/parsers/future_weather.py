from datetime import datetime

from flask import current_app

from parsers.base import JsonParser


class FutureWeatherOpenweathermapParser(JsonParser):
    def set_config(self):
        self.area = 'fuzhou'
        self.app_id = current_app.config['OPENWEATHERMAP_APPID']
        self.url = 'http://api.openweathermap.org/data/2.5/forecast?q={}&APPID={}&mode=json&lang=zh_cn&units=metric'.format(self.area, self.app_id)
        self.patterns = {
            'list': 'list',
        }

    def after_parse(self):
        _ = []
        li = self.data
        for i in li['list']:
            i['dt_txt'] = datetime.fromtimestamp(int(i['dt'])).strftime("%Y-%m-%d %H:%M:%S")
            i['dt_txt'] = i['dt_txt'][5:16]
            i['main']['temp'] = round(float(i['main']['temp']))
            _.append({
                'description': i['weather'][0]['description'],
                'temp': i['main']['temp'],
                'pressure': i['main']['pressure'],
                'humidity': i['main']['humidity'],
                'dt_txt': i['dt_txt'],
                'dt': i['dt'],
            })
        self.data = _


if __name__ == '__main__':
    from manage import app
    with app.app_context():
        print(FutureWeatherOpenweathermapParser()['data'])
