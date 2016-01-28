$(function () { 
/*	PlanetX.init( {
	  appkey : "2f6df8cf-4753-3e98-8751-7db39b087571" ,   // 본인의 appkey 정보 입력
	  client_id : "3a0c9d41-64af-3248-ad43-da4810b23d84", // 본인의 client id 정보 입력
	  redirect_uri : 'http://localhost:8080/ytmusic/index.html',
	  scope : "melon,user",              // 앱에서 접근할 수 있는 서비스 리스트
	   savingToken : true                  // Token 자동 저장 옵션 (default : true)  
	  } );*/
	melonInit();
});

function melonInit() {
	$.ajax({
		url: "http://localhost:8082",
		type: 'POST',
		data: { 			
			status : "check",
			checkTime : "3600",
			c_kind : "1", // Today 신곡 차트
			data : "",
			limit : "15"
		},
		dataType:'json',
		beforeSend: function (xhr) {
			xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
		}
	}).done(function(resultObj) {
		var result = resultObj;
		if (result.status == "success") { //1시간이 지나지 않았을 때
			console.log("MelonToday - 1시간이 지나지 않았을 때");
			melonTodayInDB(result.data);
			callMelonChart();
		} else if (result.status == "new") { //1시간이 지났을 때 새로 멜론에 요청하여 값 설정.
			console.log("MelonToday - 1시간이 지났을 때 새로 멜론에 요청하여 값 설정");
			callMelonToday(); // 오늘 나온 노래 -> callMelonChart(); 멜론 차트			 
		}
	});
	nedamuChart();
}

function callMelonToday() {
	PlanetX.api("get", "http://apis.skplanetx.com/melon/newreleases/albums?count=15&page=1&version=1", "JSON", {'version': 1}, melonToday);
};

function callMelonChart() {
	
	$.ajax({
		url: "http://localhost:8082",
		type: 'POST',
		data: { 			
			status : "check",
			checkTime : "3600", //1시간 단위
			c_kind : "2", // 멜론 실시간 차트
			data : "",
		    limit : "10"
		},
		dataType:'json',
		beforeSend: function (xhr) {
			xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
		}
	}).done(function(resultObj) {
		var result = resultObj;
		if (result.status == "success") { //1시간이 지나지 않았을 때
			console.log("Melon차트 - 1시간이 지나지 않았을 때");
			melonChartInDB(result.data);
		} else if (result.status == "new") { //1시간이 지났을 때 새로 멜론에 요청하여 값 설정.
			console.log("Melon차트 - 1시간이 지났을 때 새로 멜론에 요청하여 값 설정");
			PlanetX.api("get", "http://apis.skplanetx.com/melon/charts/realtime?count=30&page=1&version=1", "JSON", {'version': 1}, melonChart);
			//callMelonChart(); // 오늘 나온 노래 -> callMelonChart(); 멜론 차트			 
		}
	});
};

