class MesSender {
    constructor(http, configs) {
        this.http = http;
        this.configs = configs;
    }

    postMes(chatId, mes) {
        var data = JSON.stringify({
            recipient: {
                chat_id: chatId
            },
            message: {
                text: mes
            }
        });

        var options = {
            host: this.configs.host,
            path: this.configs.path_post + chatId +
                    "?access_token=" + this.configs.access_token,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        };

        var req = this.http.request(options, function(res) {
            res.setEncoding('utf8');
        });

        req.write(data);
        req.end();
    }
}

module.exports = MesSender;