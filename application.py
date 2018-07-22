import requests, os
from holder import *

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

# App lists
channel_list = ['General', 'Test Channel 1', 'Test Channel 2']
user_list = []
channel_dict = {}

# Testing
message_1 = Message(user='Philip', content_time='07-21-18', content='This is my first test message -phil')
general = Channel(name='General')
general.add(message_1)
channel_dict['General'] = general


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/check_in", methods=["POST"])
def check_in():
    """Check in user"""
    data = ''

    # See if this is from storage or new.
    if not request.form.get("from_storage"):
        data = request.form.get("user_name").title()

        # Check if username already exists.
        if data in user_list:
            return jsonify({"success": False, "name": data})
        else:
            user_list.append(data)
    else:
        data = request.form.get("from_storage").title()
        if data not in user_list:
            user_list.append(data)

    gate_key = gate()
    print(user_list)
    return jsonify({"success": True, "name": data, "key": gate_key, "channel": channel_list})


@app.route("/channels", methods=["GET", "POST"])
def channels():
    """Channel Management"""
    if request.method == "POST":

        # Ensure message came through.
        if not request.form.get("channel_name"):
            return jsonify({"success": False})

        # Get new channel, make sure channel name does not already exist.
        channel_name = request.form.get("channel_name").title()

        if channel_name in channel_list:
            return jsonify({"success": False, "channel_name": channel_name})

        channel_list.append(channel_name)
        print(channel_list)

        # Make new channel object insert into channel dictionary.
        channel_dict[channel_name] = Channel(name=channel_name)

        return jsonify({"success": True, "channel_name": channel_name, "channel": channel_list})

    else:
        return jsonify({"success": True, "channel": channel_list})


@app.route("/messages/<string:page_name>", methods=["GET", "POST"])
def messages(page_name):
    """Message Management"""
    if request.method == "POST":
        print("POSTED to messages route")


    else:
        # Get channel object using page_name.
        channel_object = channel_dict[page_name]
        contents = channel_object.get_message_data()
        return jsonify(contents[0])

