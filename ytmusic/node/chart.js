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

var saved_time = 0;
var currentTime= (new Date().getTime())/1000;

app.post('/', function (req, res) {
	var status = req.body.status;
	var kind = parseInt(req.body.c_kind);
	var checkTime = parseInt(req.body.checkTime);
	var limit = parseInt(req.body.limit);
	
	console.log("kind : " + kind + " / checkTime : " + checkTime + " / limit : " + limit);
	if(status === "check") {
		connection.query("select S_TIME from check_time where C_KIND=?",
				[kind],
			function(err, rows, fields) {
				if (err) throw err;
				saved_time = rows[0].S_TIME;
				console.log("저장된 시간 : " + saved_time);
				
				console.log("saved_time + checkTime = " + (saved_time + checkTime));
				if((saved_time + checkTime) < currentTime) { // '<' 일때 업데이트
					connection.query("update check_time set S_TIME=? where C_KIND=?",
							[currentTime, kind],
							function(err, rows, fields) {
								console.log("<<UPDATE>>");
								if (err) throw err;
								//기존 실시간차트 삭제 
								
							}
					);
					connection.query("delete from chart_music where C_KIND=?",
							[kind],
							function(err, rows, fields) {
								if (err) throw err;
								console.log("<<Delete>>");
								//실시간 차트 업데이트하기
								res.status(200).json({status: "new"});
							}
					);

				} else {
					connection.query("select * from chart_music where C_KIND=? limit ?",
							[kind,limit],
							function(err, rows, fields) {
								if (err) throw err;
								console.log("success 기존 데이터 전송");
								//console.log(rows);
								res.status(200).json({status: "success", data: rows});
							}
					);
				}
			}
		);
	} else if(status === "todayUpdate") {
		console.log("todayUpdate 호출");
		var array = JSON.parse(req.body.data);
		var result = "";
		console.log(array.length);
		for (var i = 0; i < array.length; i++) {
			  //console.log(array[i]);
			  var y_title = array[i].y_title;
			  //console.log("y_title : " + y_title);
			  var title = array[i].title;
			  var artist = array[i].artist;
			  var img = array[i].img;
			  var c_kind = array[i].c_kind;
			  var id = array[i].id;
			  connection.query(
					  'insert into chart_music(Y_TITLE, TITLE, ARTIST, IMG, C_KIND, ID) values(?,?,?,?,?,?)',
					  [y_title, title, artist, img, c_kind, id],
					  function(err, rows, fields) {
						  if (err) throw err;
						  console.log("insert 완료 " + i);
						  
					  }
			  );
		  }
		  //if(i === (array.length-1)) {
			  res.json({status: "success", data: "완료"});
			  console.log("-----------------완료---------------");
		  //}
	} else if(status === "chartUpdate") {
		console.log("chartUpdate 호출");
		var array = JSON.parse(req.body.data);
		console.log(array.length);
		for (var i = 0; i < array.length; i++) {
			  //console.log(array[i]);
			  var y_title = array[i].y_title;
			  //console.log("y_title : " + y_title);
			  var title = array[i].title;
			  var artist = array[i].artist;
			  var img = array[i].img;
			  var c_kind = array[i].c_kind;
			  var id = array[i].id;
			  connection.query(
					  'insert into chart_music(Y_TITLE, TITLE, ARTIST, IMG, C_KIND, ID) values(?,?,?,?,?,?)',
					  [y_title, title, artist, img, c_kind, id],
					  function(err, rows, fields) {
						  if (err) throw err;
						  
						  console.log("insert 완료 " + i);
					  }
			  );
		  }
	  res.json({status: "success", data: "완료"});
	  console.log("-----------------완료---------------");
	  
	} else if (status === "list") {
		connection.query("select * from chart_music where C_KIND=? limit ?",
				[kind, limit],
				function(err, rows, fields) {
					if (err) throw err;
					console.log("success 기존 데이터 전송");
					//console.log(rows);
					res.status(200).json({status: "success", data: rows});
				}
		);
	}
});

app.get('/', function (req, res) {
	res.send('get 요청 페이지');
});

app.listen(8082, function () {
  console.log('listening on port 8082!');
});
