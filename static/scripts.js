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
                    create_channel();
                }
                else {
                    console.log("Username exists error.");
                    document.querySelector('#problem').style.display = 'block';
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
                create_channel();
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

function gate_function (data) {
    document.querySelector('#problem').style.display = 'none';
    var new_html = '';
    for (i = 0; i < 38; i++) {
        tmp = data.key[i];
        new_html = new_html.concat(tmp);
        //document.querySelector('#gate').innerHTML = tmp;
    }
    document.querySelector('#gate').innerHTML = new_html;
    console.log("done opening gate.");
    document.querySelector('#logged_in_user').innerHTML = data.name;

    // call display chanel function.
    display_channels(data);
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
function display_channels(data) {
    // Current channels upload
    const template = Handlebars.compile(document.querySelector('#channel_script').innerHTML);

    const channel_name = [];
    for (let i = 0; i < data.channel.length; i++) {
        channel_name.push(data.channel[i]);
    }

    // Add channel to DOM.
    const content = template({'value': channel_name});
    document.querySelector('#channels_div').innerHTML += content;
}
