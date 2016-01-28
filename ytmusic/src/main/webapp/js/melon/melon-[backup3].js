$(function () { 
	console.log("!!");
/*	PlanetX.init( {
	  appkey : "eccc19db-10eb-3194-88f4-9e80d9d368c4" ,   // 본인의 appkey 정보 입력
	  client_id : "3a0c9d41-64af-3248-ad43-da4810b23d84", // 본인의 client id 정보 입력
	  redirect_uri : 'http://localhost:8080/ytmusic/index.html',
	  scope : "melon,user",              // 앱에서 접근할 수 있는 서비스 리스트
	   savingToken : true                  // Token 자동 저장 옵션 (default : true)  
	  } );*/
	console.log("!!");
	
	callMelonToday();
	callMelonChart();
	nedamuChart();
});

function callMelonToday() {
  PlanetX.api("get", "http://apis.skplanetx.com/melon/newreleases/albums?count=10&page=1&version=1", "JSON", {'version': 1}, melonToday);
};
function callMelonChart() {
	  PlanetX.api("get", "http://apis.skplanetx.com/melon/charts/realtime?count=10&page=1&version=1", "JSON", {'version': 1}, melonChart);
};

//main slider
function melonToday(data) {
	
  var array = data.melon.albums.album;
  
/*  console.log(array);
*/  
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
	                var resultItems = response.result.items;
	                var i = 1;
	                $.each(resultItems, function(index, item) {
	                  title = item.snippet.title;
	                  videoId = item.id.videoId;
	                  vidThumburl =  item.snippet.thumbnails.high.url;
	                  result =
	                	  '<div class="mainSliderImg" data-p="112.50" style="display: none; height:300px; overflow: hidden;">'
	                	  +'<img class="mainimg" data-u="image" src="'+vidThumburl+'" style="height:300px; z-index: -1; position:;">'
	                	  +'<div class="mainSliderDiv" style="">'
	                      +'<span id="pMusicBtn2'+videoId+'" class="glyphicon glyphicon-play-circle" aria-hidden="true" style=""/>'
	                	  +'</div>'
	                	  +'<div style="background-color: black; opacity: 0.7; width: 100%; height: 50px; bottom: 0; position: absolute;">'
	                	  +'<p class="mainSliderImg" style="width: 341px; position: absolute; margin: 0 auto; bottom: 30px; padding: 0px 20px; overflow: hidden; text-align:center;"><a style="color:white;">'+albumName+'</a></p>'
	                	  +'<p class="mainSliderImg" style="width: 341px; position: absolute; margin: 0 auto; bottom: 0; padding: 0px 20px 2px 20px; overflow: hidden; text-align:center;"><a style="color:white;">'+artistName+'</a></p>'
	                	  +'</div>'
	                	  +'</div>';
	                  
	                  $('#slider1').append(result);
	                  
	                  $('#pMusicBtn2'+videoId).click(function() {
	                    	console.log("function click!!");
	                    	melonMusicPlayer(item);
	                    });
	                  i++;
	              });
	        });
	    });
  });
}

function melonChart(data) {
	  var i = 1;
	  var array = data.melon.songs.song;
/*	  console.log(array);
*/	  $.each(array, function(index,item){
/*		  console.log("index : " + index);
*/		  var artists = item.artists.artist;
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
		                  vidThumburl =  item.snippet.thumbnails.default.url;
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
		                	  +'<td><span id="melonBtn'+videoId+'" style="font-weight: bold;" class="glyphicon glyphicon-play-circle" title="'+songN+' 듣기"></span></td>'
		                	  +'<!-- 목록 -->'
		                	  +'<td><span href="javascript:;" onclick="" class="glyphicon glyphicon-plus" title="'+songN+' 추가 하기"></span></td>'
		                	  +'<!-- 기타 -->'
		                	  +'<td><span href="javascript:;" onclick=""'
		                	  +'class="glyphicon glyphicon-option-vertical" title="'+songN+' 기타 기능"></span>'
		                	  +'</td>'
		                	  +'</tr>';
		                  $('#mchart').append(result);
		                  
		                  $('#melonBtn'+videoId).click(function() {
		                    	console.log("melon click");
		                    	melonMusicPlayer(item);
		                    });
		                  i++;
		              });
		        });
		    });
	  });
	}

function melonMusicPlayer(item) {
	$(footer).empty();
	console.log(item);
	var title = item.title;
	var vid = item.id.videoId;
	var musicImage = item.snippet.thumbnails.medium.url;
	
	/*var musicUrl = "audio/" + vid + ".m4a";*/
	$.getJSON('music/ajax/musicPlay.do?music_id='+vid+'&title='+title+'&img='+musicImage, function(resultObj) {
        var ajaxResult = resultObj.ajaxResult;
        if (ajaxResult.status == "success") {
            $(footer).append('<audio controls="" autoplay="" name="media"><source src = '+ajaxResult.data+' type="audio/webm"></audio>');
            $(footer).append('<a href="'+ajaxResult+'" download="aaac.aac">다운로드</a>');
            console.log("playMusic : 완료");
	    	/*setTimeout(createMusic(musicUrl), 2500);*/
        }
	}); 
}



