/**
 * Created by phamquangkhang on 4/12/17.
 */
'use strict';

/****************************** Variables ******************************/

var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


/****************************** Mongo DB  ******************************/
var db_username = require("./app_config.json").MONGO_DATABASE_USERNAME;
var db_password = require("./app_config.json").MONGO_DATABASE_PASSWORD;
var db_url = require("./app_config.json").MONGO_DATABASE_URL;
var connection_string = "mongodb://" + db_username + ":" + db_password + db_url;
mongoose.connect(connection_string);
//mongoose.connect('mongodb://localhost/techkids');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error: '));
db.once('open', function () {
    console.log('DB connection success! ');
});

/****************************** app Express config  ******************************/
var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + "/public/views");
app.use('/', express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
require('./routes')(app);

/******************************   ******************************/

/******************************  CONFIG HTTP SERVER  ******************************/

var server = http.createServer(app).listen(
    (process.env.PORT || require("./app_config.json").SERVER_PORT),
    function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log("Example app listening at http://%s:%s", host, port);
    }
);