/////////////////////////////////////////////////////////////////////////////////////////////////
//Today 슬라이더
function melonToday(data) {
  var num = 0; 
  console.log(data);
  var melonTodayResult = new Array(); // NodeJs에 전달되는 데이터
  var array = data.melon.albums.album;
  gapi.client.setApiKey('AIzaSyDBgX7Mi8lKTH5pSvx3L_hhz8bCxP2-WP0');

  gapi.client.load('youtube', 'v3', function() {
	$.each(array, function(index,item){
		
		var TITLE = item.repSongName;
		var ARTIST = item.repArtists.artist[0].artistName;
		var keyword = TITLE + " " + ARTIST;
		var q = keyword;
		var request = gapi.client.youtube.search.list({
			q: q,
			part: 'snippet',
			maxResults: 4
		});
		
		request.execute(function(response) {
			var check = 0;
			
			var resultItems = response.result.items;
			//console.log(response.result);
			if(resultItems != null) {
				++num;
			}
            $.each(resultItems, function(index, item2) {
            	if(item2 != null && item2.id.kind === "youtube#video") {
            		++check;	            		
    			}
            	
				if(check == 1 ) {
		    		++check;
						//console.log(item2.id.kind);
					
					Y_TITLE = item2.snippet.title;
					IMG=  item2.snippet.thumbnails.high.url;
					ID = item2.id.videoId;
					C_KIND = "1";
					var melonTodayItems = new Array(); // melonTodayResult에 저장되는 배열
					melonTodayItems = {"y_title" : Y_TITLE, "title" : TITLE, "artist" : ARTIST, "c_kind" : C_KIND, "id" : ID, "img" : IMG};
					melonTodayResult.push(melonTodayItems); //호출
					
					if(num < 11) {
						result =
							'<div class="mainSliderImg" data-p="112.50" style="display: none; height:300px; overflow: hidden;">'
							+'<img class="mainimg" data-u="image" src="'+IMG+'" style="height:300px; z-index: -1; position:;">'
			            	+'<div class="mainSliderDiv" style="">'
			                +'<span id="pMusicBtn2'+ID+'" class="glyphicon glyphicon-headphones" aria-hidden="true" style="color: red;"/>'
			                +'</div>'
			                +'<div style="background-color: black; opacity: 0.7; width: 100%; height: 50px; bottom: 0; position: absolute;">'
			          	    +'<p class="mainSliderImg" style="width: 341px; position: absolute; margin: 0 auto; bottom: 30px; padding: 0px 20px; overflow: hidden; text-align:center;"><a style="color:white;">'+TITLE+'</a></p>'
			          	    +'<p class="mainSliderImg" style="width: 341px; position: absolute; margin: 0 auto; bottom: 0; padding: 0px 20px 2px 20px; overflow: hidden; text-align:center;"><a style="color:white;">'+ARTIST+'</a></p>'
			          	    +'</div>'
			          	    +'</div>';
			              
			          	$('#slider1').append(result);
			          	
			          	var _item = {"Y_TITLE" : Y_TITLE, "IMG" : IMG, "ID" : ID};
	
			          	$('#pMusicBtn2'+ID).click(function() {
			            	console.log("melonToday player click!!");
	                    	playMusic2(_item);
			            });
		    		}
					
		        	if(num === 15) {
		        		insertMelonToday(melonTodayResult); // DB에 실시간 차트 갱신하기	
		        	}
				}
            });
		});
    });
  });
};

/////////////////////////////////////////////////////////////////////////////////////////////////
var insertMelonToday = function (melonTodayResult) {
	console.log(melonTodayResult);
	$.ajax({
		url: "http://localhost:8082",
		type: 'POST',
		data: {
			data : JSON.stringify(melonTodayResult),
			status : "todayUpdate"
		},
		dataType:'json',
		beforeSend: function (xhr) {
			xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
		}
	}).done(function(resultObj) {
		var result = resultObj;
		if (result.status == "success") {
			console.log(resultObj.md);
			callMelonChart();
			console.log("today insert 완료");
		} 
	});
}

