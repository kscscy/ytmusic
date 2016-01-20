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
	connection.query(
			'SELECT * from member where EMAIL='+mysql.escape(req.body.email), 
			function(err, rows, fields) { // 서버에서 결과를 받았을 때 호출되는 함수(비동기)
				if (err) throw err;
				if (rows.length===0) {
					console.log("새거");
					res.json({status:'success'});
				} else {
					//console.log("이미존재하는 이메일");
					res.json({status:'fail'});
					console.log(rows);
					//res.send(200,'fail');
				}
			});
  //res.send('Hello World!');
  
});

app.get('/', function (req, res) {
	res.send('get 요청 페이지');
});

app.listen(8081, function () {
  console.log('listening on port 8081!');
});

