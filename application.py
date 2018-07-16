import os

#flask import session is client side session.
from flask import Flask, session, render_template, request, redirect, jsonify

#flask_session is server side.
from flask_session import Session
from flask_socketio import SocketIO, emit

# Configure application
app = Flask(__name__)

# Check for environment variables
if not os.getenv("SECRET_KEY"):
    raise RuntimeError("SECRET_KEY is not set in os")

# Set up SECRET_KEY
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

# list of all channels
channel_list = ['general']

@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")