/////////////////////////////////////////////////////////////////////////////////////////////////
function melonTodayInDB(data) {
	console.log("melonTodayInDB");
	console.log(data);
	$.each(data, function(index, item) {
			Y_TITLE = item.Y_TITLE;
			TITLE = item.TITLE;
			IMG =  item.IMG;
			ID = item.ID;
			C_KIND = item.C_KIND;
			ARTIST = item.ARTIST;
			result =
				'<div class="mainSliderImg" data-p="112.50" style="display: none; height:300px; overflow: hidden;">'
				+'<img class="mainimg" data-u="image" src="'+ IMG +'" style="height:300px; z-index: -1; position:;">'
	        	+'<div class="mainSliderDiv" style="">'
	            +'<span id="pMusicBtn2'+ ID +'" class="glyphicon glyphicon-headphones" aria-hidden="true" style="color: red;"/>'
	            +'</div>'
	            +'<div style="background-color: black; opacity: 0.7; width: 100%; height: 50px; bottom: 0; position: absolute;">'
	      	    +'<p class="mainSliderImg" style="width: 341px; position: absolute; margin: 0 auto; bottom: 30px; padding: 0px 20px; overflow: hidden; text-align:center;"><a style="color:white;">'+ TITLE +'</a></p>'
	      	    +'<p class="mainSliderImg" style="width: 341px; position: absolute; margin: 0 auto; bottom: 0; padding: 0px 20px 2px 20px; overflow: hidden; text-align:center;"><a style="color:white;">'+ ARTIST +'</a></p>'
	      	    +'</div>'
	      	    +'</div>';
	      	$('#slider1').append(result);
	      	$('#pMusicBtn2'+ID).click(function() {
	        	console.log("melonTodayInDB player click!!");
	        	playMusic2(item);
	      	});
	});	
};

