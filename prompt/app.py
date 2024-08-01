from flask import Flask
from flask_cors import CORS, cross_origin

class Prompts(Flask):
    """A custom Flask app for Rag"""

    def __init__(self, *args, **kwargs):
        super(Prompts, self).__init__(__name__, *args, **kwargs)
        self.config["FLASK_ENV"] = "development"
        self.config["FLASK_DEBUG"] = True
        self.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
        self.config["PROPAGATE_EXCEPTIONS"] = True
  

def create_app():
    from . import (
        main
    )  

    app = Prompts()
    
    main.init_app(app)

    return app
