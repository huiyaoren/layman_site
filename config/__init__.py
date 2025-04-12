import os

from .block_chain import BlockChainConfig
from .default import DefaultConfig, Config

basedir = os.path.abspath(os.path.dirname(__file__))

try:
    from .local import *
except ImportError:
    pass

config = {
    'config': Config,
    'default': DefaultConfig,
}
