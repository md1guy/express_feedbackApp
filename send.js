const TelegramBot = require('node-telegram-bot-api');
const credentials = require('./bin/config.json').telegram;

const TOKEN = credentials.token;
const ID = credentials.id;

const bot = new TelegramBot(TOKEN, {
    polling: true
});

function send(message, res) {

    if (message.name === "") message.name = "name";
    if (message.email === "") message.email = "E-Mail";
    if (message.message === "") message.message = "message";

    bot.sendMessage(ID, `${message.name} (${message.email}):\n\n${message.message}`)
        .then(console.log(`${message.name} successfully sent message: ${message.message}`))
        .catch((error) => {
            console.error(error.code); // => 'ETELEGRAM'
            console.error(error.response.body); // => { ok: false, error_code: 400, description: 'Bad Request: chat not found' }
        });

    res.end('successfully sent message: ' + message.message);
}

module.exports = send;