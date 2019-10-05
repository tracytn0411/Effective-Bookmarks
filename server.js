//Dependencies
require('dotenv').config()
var express = require('express');
var app = express();
var cors = require('cors');
var path = require('path');
var PORT = process.env.PORT || 5000
var mysql = require('mysql'); 
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors);

//Connect to MySQL via JawsDB
var connection = mysql.createConnection(process.env.JAWSDB_NAVY_URL);
connection.connect();

app.listen(PORT, () => console.log(`listening on ${ PORT }`))
