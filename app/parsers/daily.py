from parsers.base import HtmlParser


class DailyZhihuParser(HtmlParser):
    def set_config(self):
        self.url = 'https://daily.zhihu.com/'
        self.patterns = {
            'title': '/html/body/div[3]/div/div[2]/div/div/div/div/a/span/text()',
            'image': '/html/body/div[3]/div/div[2]/div/div/div/div/a/img/@src',
            'page': '/html/body/div[3]/div/div[2]/div/div/div/div/a/@href',
        }

    def after_parse(self):
        zip_set = zip(self.data['image'], self.data['page'], self.data['title'])
        self.data = [{'image': i[0], 'page': 'https://daily.zhihu.com{0}'.format(i[1]), 'tile': i[2]} for i in zip_set]


if __name__ == '__main__':
    from pprint import pprint

    pprint(DailyZhihuParser()['data'])