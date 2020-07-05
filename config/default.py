import os

from config import BlockChainConfig


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'hard to guess string'

    @staticmethod
    def init_app(app):
        pass

class DefaultConfig(Config, BlockChainConfig):
    REDIS_HOST = os.getenv('REDIS_PORT_6379_TCP_ADDR', '127.0.0.1')
    REDIS_PORT = int(os.getenv('REDIS_PORT_6379_TCP_PORT', 6379))
    REDIS_PASSWORD = os.getenv('REDIS_ENV_REDIS_AUTH')
    REDIS_DB = int(os.getenv('REDIS_ENV_REDIS_DB', 0))

    OPENWEATHERMAP_APPID = os.getenv('OPENWEATHERMAP_APPID', '')