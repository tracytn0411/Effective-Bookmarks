//Dependencies
require('dotenv').config()
var express = require('express');
var app = express();
var cors = require('cors');
var path = require('path');
var PORT = process.env.PORT || 5000
var mysql = require('mysql'); 
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
//app.use(cors);

//Connect to MySQL via JawsDB
var connection = mysql.createConnection(process.env.JAWSDB_NAVY_URL);
connection.connect();

//Use for offline testing
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',pu
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
  connection.query('SELECT * FROM subcategories', function (error, results, fields) {
    if (error) res.send(error)
    else res.send(results)
  })
})

app.post('/displayURL', function(req, res) {
  connection.query('SELECT * FROM bookmarks where subcat_id = ?',[req.body.subcat_id], function (error, results, fields) {
    if (error) res.send(error)
    else res.send(results)
  })
})

// app.get('/addMenu', function(req, res) {
//   connection.query('SELECT t1.cat_id AS cat_id, t1.id AS subcat_id, t1.subcat_name AS subcat_name, categories.category_name AS cat_name FROM (SELECT cat_id, id, subcat_name FROM subcategories) AS t1 LEFT JOIN categories ON t1.cat_id = categories.id', function (error, results, fields) {
//     if (error) res.send(error)
//     else res.send(results)
//   })
// })

// app.post('/addMenu', function(req, res) {
//   connection.query('SELECT * FROM subcategories WHERE cat_id = ?',[req.body.parent_catID], function (error, results, fields) {
//     if (error) res.send(error)
//     else {
//       console.log(req.body.parent_catID)
//       res.send(results)
//     }
//   })
// })

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
          res.redirect('/')
        }
    });
})

app.post('/insertURL', function(req, res) {
  connection.query ('INSERT INTO bookmarks (cat_id, subcat_id, bookmark_name, bookmark_url) VALUES (?,?,?,?)', [req.body.cat_id, req.body.subcat_id, req.body.bookmark_name, req.body.bookmark_url], function(error, results, fields){
    if (error) res.send(error)
    else res.redirect('/')
  })
})

app.delete('/removeUrl', function(req, res) {
  connection.query ('DELETE FROM bookmarks WHERE id = ?', [req.body.id], function(error, results, fields){
    if (error) res.send(error)
    else res.redirect('/')
  })
})
app.delete('/removeRecent', function(req, res) {
  connection.query ('DELETE FROM recentAdded WHERE id = ?', [req.body.id], function(error, results, fields){
    if (error) res.send(error)
    else res.redirect('/')
  })
})

app.post('/extension', function(req, res){
  console.log(req.body)

  connection.query ('INSERT INTO recentAdded (current_title, current_url) VALUES (?,?)', [req.body.tab_title, req.body.tab_url], function(error, results, fields){
    if (error) res.send(error)
    else {
        connection.query('SELECT * FROM recentAdded', function (error, results, fields){
          if (error) return res.send(error)
          res.json({sucess: true});
        })
      }
  });
})

app.get('/extension',function(req, res) {
  connection.query ('SELECT * FROM recentAdded', function (error, results, fields){
    if (error) res.send(error)
    else res.send(results)
  })
})

app.listen(PORT, () => console.log(`listening on ${ PORT }`))

