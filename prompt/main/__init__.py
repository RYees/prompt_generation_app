from flask import jsonify

from prompt.main.api import api
from flask_cors import CORS, cross_origin

def init_app(app):
    CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"]}})
    api.init_app(app)
