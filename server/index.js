const path = require('path');
const http = require('https');
const express = require('express');
const bodyParser = require('body-parser');

const Subscription = require('./subscribe/Subscription');
const MesSender = require('./post-mes/MesSender');
const DataBase  = require('./users/DataBase');
const YandexTranslator = require('./dictionary-api/YandexTranslator');

const app = express();
const PORT = process.env.PORT || 3000;

var configs = require('./resources/app-props.json');
var bd = require('../bd.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

new Subscription(http, configs).postRequest();

var sender = new MesSender(http, configs);

var translator = new YandexTranslator(http);

app.post('/mes',function(req, res) {

    console.log(req.body.message.text);
    translator.translatePhrase(req.body.recipient.chat_id,
                                req.body.message.text, function (mes) {
            sender.postMes(req.body.recipient.chat_id, mes.toString())
        });

});

app.listen(PORT, () =>
            console.log('Express app listening on localhost: ' + PORT));