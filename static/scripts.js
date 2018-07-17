document.addEventListener('DOMContentLoaded', () => {
    // Check if username exists on localStorage.
    if (!localStorage.getItem("username")) {
        document.querySelector('#modal_1').style.display = "block";

        // Read form username.
        document.querySelector('#form1').onsubmit = () => {

            // initialize new request
            const request = new XMLHttpRequest();
            const new_user = document.querySelector('#user_name').value;

            // open request
            request.open('POST', '/check_in');

            // Callback function for when request completes
            request.onload = () => {

                // Extract JSON data from request
                const data = JSON.parse(request.responseText);

                // update the result div
                if (data.success) {
                    console.log("Success recieved");
                    document.querySelector('#modal_1').style.display = 'none';
                    document.querySelector('#entry').style.display = 'none';
                    // get gate string from server
                    alert(`"Welcome ${data.name}"`);
                    second_function(data);
                }
                else {
                    document.querySelector('#result').innerHTML = 'There was an error logging you in.';
                }
            };

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

function second_function (data) {
    console.log(data.key[0]);
    var new_html = '';
    for (i = 0; i < 38; i++) {
        tmp = data.key[i];
        new_html = new_html.concat(tmp);
        //document.querySelector('#gate').innerHTML = tmp;
    }
    document.querySelector('#gate').innerHTML = new_html;
    console.log("Here in second_function.");
    console.log("done opening gate.");
}