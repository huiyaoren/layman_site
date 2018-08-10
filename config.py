import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'hard to guess string'

    @staticmethod
    def init_app(app):
        pass


class DefaultConfig(Config):
    BALANCE = {}

    BALANCE['huobi'] = {}
    BALANCE['huobi']['ETH'] = (1680, 0.37438050)
    BALANCE['huobi']['ADA'] = (1500, 1143.38344344)
    BALANCE['huobi']['BTM'] = (2250, 457.01604188)
    BALANCE['huobi']['BTC'] = (1250, 0.02407376)
    BALANCE['huobi']['BCH'] = (16, 0.00300050)
    BALANCE['huobi']['IOST'] = (1500, 6056.04004765)
    BALANCE['huobi']['HT'] = (500, 19.77156275)
    BALANCE['huobi']['ETC'] = (500, 5.14652713)

    BALANCE['okex'] = {}
    BALANCE['okex']['EOS'] = (500, 12.75510000)
    BALANCE['okex']['BTM'] = (2000, 557.38824100)
    BALANCE['okex']['ETH'] = (500, 0.14782276)
    BALANCE['okex']['ETC'] = (500, 3.62168339)
    BALANCE['okex']['XRP'] = (500, 115.17419000)

    CURRENT_MARKET = {}
    CURRENT_MARKET['BCH'] = 6485.37
    CURRENT_MARKET['XRP'] = 3.95
    CURRENT_MARKET['BTM'] = 4.11
    CURRENT_MARKET['EOS'] = 78.96
    CURRENT_MARKET['ADA'] = 1.32
    CURRENT_MARKET['BTC'] = 48490.00
    CURRENT_MARKET['ETC'] = 97.80
    CURRENT_MARKET['ETH'] = 3648.45
    CURRENT_MARKET['IOST'] = 0.26
    CURRENT_MARKET['HT'] = 24.83


config = {
    'config': Config,
    'default': DefaultConfig,
}

try:
    from local_config import *
except ImportError:
    pass
