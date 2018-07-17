import requests, os

#flask import session is client side session.
from flask import Flask, session, render_template, request, jsonify

#flask_session is server side.
from flask_session import Session
from flask_socketio import SocketIO, emit

# Configure application
app = Flask(__name__)

# Check for environment variables
if not os.getenv("SECRET_KEY"):
    raise RuntimeError("SECRET_KEY is not set in os")

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Set up SECRET_KEY
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

# list of all channels
channel_list = ['general']

@app.route("/")
def index():
    return render_template("test2.html")

@app.route("/check_in", methods=["POST"])
def check_in():

    new_user = request.form.get("new_user")
    data = new_user
    print(data)

    return jsonify({"success": True, "rate": data})
