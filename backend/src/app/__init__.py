from flask import Flask
from flask_cors import CORS
from backend.src.app.auth import auth_bp
from backend.src.app.tasks import tasks_bp

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(auth_bp)
    app.register_blueprint(tasks_bp)
    return app