import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'hard to guess string'

    @staticmethod
    def init_app(app):
        pass

class DefaultConfig(Config):
    ADDITIONAL_PATH = r'/host/Project/scripts'
    pass

config = {
    'config': Config,
    'default': DefaultConfig,
}