function nedamuChart() {
	var result;
	var i = 0;
	$.getJSON('music/ajax/list.do', function(resultObj) {
		console.log(resultObj);
		result = resultObj.data;
		console.log(result);
	    if (resultObj.status == "success") {
	    	$.each(result, function(index, item) {
	    		i++;
	          var title = item.title;
	          var titleSplit = title.split('-');
	          var artistN = "";
	          var songN = "";
	          if(titleSplit.length == 2) {
	        	  artistN = titleSplit[0];
	        	  songN += titleSplit[1];
	          } else {
	        	  var titleSplit = title.split('_');
	        	  artistN = titleSplit[0];
	        	  songN += titleSplit[1];
	          }
	          var songN2;
	          var songN3;
        	  
	          /*if(songN.byteLength() > 30) {*/
	          if(byteLength(songN) > 30) {
	        	  songN2 = songN.substring(0, 30) + "..";
	        	  songN3 = songN.substring(0, 20) + "..";
	          } else {
	        	  songN2 = songN;
	        	  songN3 = songN;
	          }
	          
	          var artistN2;
	          /*if(artistN.byteLength() > 12) {*/
	          if(byteLength(artistN) > 10) {
	        	  artistN2 = artistN.substring(0, 10) + "..";
	          } else {
	        	  artistN2 = artistN;
	          }

	          
	          console.log(item);
	          var videoId = item.music_id;
	          var vidThumburl = item.img;
	    	  var result =  '<tr class="chart">'
	    		  +'<td class="ranking" ><strong class="num1">'+i+'</strong></td>'
	    		  +'<!-- 곡 -->'
	    		  +'<th scope="row" class="chartImgTitle">'
	    		  +'<div class="chartImg">'
	    		  +'<a href=""'
	    		  +'title="'+songN+'" style="width: 50px; height: 50px; position: relative; float: left;"> <span class="mask"></span>'
	    		  +'<img src="'+vidThumburl+'" style="width:50px; height:50px;" alt="'+songN+'">'
	    		  +'</a>'
	    		  +'<p class="" style=" position: relative; float: left; left: 10px; top: 14px;">'
	    		  +'<a href="" title="'+songN+'">'+songN3+'</a>'
	    		  +'</p>'
	    		  +'</div>'
	    		  +'<p class="chartTitle" style="relative; float: left; left: 10px; top: 0px;">'
	    		  +'<a href="" title="'+songN+'">'+songN2+'</a>'
	    		  +'</p>'
	    		  +'</th>'
	    		  +'<!-- 아티스트 -->'
	    		  +'<td class="left">'
	    		  +'<p class="artist" >'
	    		  +'<a href="" title="'+artistN+'">'+artistN2+'</a>'
	    		  +'</p>'
	    		  +'</td>'
	    		  +'<!-- 재생 -->'
	        	  +'<td><span id="nedamuBtn'+videoId+'" style="font-weight: bold;" class="glyphicon glyphicon-play-circle" title="'+songN+' 듣기"></span></td>'
	        	  +'<!-- 목록 -->'
	        	  +'<td><span href="javascript:;" onclick="" class="glyphicon glyphicon-plus" title="'+songN+' 추가 하기"></span></td>'
	        	  +'<!-- 기타 -->'
	        	  +'<td><span href="javascript:;" onclick=""'
	        	  +'class="glyphicon glyphicon-option-vertical" title="'+songN+' 기타 기능"></span>'
	        	  +'</td>'
	        	  +'</tr>';
	    	  $('#mchart2').append(result);
	          
	          $('#nedamuBtn'+videoId).click(function() {
	            	console.log("melon click");
	            	nemamuMusicPlayer(item);
	            });
	    	});
	    }
	}); 

}

function nemamuMusicPlayer(item) {
	$(footer).empty();
	console.log(item);
	var title = item.title;
	var vid = item.music_id;
	var musicImage = item.img;
	
	/*var musicUrl = "audio/" + vid + ".m4a";*/
	$.getJSON('music/ajax/musicPlay.do?music_id='+vid+'&title='+title+'&img='+musicImage, function(resultObj) {
        var ajaxResult = resultObj.ajaxResult;
        console.log(ajaxResult);
        if (ajaxResult.status == "success") {
            $(footer).append('<audio controls="" autoplay="" name="media"><source src = '+ajaxResult.data+' type="audio/webm"></audio>');
            $(footer).append('<a href="'+ajaxResult+'" download="aaac.aac">다운로드</a>');
            console.log("playMusic : 완료");
	    	/*setTimeout(createMusic(musicUrl), 2500);*/
        }
	}); 
}

function byteLength(obj) {
	   var str = obj;
	   var _byte = 0;
	   /*console.log("str : " + str);*/
	   if(str.length != 0) {
		  for (var i=0; i < str.length; i++) {
		      var str2 = str.charAt(i);
		      /*console.log("--> " + escape(str2).length);*/
		      if(escape(str2).length > 4) {
	             _byte += 3;
		      } else {
		    	 _byte++;
		      }
		  }
	   }
	/*   console.log(" ");*/
	   return _byte;
}
