import os

from .block_chain import BlockChainConfig
from .default import DefaultConfig, Config

basedir = os.path.abspath(os.path.dirname(__file__))

config = {
    'config': Config,
    'default': DefaultConfig,
}

try:
    from local import *
except ImportError:
    pass
