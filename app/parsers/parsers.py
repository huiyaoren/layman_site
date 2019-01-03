import json

import requests

from lxml import etree


class Parser():
    def __init__(self):
        self.encoding = 'utf8'
        self.xml_parser = etree.HTMLParser(encoding="utf-8")
        self.url = ''
        self.patterns = {}
        self.data = {}
        self.set_config()
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'
        }

    def set_config(self):
        pass

    def response_from_url(self, url):
        session = requests.get(url=url, headers=self.headers)
        session.encoding = self.encoding
        return session.text

    def parse_data(self):
        self.parse()
        self.after_parse()

    def parse(self):
        pass

    def after_parse(self):
        pass

    def __getitem__(self, key):
        if key == 'data':
            self.parse_data()
            return self.data

    @classmethod
    def get_data(cls):
        self = cls()
        self.parse_data()
        return self.data


class JsonParser(Parser):
    def items_in_json(self, json, pattern):
        keys = pattern.split('.')
        result = json
        for k in keys:
            result = result[k]

        if isinstance(result, str):
            result = result.strip()

        return result

    def parse(self):
        patterns = self.patterns
        page = self.response_from_url(self.url)
        data = json.loads(page)
        self.data = {i: self.items_in_json(data, patterns[i]) for i in patterns}


class HtmlParser(Parser):
    def items_in_html(self, html, xpath_pattern):
        html = etree.HTML(html, parser=self.xml_parser)
        result = html.xpath(xpath_pattern)
        return result[0].strip() if len(result) == 1 else result

    def parse(self):
        patterns = self.patterns
        page = self.response_from_url(self.url)
        self.data = {i: self.items_in_html(page, patterns[i]) for i in patterns}