/////////////////////////////////////////////////////////////////////////////////////////////////
function melonChart(data) {
	var num = 0; 
	  console.log(data);
	  var melonChartResult = new Array(); // NodeJs에 전달되는 데이터
	  var array = data.melon.songs.song;
	  gapi.client.setApiKey('AIzaSyDBgX7Mi8lKTH5pSvx3L_hhz8bCxP2-WP0');

	  gapi.client.load('youtube', 'v3', function() {
		$.each(array, function(index,item){
			
			var TITLE = item.songName;
			var ARTIST = item.artists.artist[0].artistName;
			var keyword = TITLE + " " + ARTIST;
			var q = keyword;
			var request = gapi.client.youtube.search.list({
				q: q,
				part: 'snippet',
				maxResults: 4
			});
			
			request.execute(function(response) {
				var check = 0;
				
				var resultItems = response.result.items;
				//console.log(response.result);
				if(resultItems != null) {
					++num;
				}
	            $.each(resultItems, function(index, item2) {
	            	if(item2 != null && item2.id.kind === "youtube#video") {
	            		++check;	            		
	    			}
	            	
					if(check == 1) {
			    		++check;
			    		if(item2.id.kind != null) {
							//console.log(item2.id.kind);
						}
						Y_TITLE = item2.snippet.title;
						IMG =  item2.snippet.thumbnails.medium.url;
						ID = item2.id.videoId;
						C_KIND = "2"; // 실시간 인기 차트
						var melonChartItems = new Array(); // melonTodayResult에 저장되는 배열
						melonChartItems = {"y_title" : Y_TITLE, "title" : TITLE, "artist" : ARTIST, "c_kind" : C_KIND, "id" : ID, "img" : IMG};
						melonChartResult.push(melonChartItems); //호출
						
						if(num < 11) {
			                var result =  '<tr class="chart">'
			                	  +'<td class="ranking" ><strong class="num1">'+num+'</strong></td>'
			                	  +'<!-- 곡 -->'
			                	  +'<th scope="row" class="chartImgTitle">'
			                	  +'<div class="chartImg">'
			                	  +'<a href=""'
			                	  +'title="'+TITLE+'" style="width: 50px; height: 50px; position: relative; float: left;"> <span class="mask"></span>'
			                	  +'<img src="'+IMG+'" style="width:50px; height:50px;" alt="'+TITLE+'">'
			                	  +'</a>'
			                	  +'<p class="" style=" position: relative; float: left; left: 10px; top: 14px;">'
			                	  +'<a href="" title="'+TITLE+'">'+TITLE+'</a>'
			                	  +'</p>'
			                	  +'</div>'
			                	  +'<p class="chartTitle" style="relative; float: left; left: 10px; top: 0px;">'
			                	  +'<a href="" title="'+TITLE+'">'+TITLE+'</a>'
			                	  +'</p>'
			                	  +'</th>'
			                	  +'<!-- 아티스트 -->'
			                	  +'<td class="left">'
			                	  +'<p class="artist" >'
			                	  +'<a href="" title="'+ARTIST+'">'+ARTIST+'</a>'
			                	  +'</p>'
			                	  +'</td>'
			                	  +'<!-- 재생 -->'
			                	  +'<td><button id="melonBtn'+ID+'" style="font-weight: bold;" class="glyphicon glyphicon-headphones" title="'+ARTIST+' 듣기"></button></td>'
			                	  +'<!-- 목록 -->'
			                	  +'<td><button href="javascript:;" onclick="" class="glyphicon glyphicon-plus" title="'+ARTIST+' 추가 하기"></button></td>'
			                	  +'<!-- 기타 -->'
			                	  +'<td><button href="javascript:;" onclick="" class="glyphicon glyphicon-option-vertical" title="'+TITLE+' 기타 기능"></button>'
			                	  +'</td>'
			                	  +'</tr>';
			                  $('#mchart').append(result);
			                  
					          	var _item2 = {"Y_TITLE" : Y_TITLE, "IMG" : IMG, "ID" : ID};
					          	
			                  
			                  
			                  $('#melonBtn'+ID).click(function() {
					            	console.log("melonToday player click!!");
			                    	playMusic2(_item2);
			                  });
					      }
						//console.log("insertMelonChart_num : " + num);
		                  if(num === 30) {
		                	  insertMelonChart(melonChartResult); // DB에 실시간 차트 갱신하기	
		                  }
					}
		        });
		    });
	  });
   });
};
/////////////////////////////////////////////////////////////////////////////////////////////////
function melonChartInDB(data) {
	console.log("melonChartInDB");
	console.log(data);
	var num = 0;
	$.each(data, function(index, item) {
		++num;
		Y_TITLE = item.Y_TITLE;
		TITLE = item.TITLE;
		ARTIST = item.ARTIST;
		IMG =  item.IMG;
		ID = item.ID;
		C_KIND = item.C_KIND;
					
        var result =  '<tr id="chart" class="chart">'
        	  +'<td class="ranking" ><strong class="num1">'+num+'</strong></td>'
        	  +'<!-- 곡 -->'
        	  +'<th scope="row" class="chartImgTitle">'
        	  +'<div class="chartImg">'
        	  +'<a href=""'
        	  +'title="'+TITLE+'" style="width: 50px; height: 50px; position: relative; float: left;"> <span class="mask"></span>'
        	  +'<img src="'+IMG+'" style="width:50px; height:50px;" alt="'+TITLE+'">'
        	  +'</a>'
        	  +'<p class="" style=" position: relative; float: left; left: 10px; top: 14px;">'
        	  +'<a href="" title="'+TITLE+'">'+TITLE+'</a>'
        	  +'</p>'
        	  +'</div>'
        	  +'<p class="chartTitle" style="relative; float: left; left: 10px; top: 0px;">'
        	  +'<a href="" title="'+TITLE+'">'+TITLE+'</a>'
        	  +'</p>'
        	  +'</th>'
        	  +'<!-- 아티스트 -->'
        	  +'<td class="left">'
        	  +'<p class="artist" >'
        	  +'<a href="" title="'+ARTIST+'">'+ARTIST+'</a>'
        	  +'</p>'
        	  +'</td>'
        	  +'<!-- 재생 -->'
        	  +'<td><button id="melonBtn'+ID+'" style="font-weight: bold;" class="glyphicon glyphicon-headphones" title="'+TITLE+' 듣기"></button></td>'
        	  +'<!-- 목록 -->'
        	  +'<td><button href="javascript:;" onclick="" class="glyphicon glyphicon-plus" title="'+TITLE+' 추가 하기"></button></td>'
        	  +'<!-- 기타 -->'
        	  +'<td><button href="javascript:;" onclick=""'
        	  +'class="glyphicon glyphicon-option-vertical" title="'+TITLE+' 기타 기능"></button>'
        	  +'</td>'
        	  +'</tr>';
          $('#mchart').append(result);
          
          $('#melonBtn'+ID).click(function() {
            	console.log("melonChart player click!!");
            	playMusic2(item);
          });
          
          
	});
};


