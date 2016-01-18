  var listUrl = 'PLFgquLnL59anNXuf1M87FT1O169Qt6-Lp';
  var count = 0;
  var liCountId = 0;
  var liCountId2 = 1;
  var songCount = 1;
  var scriptCount = 1;

  function callList(value) {
	  console.log("callList 호출");

	  count++;
	  gapi.client.setApiKey('AIzaSyDBgX7Mi8lKTH5pSvx3L_hhz8bCxP2-WP0');
	  gapi.client.load('youtube', 'v3', function() {
		  requestVideoPlaylist(value);
	  });
      
	  console.log("callList 호출완료");
  }
  
    function init() {
      //console.log("init 호출1");
      gapi.client.setApiKey('AIzaSyDBgX7Mi8lKTH5pSvx3L_hhz8bCxP2-WP0');
      gapi.client.load('youtube', 'v3', function() {
        requestVideoPlaylist(listUrl);
      });
    }
    //Define some variables used to remember state.
    var playlistId, nextPageToken, prevPageToken;

    // After the API loads, call a function to get the uploads playlist ID.
    function handleAPILoaded() {
      requestUserUploadsPlaylistId();
    }

    // Call the Data API to retrieve the playlist ID that uniquely identifies the
    // list of videos uploaded to the currently authenticated user's channel.
    function requestUserUploadsPlaylistId() {
      // See https://developers.google.com/youtube/v3/docs/channels/list
      var request = gapi.client.youtube.channels.list({
        mine : true,
        part : 'contentDetails'
      });
      request
          .execute(function(response) {
            playlistId = response.result.items[0].contentDetails.relatedPlaylists.uploads;
            requestVideoPlaylist(playlistId);
          });
    }

    // Retrieve the list of videos in the specified playlist.
    function requestVideoPlaylist(playlistId, pageToken) {
      var requestOptions = {
        playlistId : playlistId,
        part : 'snippet',
        maxResults : 30
      };
      if (pageToken) {
        requestOptions.pageToken = pageToken;
      }
      var request = gapi.client.youtube.playlistItems
          .list(requestOptions);
        
      count++;
      if (count < 2) {

        request.execute(function(response) {
            listUrl = 'PLFgquLnL59anNXuf1M87FT1O169Qt6-Lp';
            var s3 = document.createElement('script');
            s3.type = "text/javascript";
            s3.src = "https://apis.google.com/js/client.js?onload=init";
            document.body.appendChild(s3);
            //console.log("appended");
        });
      } else {
        request.execute(function(response) {
            
        	// 리스트 슬라이더 js 호출
          var playlistItems = response.result.items;
          if (playlistItems) {
            $('#categories').empty();
            
            $.each(playlistItems, function(index, item) {
               // console.log(liCountId2);
                if(liCountId == 0) {
                  liCountId2 = liCountId;  
                  li = '<ul class="sliderimage" id=ulCountId-'+liCountId2+' style="padding-left:30px; left:0px;"><li class="liCon_1" id=liCountId-'+liCountId2+'></li></ul>';
                  $('#categories').append(li);
                } else if(liCountId % 10 == 0) {
                  liCountId2 = liCountId;  
                  li = '<ul class="sliderimage" id=ulCountId-'+liCountId2+' style="padding-left:30px; right:0px;"><li class="liCon_1" id=liCountId-'+liCountId2+'></li></ul>';
                  $('#categories').append(li);
                }
                
                ++liCountId;
                displayResult(item.snippet);
                
             });
            
            /*if(scriptCount < 2) {*/
            	/*scriptCount++;*/
              var s4 = document.createElement('script');
              s4.type = "text/javascript";
              s4.src = "js/slider/jquery-photostack.js";
              document.body.appendChild(s4);
              
              var s3 = document.createElement('script');
              s3.type = "text/javascript";
              s3.src = "js/main-slider.js";
              document.body.appendChild(s3);
            /*}*/

           } else {
          $('#categories').append('Sorry you have no uploaded videos');
          }
        });
        liCountId = 0;
        liCountId2 = 1;
        count = 0;
        songCount = 1;
      }
    }
   
    function displayResult(videoSnippet) {
      var title = videoSnippet.title;
      var titleSplit = title.split('-');
      var artistName = " ";
      var songName = " ";
      if(titleSplit.length == 2) {
    	  artistName = titleSplit[0];
    	  songName = titleSplit[1];
      } else {
    	  var titleSplit = title.split('_');
    	  artistName = titleSplit[0];
    	  songName = titleSplit[1];
      }
/*      console.log("artistName : " + artistName);
      console.log("songName : " + songName);*/
      
      var videoId = videoSnippet.resourceId.videoId;
      
      var result = title + "?" + videoId; 
      
      vidThumburl = videoSnippet.thumbnails.medium.url;
      vidThumbimg = '<li class="liCon_2" style="">'
      		+'<div class="imgContainer" style="background: url('+vidThumburl+') no-repeat; background-size: 180px 110px; height:110px; width:180px;">'
      	    +'<div class="buttonContainer" style="height:110px; width:180px;">'
      	    +'<span id="pMusicBtn'+videoId+'" class="glyphicon glyphicon-play-circle" aria-hidden="true" style=""></span>'
      	    +'</div></div>'
            /*+'<a href="javascript:playMusic('+result+');"><span class="glyphicon glyphicon-play-circle" aria-hidden="true" style=""/></a>'*/
      	    /*+'<a href="#" onclick=playMusic('+result+')><span class="glyphicon glyphicon-play-circle" aria-hidden="true" style=""/></a>'*/
            + '<div id="slide_wrapper">'
      		+ '<div class="suvInfoContainer">'
      		+ '<p class="readmore2"><a href="#">'+artistName+'</a></p>'
      		+ '<p class="readmore"><a href="#">'+songName+'</a></p>'
      		+ '</div>'
      		+ '<div id="subInfo'+songCount+'" class="suvButtonContainer">'
      		+ '<button type="button" data-toggle="dropdown" class="glyphicon glyphicon-option-vertical" onclick=dropdownsMenu("subInfo'+songCount+'")></button>'
      		+ '</div>'
      		+ '</div>'; 

      $('#liCountId-'+liCountId2).append(vidThumbimg);
      
      $('#pMusicBtn'+videoId).click(function() {
      	console.log("function click!!");
      	playMusic(videoSnippet);
      });
      songCount++;
   }
