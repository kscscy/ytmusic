   var myPlaylist = new jPlayerPlaylist({
      jPlayer: "#jquery_jplayer_N",
      cssSelectorAncestor: "#jp_container_N"
   }, [
      /* 재생로그에 있는 음악들을 로그인하면 추가하도록 {
         title:"Cro Magnon Man",
         artist:"The Stark Palace",
         mp3:"http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
         oga:"http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
         poster: "http://www.jplayer.org/audio/poster/The_Stark_Palace_640x360.png"
      } */
   ], {
      playlistOptions: {
         enableRemoveControls: true
      },
      swfPath: "../../dist/jplayer",
      supplied: "webmv, ogv, m4v, oga, mp3",
      useStateClassSkin: true,
      autoBlur: false,
      smoothPlayBar: true,
      keyEnabled: true,
      audioFullScreen: true,
      autoPlay: true
   });


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
    	var title = item.title;
    	var vid = item.resourceId.videoId;
    	var musicImage = item.thumbnails.medium.url;
    	/*var musicUrl = "audio/" + vid + ".m4a";*/
    	$.getJSON('music/ajax/musicPlay.do?music_id='+vid+'&title='+title+'&img='+musicImage, function(resultObj) {
    		var ajaxResult = resultObj.ajaxResult;
            if (ajaxResult.status == "success") {
                  var musicUrl = ajaxResult.data;
              }
            console.log(musicUrl);
            myPlaylist.add({
               title : title,
               artist : "",
               free:true,
               mp3:musicUrl,
               poster: musicImage
            },true);
            console.log(musicImage);
    	}); 
    }
    
    function createMusic(musicUrl) {
    	$(footer).empty();
        $(footer).append('<audio controls="" autoplay="" name="media"><source src = '+musicUrl+' type="audio/webm"></audio>');
        $(footer).append('<a href="'+musicUrl+'" download="aaac.aac">다운로드</a>');
        console.log("playMusic : 완료");
    }
    