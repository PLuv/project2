document.addEventListener('DOMContentLoaded', () => {
    // Check if username exists on localStorage.
    if (localStorage.getItem("username") === null) {
        document.querySelector('#modal_1').style.display = "block";

        // Read form username.
        document.querySelector('#form1').onsubmit = () => {

            // initialize new request
            const request = new XMLHttpRequest();
            const new_user = document.querySelector('#user_name').value;
            console.log(new_user);

            // open request
            request.open('POST', '/check_in');

            // Callback function for when request completes
            request.onload = () => {

                // Extract JSON data from request
                const data = JSON.parse(request.responseText);

                // update the result div
                if (data.success) {
                    const contents = `You are now logged in as ${data.rate} ${new_user}!`
                    document.querySelector('#result').innerHTML = contents;
                    console.log("Success recieved");
                }
                else {
                    document.querySelector('#result').innerHTML = 'There was an error logging you in.';
                }
            }

            // Add data to send with request
            const data = new FormData();
            data.append('new_user', new_user);

            // Send request
            request.send(data);
            return false;
        };

    }

//End of file
});