/*    $('#subinfoDropmenu').modal({
    	  backdrop: 'static',
    	  keyboard: true
    	   class="modal hide fade" data-keyboard="false" data-backdrop="static"
    });*/
    
    function dropdownsMenu(songId) {
    	$(".dropdown-menu").remove();
    	
        var result = songId;
    	
    	console.log(songId);
    	var content =
    	  '<ul  class="dropdown-menu">'
        + '<li><a href="#">동영상 보기</a></li>'
        + '<li><a href="#">유투브 페이지</a></li>'
        + '<li><a href="#">재생목록에 추가</a></li>'
        + '<li class="divider"></li>'
        + '<li><a href="#">내 앨범에 추가 '+result+'</a></li>'
        + '</ul>'

        console.log(result);
        $('#'+result).append(content);
    }
    
    
    function nextPage() {
      requestVideoPlaylist(playlistId, nextPageToken);
    }

    // Retrieve the previous page of videos in the playlist.
    function previousPage() {
      requestVideoPlaylist(playlistId, prevPageToken);
    }
    
    function playMusic(item) {
    	$(footer).empty();
    	console.log(item);
    	var title = item.title;
    	var vid = item.resourceId.videoId;
    	/*var musicUrl = "audio/" + vid + ".m4a";*/
    	$.getJSON('music/ajax/musicPlay.do?id='+vid+'&title='+title, function(resultObj) {
            var ajaxResult = resultObj.ajaxResult;
            console.log(ajaxResult);
            if (ajaxResult.status == "success") {
                $(footer).append('<audio controls="" autoplay="" name="media"><source src = '+ajaxResult.data+' type="audio/webm"></audio>');
                $(footer).append('<a href="'+ajaxResult+'" download="aaac.aac">다운로드</a>');
                console.log(ajaxResult);
                console.log("playMusic : 완료");
		    	/*setTimeout(createMusic(musicUrl), 2500);*/
            }
    	}); 
    }
    
    function createMusic(musicUrl) {
    	$(footer).empty();
        $(footer).append('<audio controls="" autoplay="" name="media"><source src = '+musicUrl+' type="audio/webm"></audio>');
        $(footer).append('<a href="'+musicUrl+'" download="aaac.aac">다운로드</a>');
        console.log("playMusic : 완료");
    }
    
/*    function makeRequest() {
        var q = $('#query').val();
        var request = gapi.client.youtube.search.list({
                   q: q,
                part: 'snippet',
                 maxResults: 30
        });
        request.execute(function(response) {
                var str = JSON.stringify(response.result);
                //$('#search-container').html('<pre>' + str + '</pre>');
                $('#resultTbody').empty();
                $('#resultThead').empty();
                
                var resultItems = response.result.items;
                //console.log(resultItems);
                var i = 1;
                $('#resultThead').append('<tr><th>선택</th><th>썸네일</th><th>번호</th><th>제목</th><th>듣기</th><th>뮤비</th><th>재생목록</th><th>내앨범</th><th>다운</th>');
                $.each(resultItems, function(index, item) {
                  title = item.snippet.title;
                  videoId = item.id.videoId;
                  vidThumburl =  item.snippet.thumbnails.default.url;
                  vidThumbimg = '<img id="thumb" src="'+vidThumburl+'" alt="No  Image Available." style="width:102px;height:64px">';
                  $('#resultTbody').append('<tr> <td> <input type="checkbox" value='+videoId+' name="check"> </td> <td>'+i+'</td> <td>'+vidThumbimg+'</td> <td>'+title+'</td>'+'<td><button id="musicBtn-'+videoId+'" type="button" class="btn btn-default btn-sm")><span class="glyphicon glyphicon-headphones" aria-hidden="true"></span></button></td>'+'<td><button id="videoBtn-'+videoId+'" type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-film" aria-hidden="true"></span></button></td>'+'<td><button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button></td>'+'<td><button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></button></td>'+'<td><button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-save" aria-hidden="true"></span></button></td>');
                  
                  $('#musicBtn-'+videoId).click(function() {
                     playMusic(item);
                  });
                  $('#videoBtn-'+videoId).click(function() {
                     playVideo(item); 
                  });
                  i++;
                });
        });
    */