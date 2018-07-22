from datetime import datetime

def gate():
    a = {"0": '<div class="row">',\
    "1": '<!-- Channels Column top-row -->',\
    "2": '<div class="col-sm-1" id="upper-left">',\
    "3": '<p>Speak</p>',\
    "4": '</div>',\
    "5": '<div class="col-sm-11">',\
    "6": '<!-- Header -->',\
    "7": '<div class="header">',\
    "8": '<a id="logo"><img src="/static/pics/favicon-32.png" alt="~Speak~"><span id="channel_name_header"></span><span class="header-center"><img src="/static/pics/dot40.png">  </span><span id="logged_in_user"></span><a href="#" id="create_channel" class="header-center"><span><img src="/static/pics/add_button40.png"></span><span id="create_holder">Create Channel</span></a></a>',\
    "9": '<div class="header-right">',\
    "10": '<a>place</a>',\
    "11": '<a>place2</a>',\
    "12": '</div>',\
    "13": '</div>',\
    "14": '</div>',\
    "15": '</div>',\
    "16": '<!-- Begin Second Row -->',\
    "17": '<div class="row" id="second_row">',\
    "18": '<div class="col-sm-1" id="sidebar">',\
    "19": '<div class="channel_head">Channels list</div><div id="channels_div"></div>',\
    "20": '</div>',\
    "21": '<!-- Begin Chat Channel Box -->',\
    "22": '<div class="col-sm-11" id="chat_channel">',\
    "23": '<div id="message_container">',\
    "24": '<!-- Repeatable message containers -->',\
    "25": '<div class="row">',\
    "26": '<div class="message_box">',\
    "27": '<div class="user_info"><p class="user_info">Name timestamp</p></div>',\
    "28": '<div class="message"><p class="message">Messages inserted here.  Messages inserted here. Messages inserted here.</p></div>',\
    "29": '</div>',\
    "30": '</div>',\
    "31": '</div>',\
    "32": '<!-- Footer message insert form -->',\
    "33": '<div id="footer_container">',\
    "34": 'Test info in footer',\
    "35": '</div>',\
    "36": '</div>',\
    "37": '</div>'}
    return a


class Message:
    def __init__(self, user, content_time, content):
        self.user = user
        self.content_time = content_time
        self.content = content


class Channel:
    limit = 5

    def __init__(self, name):
        self.name = name
        # Keep track of channel's messages.
        self.messages = []

    # add message method
    def add(self, m):
        # set class/channel limit
        if len(self.messages) >= self.limit:
            self.messages.pop(0)
        self.messages.append(m)

    # define channel returner
    def get_channel(self):
        return(f"{self.name}")

    # define message data returner
    def get_message_data(self):
        message_dict = []
        for contents in self.messages:
            message_user = (f"{contents.user}")
            message_content_time = (f"{contents.content_time}")
            message_content = (f"{contents.content}")
            message_dict.append({'user': message_user, 'content_time': message_content_time, 'content': message_content})
        return (message_dict)

    # define user returner
    def get_users(self):
        users = []
        for a_user in self.messages:
            users.append(f"{a_user.user}")
        return (users)

    # define time returner
    def get_content_time(self):
        times = []
        for time in self.messages:
            times.append(f"{time.content_time}")
        return(times)

    # define content returner
    def get_content(self):
        contents = []
        for i in self.messages:
            contents.append(f"{i.content}")
        return(contents)

# Eastern time converter function.
def eastern_time(time):
    eastern = time.strftime('%I:%M %m-%d-%Y')
    return (eastern)

