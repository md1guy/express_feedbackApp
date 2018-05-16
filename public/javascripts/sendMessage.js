function sendMessage() {
    
    let xhr = new XMLHttpRequest();

    xhr.open('POST', '/sendFeedback', true);

    xhr.send(JSON.stringify({
        name: document.getElementById('name_field').value,
        message: document.getElementById('message_field').value
    }));

    document.getElementById('name_field').value = '';
    document.getElementById('message_field').value = '';

    return false;
}