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
//app.use(cors);

//Connect to MySQL via JawsDB
var connection = mysql.createConnection(process.env.JAWSDB_NAVY_URL);
connection.connect();

//Use for offline testing
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'password',
//   database : 'bookmarks_db'
// });
// connection.connect();

//Routes 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('/displaycat', function(req,res) {
  connection.query('SELECT * FROM categories', function (error, results, fields) {
    if (error) res.send(error)
    else res.send(results);
  })
})

app.get('/displaySubcat', function(req, res) {
  connection.query('SELECT * FROM subcategories', function (error, results, fileds) {
    if (error) res.send(error)
    else res.send(results)
  })
})

app.post('/insertcat', function(req, res) {
    connection.query ('INSERT INTO categories (category_name) VALUES (?)', [req.body.category_name], function(error, results, fields){
      if (error) res.send(error)
      else {
          res.redirect('/')
        }
    });
})
app.post('/insertSubcat', function(req, res) {
    connection.query ('INSERT INTO subcategories (cat_id, subcat_name) VALUES (?,?)', [req.body.cat_id, req.body.subcat_name], function(error, results, fields){
      if (error) res.send(error)
      else {
          connection.query('SELECT * FROM subcategories', function (error, results, fields){
            if (error) res.send(error)
            else res.send(results);
          })
        }
    });
})

app.post('/extension', function(req, res){
  console.log(req.body)

  //res.json({sucess: true})

  connection.query ('INSERT INTO recentlyAdded (url) VALUES (?)', [req.body.url], function(error, results, fields){
    if (error) res.send(error)
    else {
        connection.query('SELECT * FROM recentlyAdded', function (error, results, fields){
          if (error) return res.send(error)

          res.json({sucess: true});
        })
      }
  });
})

app.get('/extension',function(req, res) {
  connection.query ('SELECT url FROM recentlyAdded', function (error, results, fields){
    if (error) res.send(error)
    else res.send(results)
  })
})

app.listen(PORT, () => console.log(`listening on ${ PORT }`))

