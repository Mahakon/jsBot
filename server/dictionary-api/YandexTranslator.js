const props = require('./props.json')
class YandexTranslator {
    constructor(http) {
        this.http = http;
    }

    translatePhrase(chatId, text, callback) {
        this.get(text, function (mes) {
            callback(mes);
        });
    }

    get(text, callback) {
        var options = {
            url: props.host + props.path + "?key=" + props.key +
            "&text=" + text + "&lang=" + props.lang,
            method: 'GET',
        };


        var req = this.http.get(options.url, function(resp) {
            resp.setEncoding('utf8');

            console.log(resp.statusCode);

            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                console.log(JSON.parse(data).text);
                callback(JSON.parse(data).text);
                //console.log(chatId);
                //this.sender.postMes(this.chatId, JSON.parse(data).text);
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }
}

module.exports = YandexTranslator;