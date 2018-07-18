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
                    document.querySelector('#problem').style.display = 'block';
                    document.querySelector('#reason').innerHTML = `"Error: UserName ${data.name} already exists"`;
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

        // Add data to send with request
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
}