/////////////////////////////////////////////////////////////////////////////////////////////////
var insertMelonChart = function (melonChartResult) {
	console.log(melonChartResult);
	$.ajax({
		url: "http://localhost:8082",
		type: 'POST',
		data: {
			data : JSON.stringify(melonChartResult),
			status : "chartUpdate"
		},
		dataType:'json',
		beforeSend: function (xhr) {
			xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
		}
	}).done(function(resultObj) {
		var result = resultObj;
		if (result.status == "success") {
			console.log("insertMelonChart 완료");
			console.log(resultObj.md);
			/*callMelonChart();*/
		} 
	});
};



/////////////////////////////////////////////////////////////////////////////////////////////////
function nedamuChart() {
	var result;
	var i = 0;
	$.getJSON('music/ajax/list.do', function(resultObj) {
		//console.log(resultObj);
		result = resultObj.data;
		//console.log(result);
	    if (resultObj.status == "success") {
	    	$.each(result, function(index, item) {
	    		i++;
	    	  //console.log(item);
	          var y_title = item.y_title;
	          var artist = item.artist;

	          var songN2 = ""; // ..
	          var songN3 = "";
	          
	          var splitTitle = byteLength(y_title);
	          //console.log(splitTitle);
	          //var splitArtist = byteLengthOfArtist(artist);
	          if(splitTitle[0] >= 70) {
	        	  //console.log("title.splitTitle('"+title+"') : " + byteLengthOfTitle(title));
	        	  title_hide = y_title.substring(0, splitTitle[2]) + "..";
	        	  title_nonHide = y_title.substring(0, splitTitle[1]) + ".."; //console.log(songN2 + " ? " + songN3);
	          } else {
	        	  title_hide = y_title;
	        	  title_nonHide = y_title;
	          }
	          
	/*          var artistN2 = "";
	          console.log(splitArtist);
	          if(splitArtist[0] >= 18) {
	        	  if(splitArtist[1] > 9) splitArtist[1] = 10;
	        	  artistN2 = artist.substring(0, splitArtist[1]) + "..";
	          } else {
	        	  artistN2 = artist;
	          }*/
	          //console.log(item);
	          var videoId = item.music_id;
	          var vidThumburl = item.img;
	    	  var result =  '<tr class="chart">'
	    		  +'<td class="ranking" ><strong class="num1">'+i+'</strong></td>'
	    		  +'<!-- 곡 -->'
	    		  +'<th scope="row" class="chartImgTitle">'
	    		  +'<div class="chartImg">'
	    		  +'<a href="" title="'+y_title+'" style="width: 50px; height: 50px; position: relative; float: left;">'
	    		  +'<span class="mask"></span>'
	    		  +'<img src="'+vidThumburl+'" style="width:50px; height:50px;" alt="'+y_title+'">'
	    		  +'</a>'
	    		  +'<p class="" style=" position: relative; float: left; left: 10px; top: 14px;">'
	    		  +'<a href="" title="'+y_title+'">'+title_hide+'</a>'
	    		  +'</p>'
	    		  +'</div>'
	    		  +'<p class="chartTitle" style="relative; float: left; left: 10px; top: 0px;">'
	    		  +'<a href="" title="'+y_title+'">'+title_nonHide+'</a>'
	    		  +'</p>'
	    		  +'</th>'
	    		  +'<!-- 아티스트 -->'
/*	    		  +'<td class="left">'
	    		  +'<p class="artist" >'
	    		  +'<a href="" title="'+artist+'">'+artistN2+'</a>'
	    		  +'</p>'
	    		  +'</td>'*/
	    		  +'<!-- 재생 -->'
	        	  +'<td><button id="nedamuBtn'+videoId+'" style="font-weight: bold;" class="glyphicon glyphicon-headphones" title="'+y_title+' 듣기"></button></td>'
	        	  +'<!-- 목록 -->'
	        	  +'<td><button href="javascript:;" onclick="" class="glyphicon glyphicon-plus" title="'+y_title+' 추가 하기"></button></td>'
	        	  +'<!-- 기타 -->'
	        	  +'<td><button href="javascript:;" onclick=""'
	        	  +'class="glyphicon glyphicon-option-vertical" title="'+y_title+' 기타 기능"></button>'
	        	  +'</td>'
	        	  +'</tr>';
	    	  $('#mchart2').append(result);
	          
	          var _item2 = {"Y_TITLE" : y_title, "IMG" : vidThumburl, "ID" : videoId};
	    	  
	          $('#nedamuBtn'+videoId).click(function() {
	            	console.log("nedamu click");
	            	playMusic2(_item2);
	            });
	    	});
	    }
	}); 

};
/////////////////////////////////////////////////////////////////////////////////////////////////
//main 슬라이더, melon & nedamu chart 음악 재생 함수. playMusic의 함수명은 이미 main.js에 정의됨
function playMusic2(item) {
	console.log("플레이어 실행");
	var title = item.Y_TITLE;
	var vid = item.ID;
	var musicImage = item.IMG;
	console.log(title + " / " + vid + " / " + musicImage);
	//var musicUrl = "audio/" + vid + ".m4a";
	$.getJSON('music/ajax/musicPlay.do?music_id='+vid+'&title='+title+'&img='+musicImage, function(resultObj) {
		var ajaxResult = resultObj.ajaxResult;
        if (ajaxResult.status == "success") {
              var musicUrl = ajaxResult.data;
          }
        myPlaylist.add({
           title : title,
           artist : "",
           free:true,
           mp3:musicUrl,
           poster: musicImage
        },true);
	}); 
};
/////////////////////////////////////////////////////////////////////////////////////////////////
//nedamu chart에 들어가는 제목, 아티스트의 string 이 길어질 때 .. << 으로 표시하는 함수
function byteLength(str) {
    var array = new Array();
    var num = 0;
    var num1 = 0;
    var num2 = 0;
    
	  var s = 0;
	  for (var i = 0; i < str.length; i++) {
		num++;
	    var code = str.charCodeAt(i);
	    if ((code >= 97 && code <= 122)
	    		|| (code >= 32 && code <= 64)
	    		|| (code >= 91 && code <= 96)
	    		|| (code >= 123 && code <= 126)) s++;
	    else if ((code >= 65 && code <= 90) || (code >= 0xAC00 && code <= 0xD7FF)) s+=2;
	    
	    if(s >= 60 && num1 == 0) {
	    	//console.log(num + " [50]");
	    	num1++;
	    	array[2] = num;
	    }
	    if(s >= 70 && num2 == 0) {
	    	num2++;
	    	//console.log(num + "[70]");
	    	array[1] = num;
	    }
	    //console.log(code+"-"+i+" : " + s);
	  }
	  
	  array[0] = s;
	  
	  return array;
}

