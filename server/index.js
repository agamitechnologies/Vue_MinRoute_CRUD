const express = require('express');
const minRoute = require('min-route')
const requestIp = require('request-ip');
const useragent = require('express-useragent');
const bodyParser = require("body-parser");
require("./config/database");
const app = express();
app
    .use(bodyParser.json({ limit: "50mb", extended: true }))
    .use(express.static("public"))
    .use(
        bodyParser.urlencoded({
            extended: false,
            limit: "100mb"
        })
    )
    .use(requestIp.mw())
    .use(useragent.express())
    .use((request, response, next) => {
        response.header("Access-Control-Allow-Origin", "*");
        response.header(
            "Access-Control-Allow-Methods",
            "GET,HEAD,OPTIONS,POST,PUT,DELETE"
        );
        response.header(
            "Access-Control-Allow-Headers",
            "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization, refreshToken"
        );
        next();
    })


minRoute.api(app, [`${__dirname}/controller/user.js`])

app.listen(9000, () => { console.log('server running..') });
