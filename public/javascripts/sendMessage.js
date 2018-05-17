function sendMessage() {

    if (document.getElementById('message_field').value.length > 2000) {

        swal("Oops!", "Your message can't be longer than 2000 symbols.", "error");

        return false;
    }

    let xhr = new XMLHttpRequest();

    try {
        xhr.open('POST', '/sendFeedback', true);

        let name = document.getElementById('name_field').value;
        let email = document.getElementById('email_field').value;
        let message = document.getElementById('message_field').value;

        if(name.length == 0) {

            swal('Oops!', 'Please, enter your name.', 'error');

            return false;
        }

        if(!validateEmail(email) && email != '') {

            swal('Oops!', 'Invalid e-mail format. You may leave this field empty.', 'error');

            return false;
        }

        if (message.length > 2000) {

            swal("Oops!", "Your message can't be longer than 2000 symbols.", "error");
    
            return false;
        } 
        
        if (message.length == 0) {

            swal("Oops!", "Please, enter your message.", "error");
    
            return false;
        }

        xhr.send(JSON.stringify({
            name: name,
            email: email,
            message: message
        }));

        document.getElementById('name_field').value = '';
        document.getElementById('email_field').value = '';
        document.getElementById('message_field').value = '';

        swal('Done!', 'Succesfully sent message.', 'success');

        return false;
    } catch(e) {

        swal('Oops!', 'Something went wrong.', 'error');
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}