$(function () { 
	console.log("!!");
	PlanetX.init( {
	  appkey : "eccc19db-10eb-3194-88f4-9e80d9d368c4" ,   // 본인의 appkey 정보 입력
	  client_id : "3a0c9d41-64af-3248-ad43-da4810b23d84", // 본인의 client id 정보 입력
	  redirect_uri : 'http://localhost:8080/ytmusic/index.html',
	  scope : "melon,user",              // 앱에서 접근할 수 있는 서비스 리스트
	   /*savingToken : true                  // Token 자동 저장 옵션 (default : true) */ 
	  } );
	console.log("!!");
	
	userprofile();
	userprofile2();
});

function userprofile() {
  PlanetX.api("get", "http://apis.skplanetx.com/melon/newreleases/albums?count=10&page=1&version=1", "JSON", {'version': 1}, userProfile_callback);
};
function userprofile2() {
	  PlanetX.api("get", "http://apis.skplanetx.com/melon/charts/realtime?count=10&page=1&version=1", "JSON", {'version': 1}, userProfile_callback2);
};

//main slider
function userProfile_callback(data) {
  var array = data.melon.albums.album;
  console.log(array);
  $.each(array, function(index,item){
	  var albumName = item.albumName;
	  var artistName = item.repArtists.artist[0].artistName;
	  var keyword = artistName + " " + albumName;
	  gapi.client.setApiKey('AIzaSyDBgX7Mi8lKTH5pSvx3L_hhz8bCxP2-WP0');
	  gapi.client.load('youtube', 'v3', function() {
	  	var q = keyword;
	    var request = gapi.client.youtube.search.list({
	            q: q,
	            part: 'snippet',
	            maxResults: 1
	        });
	        request.execute(function(response) {
	                $('#').empty();
	                
	                var resultItems = response.result.items;
	                var i = 1;
	                $.each(resultItems, function(index, item) {
	                  title = item.snippet.title;
	                  videoId = item.id.videoId;
	                  vidThumburl =  item.snippet.thumbnails.high.url;
	                  vidThumbimg =
	                	  '<div class="mainSliderImg" data-p="112.50" style="display: none; height:300px; overflow: hidden;">'
	                	  +'<img class="mainimg" data-u="image" src="'+vidThumburl+'" style="height:300px; z-index: -1; position:;">'
	                	  +'<div class="mainSliderDiv" style="">'
	                      +'<span class="glyphicon glyphicon-play-circle" aria-hidden="true" style=""/>'
	                	  +'</div>'
	                	  +'<div style="background-color: black; opacity: 0.7; width: 100%; height: 50px; bottom: 0; position: absolute;">'
	                	  +'<p class="mainSliderImg" style="width: 341px; position: absolute; margin: 0 auto; bottom: 30px; padding: 0px 20px; overflow: hidden; text-align:center;"><a style="color:white;">'+albumName+'</a></p>'
	                	  +'<p class="mainSliderImg" style="width: 341px; position: absolute; margin: 0 auto; bottom: 0; padding: 0px 20px 2px 20px; overflow: hidden; text-align:center;"><a style="color:white;">'+artistName+'</a></p>'
	                	  +'</div>'
	                	  +'</div>';
	                  
	                  $('#slider1').append(vidThumbimg);
	                  i++;
	              });
	        });
	    });
  });
}

function userProfile_callback2(data) {
	  var i = 1;
	  var array = data.melon.songs.song;
	  console.log(array);
	  $.each(array, function(index,item){
		  console.log("index : " + index);
		  var artists = item.artists.artist;
		  var artistN = " "; /*item.artists.artist[0].artistName; console.log("artistName : " + artistN);*/
		  var artistFN = item.artists.artist[0].artistName;
		  $.each(artists, function(index,i) {
			  artistN += i.artistName + " ";
			  //console.log("i : "+artistN);
		  });
		  
		  var songN = item.songName; console.log("songName : " + songN);
		  var keyword = artistN + " " + songN;
		  
		  gapi.client.setApiKey('AIzaSyDBgX7Mi8lKTH5pSvx3L_hhz8bCxP2-WP0');
		  gapi.client.load('youtube', 'v3', function() {
		  	var q = keyword;
		    var request = gapi.client.youtube.search.list({
		            q: q,
		            part: 'snippet',
		            maxResults: 1
		        });
		        request.execute(function(response) {
		                $('#chartTbody').empty();
		                
		                var resultItems = response.result.items;
		                
		                $.each(resultItems, function(index, item) {
		                  title = item.snippet.title;
		                  videoId = item.id.videoId;
		                  vidThumburl =  item.snippet.thumbnails.high.url;
		                  var result =  '<tr class="chart">'
		                	  +'<td class="ranking" ><strong class="num1">'+i+'</strong></td>'
		                	  /*+'<td class="ranking" >'
		                	  +'<p class="change up" >'
		                	  +'<span class="arrow"></span> <em></em> <span><!-- 계단 상승 --></span>'
		                	  +'</p>'
		                	  +'</td>'*/
		                	  +'<!-- 곡 -->'
		                	  +'<th scope="row" class="chartImgTitle">'
		                	  +'<div class="chartImg">'
		                	  +'<a href=""'
		                	  +'title="'+songN+'" style="width: 50px; height: 50px; position: relative; float: left;"> <span class="mask"></span>'
		                	  +'<img src="'+vidThumburl+'" style="width:50px; height:50px;" alt="'+songN+'">'
		                	  +'</a>'
		                	  +'<p class="" style=" position: relative; float: left; left: 10px; top: 14px;">'
		                	  +'<a href="" title="'+songN+'">'+songN+'</a>'
		                	  +'</p>'
		                	  +'</div>'
		                	  +'<p class="chartTitle" style="relative; float: left; left: 10px; top: 0px;">'
		                	  +'<a href="" title="'+songN+'">'+songN+'</a>'
		                	  +'</p>'
		                	  +'</th>'
		                	  +'<!-- 아티스트 -->'
		                	  +'<td class="left">'
		                	  +'<p class="artist" >'
		                	  +'<a href="" title="'+artistFN+'">'+artistFN+'</a>'
		                	  +'</p>'
		                	  +'</td>'
		                	  +'<!-- 재생 -->'
		                	  +'<td><a href="javascript:;" onclick="" style="font-weight: bold;" class="glyphicon glyphicon-play-circle" title="'+songN+' 듣기"></a></td>'
		                	  +'<!-- 목록 -->'
		                	  +'<td><a href="javascript:;" onclick="" class="glyphicon glyphicon-plus" title="'+songN+' 추가 하기"></a></td>'
		                	  +'<!-- 기타 -->'
		                	  +'<td><a href="javascript:;" onclick=""'
		                	  +'class="glyphicon glyphicon-option-vertical" title="'+songN+' 기타 기능"></a>'
		                	  +'</td>'
		                	  +'</tr>';
		                  $('#mchart').append(result);
		                  $('#mchart2').append(result);
		                  i++;
		              });
		        });
		    });
	  });
	}
