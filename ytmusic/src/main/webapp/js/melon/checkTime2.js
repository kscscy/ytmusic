var express = require('express'),
	cors = require('cors'),
	mysql = require('mysql'),
	http = require('http'),
	bodyParser = require('body-parser'),
	site1 = express.createServer(),
	site2 = express.createServer(),
	site_vhosts = [],
	vhost;

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'java76',
  password : '1111',
  database : 'ytmusic'
});

connection.connect();
console.log("연결 되었음.");

site1.options('/', cors());
site1.use(bodyParser.urlencoded({ extended: false }));
site1.use(bodyParser.json());
site1.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Content-Type', 'site1lication/json');
  //res.header(200,{"Content-Type": "site1lication/json"});
  next();
});

var saved_time = 0;
var currentTime= (new Date().getTime())/1000;

site1.post('/', function (req, res) {
	connection.query(
		"select * from check_time",
		function(err, rows, fields) {
			if (err) throw err;
			saved_time = rows[0].S_TIME;
			console.log("실행 : " + rows[0].S_TIME);
			console.log(req.body.status);
			var result = checkTime();
			res.json({status: result});
		}
	);
});


function checkTime() {
	if(saved_time + 3600 < currentTime) {
		connection.query(
				"update check_time set S_TIME=" + currentTime,
				function(err, rows, fields) {
					if (err) throw err;
					console.log("완료 : " + currentTime);
					//기존 실시간차트 삭제 
					return deleteRealTimeChart();
				}
		);
	} else {
		return "success";
	}
}

function deleteRealTimeChart() {
	connection.query(
			"delete from chart_music where C_KIND="+"실시간",
			function(err, rows, fields) {
				if (err) throw err;
				console.log("완료 : " + currentTime);
				//실시간 차트 업데이트하기
				return "new";
			}
	);
}

site1.get('/', function (req, res) {
	res.send('get 요청 페이지');
});

site1.listen(8082, function () {
  console.log('listening on port 8082!');
});




site_vhosts.push(express.vhost('example.com', site1));
site_vhosts.push(express.vhost('sub.example.com', site2));

vhost = express.createServer.site1ly(this, site_vhosts);

site1.listen(8082);
site2.listen(8083);
vhost.listen(80);
