var express = require('express'),
	cors = require('cors'),
	mysql = require('mysql'),
	http = require('http'),
	bodyParser = require('body-parser'),
	app = express();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'java76',
  password : '1111',
  database : 'ytmusic'
});

connection.connect();
console.log("연결 되었음.");

app.options('/', cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Content-Type', 'application/json');
  //res.header(200,{"Content-Type": "application/json"});
  next();
});

app.post('/', function (req, res) {
	for (var i = 0; i < req.length; i++) {
		  var title = req[i].title;
		  var artist = req[i].artist;
		  var img = req[i].img;
		  var kind = "실시간";
		  var id = req[i].id;
		  connection.query(
				  'insert into chart_music(title, artist, img, c_kind, m_id) values(?,?,?,?,?)',
				  [title, artist, img, kind, id],
				  function(err, rows, fields) {
					  if (err) throw err;
					  console.log("insert 완료 " + i);
					  if(i === req.length-1) {
						  res.json({status: "success"});
					  }
				  }
		  );
	  }
});


app.get('/', function (req, res) {
	res.send('get 요청 페이지');
});

app.listen(8083, function () {
  console.log('listening on port 8083!');
});