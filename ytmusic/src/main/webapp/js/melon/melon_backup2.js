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
/*
<tr class="chart">
<td class="ranking" ><strong class="num1">1</strong></td>

<td class="ranking" >
  <p class="change up" >
    <span class="arrow"></span> <em>1</em> <span><!-- 계단 상승 --></span>
  </p>
</td>
<!-- 곡 -->
<th scope="row" class="chartImgTitle">
<div class="chartImg">
  <a href="http://music.bugs.co.kr/album/20017094?wl_ref=M_contents_03_02" class="thumbnail?"
    title="잘 지내고 있니 -페이지 이동" style="width: 50px; height: 50px; position: relative; float: left;"> <span class="mask"></span>
    <img src="https://i.ytimg.com/vi/A8QJ0ZnNX0E/hqdefault.jpg" style="width:50px; height:50px;" alt="잘 지내고 있니 앨범 대표이미지">
  </a>
  <p class="" style=" position: relative; float: left; left: 10px; top: 14px;">
    <a href="javascript:void(bugs.music.listen('30123636',true));bugs.wiselog.area('M_contents_03_03');" title="잘 지내고 있니 -페이지 이동">잘 지내고 있니</a>
  </p>
</div>
<p class="chartTitle" style="relative; float: left; left: 10px; top: 0px;">
  <a href="javascript:void(bugs.music.listen('30123636',true));bugs.wiselog.area('M_contents_03_03');" title="잘 지내고 있니 -페이지 이동">잘 지내고 있니</a>
</p>
</th>
<!-- 아티스트 -->
<td class="left">
  <p class="artist" >
    <a href="" title="t윤미래">t윤미래</a>
  </p>
</td>

<!-- 재생 -->
<td><a href="javascript:;" onclick="" style="font-weight: bold;" class="glyphicon glyphicon-play-circle" title="잘 지내고 있니 듣기"></a></td>
<!-- 목록 -->
<td><a href="javascript:;" onclick="" class="glyphicon glyphicon-plus" title="재생목록에 잘 지내고 있니 추가"></a></td>
<!-- 기타 -->
<td><a href="javascript:;" onclick="" track_title="잘 지내고 있니" artist_disp_nm="t 윤미래 &amp; 펀치(Punch)"
  class="glyphicon glyphicon-option-vertical" title="잘 지내고 있니의 기타 기능"></a>
</td>
</tr>*/