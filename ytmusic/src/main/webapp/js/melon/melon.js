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
});

function userprofile() {
  PlanetX.api("get", "http://apis.skplanetx.com/melon/newreleases/albums?count=10&page=1&version=1", "JSON", {'version': 1}, userProfile_callback);
};
       
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
	                	  '<div data-p="112.50" style="display: none; height:300px; overflow: hidden;">'
	                	  +'<img data-u="image" src="'+vidThumburl+'" style="height:300px;">'
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
