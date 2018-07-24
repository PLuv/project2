# Project 2

Web Programming with Python and JavaScript

----------------------
**Setup: Terminal Window**
----------------------

$flask run

----------------------
**Web App Description**
----------------------

*Name: Speak*

Description- Simple chat app.

----------------------
**App Functionality**
----------------------

*Login* If a browser is visiting for the first time the user will be prompted for a username.  This username will be stored in localStorage
and future visits will not require login but rather user will be greated by name.

*Header Items:*

I. The currently viewable channel is displayed.
II. The logged in user's name is displayed.
III. A clickable pop up to allow user to create a new channel is displayed.  Upon clicking the user can create a new channel so long
    as that channel's name is not already taken.  If the user changes their mind they will be led directly back to the current channel.
IV. All current channels are listed on the sidebar to the left.  Users can navigate between them by clicking.
V. At the footer area is a text box which users can type in a message which would post to the current channel they are viewing. If the
user attempts to post an empty string the placeholder text will alert them to enter a message before attempting to post.
VI. Posts are displayed from newest to oldest.


*Special Feature*
The currently logged in user can choose to delete a post if that post was made by them.

*Known Issues*
I. When a user makes a new post they will not be able to delete it until either refreshing, deleting another one of their comments,
or basically anything that would cause the 'load_page' javascript function to be called.
II. Channel names are limited to 15 characters.  This is not a bug but rather a result of time constraints as I didn't feel like
spending so much time on making the css work for longer channel names.
