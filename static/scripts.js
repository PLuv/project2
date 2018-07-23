// check in functions.
document.addEventListener('DOMContentLoaded', () => {
    // Check if username exists on localStorage.
    if (!localStorage.getItem('username')) {
        document.querySelector('#modal_1').style.display = "block";

        // Read form username.
        document.querySelector('#form1').onsubmit = () => {

            // initialize new request
            const request = new XMLHttpRequest();
            const user_name = document.querySelector('#user_name').value;

            // open request
            request.open('POST', '/check_in');

            // Callback function for when request completes
            request.onload = () => {

                // Extract JSON data from request
                const data = JSON.parse(request.responseText);

                // update
                if (data.success) {
                    console.log("Success recieved");
                    document.querySelector('#modal_1').style.display = 'none';
                    document.querySelector('#entry').style.display = 'none';
                    // Set new user's username in local storage.
                    localStorage.setItem('username', data.name);
                    // Welcom new user, send data to gate function.
                    alert(`"Welcome ${data.name}"`);
                    gate_function(data);
                }
                else {
                    console.log("Username exists error.");
                    alert(`"Error: UserName ${data.name} already exists"`);
                }
            };

            // Add data to send with request
            const data = new FormData();
            data.append('user_name', user_name);

            // Send request
            request.send(data);
            return false;
        };
    }
    else {
        const user_name = localStorage.getItem('username');
        document.querySelector('#entry').style.display = 'none';
        // initialize new request
        const request = new XMLHttpRequest();
        // open request
        request.open('POST', '/check_in');

        // Callback function for when request completes.
        request.onload = () => {

            // Extract JSON data from request
            const data = JSON.parse(request.responseText);

            // check recieved data.
            if (data.success) {
                console.log("Success recieved");
                alert(`"Welcome back ${data.name}"`);
                gate_function(data);
            }
            else {
                document.querySelector('#problem').style.display = 'block';
                document.querySelector('#reason').innerHTML = `Error retrieving data.`;
            }
        };

        // Package and send request
        const data = new FormData();
        data.append('from_storage', user_name);

        // Send request
        request.send(data);
        return false;
    }

//End of file
});

// Push webapp to user.
function gate_function (data) {
    document.querySelector('#problem').style.display = 'none';
    var new_html = '';
    for (i = 0; i < 30; i++) {
        tmp = data.key[i];
        new_html = new_html.concat(tmp);
        //document.querySelector('#gate').innerHTML = tmp;
    }
    document.querySelector('#gate').innerHTML = new_html;
    console.log("done opening gate.");
    document.querySelector('#logged_in_user').innerHTML = data.name;

    // call chanel functions.
    create_channel();
    var from = 0;
    display_channels(from);
    setTimeout('post_message()', 1500);
}

// Add channel function
function create_channel() {
    document.querySelector('#create_channel').onclick = () => {
        document.querySelector('#modal_2').style.display = "block";

        // Read form create channel (form2)
        document.querySelector('#form2').onsubmit = () => {
            // initialize new request
            const request = new XMLHttpRequest();
            const channel_name = document.querySelector('#channel_name').value;

            // open request
            request.open('POST', '/channels');

            // Callback function for when request complete
            request.onload = () => {
                // Extract JSON recieved
                const channel = JSON.parse(request.responseText);

                // check recieved data and issue new channel to user.
                if (channel.success) {
                    console.log("successful channel creation");
                    document.querySelector('#modal_2').style.display = "none";
                    alert(`"You've successfully created a new channel: ${channel.channel_name}"`);
                    document.querySelector('#form2').reset();
                    var from = 1;
                    display_channels(from);
                }
                else {
                    if (channel.channel_name) {
                        console.log("Channel exists error");
                        alert(`"The name ${channel.channel_name} is already in use."`);
                        document.querySelector('#form2').reset();
                    }
                    else {
                        document.querySelector('#modal_2').style.display = "none";
                        document.querySelector('#problem').style.display = 'block';
                        document.querySelector('#form2').reset();
                        document.querySelector('#reason').innerHTML = `Error creating channel, reload app and try again.`;
                    }
                }
            };
            // Package and send request
            const channel = new FormData();
            channel.append('channel_name', channel_name);
            request.send(channel);
            return false;
        };
    };
    document.querySelector('#cancel_create').onclick = () => {
        document.querySelector('#form2').reset();
        document.querySelector('#modal_2').style.display = 'none';
    };
}

// Displays channels to channels_div
function display_channels(from) {
    // Get channels
    //open request
    const request = new XMLHttpRequest();
    request.open('GET', '/channels');

    // Callback function
    request.onload = ()=> {
        const data = JSON.parse(request.responseText);

        if (data.success) {
            // Current channels upload
            const template = Handlebars.compile(document.querySelector('#channel_script').innerHTML);
            var channel_name = [];
            if (from === 0) {
                for (let i = 0; i < data.channel.length; i++) {
                channel_name.push(data.channel[i]);
                }
            }
            else {
                var i = data.channel.length - 1;
                channel_name.push(data.channel[i]);
            }

            // Add channel to DOM.
            const content = template({'value': channel_name});
            document.querySelector('#channels_div').innerHTML += content;
        }
        else {
            console.log("channel load error");
            alert("There has been an error loading channels. Please reload program.");
        }

        // call channel selector functionality.
        channel_selector(data);
    };
    // Send request
    request.send();
    return false;
}

function channel_selector(data) {
    var cur_channel;
    // Check if user has a saved current channel.
    if (!localStorage.getItem('cur_channel')) {
        cur_channel = data.channel[0];
        document.querySelector('#channel_name_header').innerHTML = ' #' + cur_channel;
        load_page(cur_channel);
    }
    else {
        cur_channel = localStorage.getItem('cur_channel');
        document.querySelector('#channel_name_header').innerHTML = ' #' + cur_channel;
        load_page(cur_channel);
    }

    // onclick change channels and update localStorage.
    document.querySelectorAll('.nav-link').forEach(link => {
        link.onclick = () => {
            const page = link.dataset.page;
            load_page(page);
            return false;
        };
    });
    // Render channel to page.
    function load_page(page_name) {
        const request = new XMLHttpRequest();
        request.open('GET', `/messages/${page_name}`);
        // clear what was/could be in message_container.
        clearout();

        request.onload = () => {
            const response = JSON.parse(request.responseText);

            // If not messages in class yet.
            if (response.success === false) {
            console.log("channel load error");
            alert("Channel is currently empty, quick be the first to comment!");
            }

            // else construct message_container
            else {
                // remove message objects from array.
                response.forEach(response => {
                    let user_content_time = (response.user + " ~ " + response.content_time);
                    let message_content = response.content;
                    let template = Handlebars.compile(document.querySelector('#message_script').innerHTML);
                    let content = template({'user_content_time': user_content_time, 'message_content': message_content});
                    document.querySelector('#message_container').innerHTML += content;
                });

            }
        };
        document.querySelector('#message_container').setAttribute('data-channel', page_name);
        request.send();
    }
}

function post_message() {
    // Connect to websocket.
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // When connected, configure
    socket.on('connect', () => {
        document.querySelector('#submit_message_button').onclick = () => {
            var posted_message = document.querySelector('#message_input').value;

            // Check for proper input.
            if (posted_message.length < 1) {
                document.querySelector('#message_input').setAttribute('placeholder', "Post must have content to be posted");
            }
            else {
                socket.emit('submit post', {'post': posted_message});
                document.querySelector('#message_form').reset();
            }
        }
    })
}

function clearout () {
    document.querySelector('#message_container').innerHTML = "";
}
