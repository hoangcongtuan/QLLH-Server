"use strict";
let api = require('./src/api');
const fs = require('fs');

const express = require('express');
const app = express();

const PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080
const  ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'

app.get('/', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/json; charset=utf-8'
    });
    let date = new Date();
    date.setUTCHours(date.getUTCHours() + /*VN timeZone */ 7 + date.getTimezoneOffset() / 60);
    let nowTime = date.getHours() + ":" + date.getMinutes();
    let data = {
        status: "App is running",
        time: nowTime
    };
    res.end(JSON.stringify(data, null, 4));
});
// app.use(express.static('public'));
let delayTime = process.env.DELAY_TIME || 5 * 60 * 1000;    //default is 5 min
app.listen(PORT, ip, () => console.log("This app is running in Port: ", PORT));

let loadFeed = () => {

    setTimeout(api.loadPage, 10000);

    setInterval(api.loadPage, delayTime);
};
loadFeed();