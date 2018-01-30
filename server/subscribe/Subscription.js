class Subscription {
    constructor(http, configs){
        this.http = http;
        this.configs = configs;
    }

    postRequest() {
        var data = JSON.stringify({
            url: this.configs.access_url
        });

        var options = {
            host: this.configs.host,
            path: this.configs.path_sub + this.configs.access_token,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        };

        var req = this.http.request(options, function(res) {
            res.setEncoding('utf8');

            res.on('data', function (chunk) {
                //console.log("body: " + chunk);
                if (JSON.parse(chunk).success) {
                    console.log("subscrition was successful");
                } else {
                    console.log("subscription went wrong");
                }
            });
        });
        req.write(data);
        req.end();
    }
}

module.exports = Subscription;