///////////////////////////////////////////////////////////////////////////////////////////////////

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
};


/////////////////////////////////////////////////////////////////////////////////////////////
//$(function () {
function moreChartBtn(id) {
	//$('.melonChart_more').on('click', function () {
    	//$('#containers').empty();
    	console.log("더보기 클릭");
    	console.log($(this).attr('id'));
    	console.log(id);
        var id = id;
        var kind = "";
        if(id == "melonChart_more_realtime") {
        	kind = "2"; // 실시간 인기차트
        } else if (id == "melonChart_more_day") {
        	kind = "2"; // 일간 인기차트
        } else if (id == "melonChart_more_week") {
        	kind = "4"; // 주간 인기차트
        } else if (id == "nedamuChart_more") {
        	kind = "5"; // 네다뮤 인기차트
        }
        
        $.ajax({
        	url: "http://localhost:8082",
        	type: 'POST',
        	data: { 			
        		status : "list",
        		checkTime : "",
        		c_kind : kind, 
        		data : "",
        		limit : "30"
        	},
        	dataType:'json',
        	beforeSend: function (xhr) {
        		xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        	}
        }).done(function(resultObj) {
        	var result = resultObj;
        	if (result.status == "success") { 
        		console.log("chart_more : 완료");
        	 	
        		moreChart(result.data);
        		console.log(result.data);
        	} else if (result.status == "new") { 
        		console.log("");
        		callMelonToday(); 			 
        	}
        });

   // });
};

function moreChart(data) {
    var i = 1;
    $('#mainWrapper').empty();
     $('#resultTbody').empty();
     $('#resultThead').empty();
     $('#resultThead').append('<tr class="moreChart_tag"><th>선택</th><th>번호</th><th>곡명</th><th>아티스트</th><th>듣기</th><th>뮤비</th><th>재생<br>목록</th><th>앨범</th>');
    
     $.each(data, function(index, item) {
 		var Y_TITLE = item.Y_TITLE;
		var TITLE = item.TITLE;
		var ARTIST = item.ARTIST;
		var IMG =  item.IMG;
		var ID = item.ID;
		var C_KIND = item.C_KIND;
		//IMG = '<img id="thumb" src="'+IMG+'" alt="No  Image Available." style="width:102px;height:64px">';
        console.log(item);
        var result = 
        	'<tr class="moreChart_tr">'
        	+'<td> <input type="checkbox" value='+ID+' name="check"></td>' 
        	+'<td>'+i+'</td>'
        	
	  		+'<td scope="row" class="">'
			+'<div class="">'
			+'<a title="'+TITLE+'">'
			+'<img id="moreChart_img" src="'+IMG+'" alt="'+TITLE+'">'
			+'</a>'
			+'<p id="moreChart_title_p" class="">'
			+'<a href="" title="'+TITLE+'">'+TITLE+'</a>'
			+'</p>'
			+'</div>'
			+'</td>'
			+'<td>'+ ARTIST +'</td>'
        	+'<td class="moreChart_icon_td"><button class="moreChart_btns" id="chartMoreBtn'+ID+'" type="button" onclick=playMusic("'+ID+'")>'
        	+'<span class="glyphicon glyphicon-headphones" aria-hidden="true">'
        	+'</span></button></td>'
        	+'<td class="moreChart_icon_td"><button class="moreChart_btns" id="newBtn'+ID+'" type="button" data-toggle="modal" data-target="#myModal" onclick=playVideo("'+ID+'")>'
        	+'<span class="glyphicon glyphicon-film" aria-hidden="true">'
        	+'</span></button></td>'
        	+'<td class="moreChart_icon_td"><button class="moreChart_btns" type="button" >'
        	+'<span class="glyphicon glyphicon-plus" aria-hidden="true">'
        	+'</span></button></td>'
        	+'<td class="moreChart_icon_td"><button class="moreChart_btns" type="button">'
        	+'<span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true">'
        	+'</span></button></td>'
        	//+'<td><button type="button" class="btn btn-default btn-sm">'
        	//+'<span class="glyphicon glyphicon-save" aria-hidden="true">'
        	//+'</span></button></td>
        	+'</tr>' 
       $('#resultTbody').append(result);
        
        
        var _item2 = {"Y_TITLE" : Y_TITLE, "IMG" : IMG, "ID" : ID};
  	  
        $('#chartMoreBtn'+ID).click(function() {
          	console.log("nedamu click");
          	playMusic2(_item2);
        });
      i++;
    });
};