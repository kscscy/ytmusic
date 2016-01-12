  var listUrl = 'PLFgquLnL59anNXuf1M87FT1O169Qt6-Lp';
  var count = 0;
  var liCountId = 0;
  var liCountId2 = 1;
 
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
      console.log("init 호출1");
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
            console.log("appended");
        });
      } else {
        request.execute(function(response) {
            
        	// 리스트 슬라이더 js 호출
          var playlistItems = response.result.items;
          if (playlistItems) {
            $('#categories').empty();

            $.each(playlistItems, function(index, item) {
                console.log(liCountId2);
                if(liCountId == 0) {
                  liCountId2 = liCountId;  
                  li = '<ul id=ulCountId-'+liCountId2+' style="padding-left:30px;"><li id=liCountId-'+liCountId2+'></li></ul>';
                  $('#categories').append(li);
                } else if(liCountId % 10 == 0) {
                  liCountId2 = liCountId;  
                  li = '<ul id=ulCountId-'+liCountId2+' style="padding-left:30px;"><li id=liCountId-'+liCountId2+'></li></ul>';
                  $('#categories').append(li);
                }
                ++liCountId;
                displayResult2(item.snippet);
             });
            
              var s4 = document.createElement('script');
              s4.type = "text/javascript";
              s4.src = "js/slider/jquery-photostack.js";
              document.body.appendChild(s4);
              console.log("appended s4");
              
              
              var s3 = document.createElement('script');
              s3.type = "text/javascript";
              s3.src = "js/main-slider.js";
              document.body.appendChild(s3);
              
 /*             
              var s5 = document.createElement('script');
              s5.type = "text/javascript";
              s5.src = "js/main-slider2.js";
              document.body.appendChild(s5);*/
           } else {
          $('#categories').append('Sorry you have no uploaded videos');
          }
        });
        liCountId = 0;
        liCountId2 = 1;
        count = 0;
      }
    }
   
    function displayResult2(videoSnippet) {
      var title = videoSnippet.title;
      var videoId = videoSnippet.resourceId.videoId;
      vidThumburl = videoSnippet.thumbnails.medium.url;
      
      vidThumbimg = '<li style="background: url('+vidThumburl+') no-repeat; background-size: 180px 110px;">'
      		+'<div class="imgContainer" style="height:110px; width:180px;">'
      	    +'<div class="buttonContainer" style="height:110px; width:180px;">'
            +'<span class="glyphicon glyphicon-play-circle" aria-hidden="true" style=""/>'
            +'</div></div>'
      		+ '<p class="readmore"><a href="#">'+title+'</a></p>';
      
      $('#liCountId-'+liCountId2+'').append(vidThumbimg);
   }
    /*vidThumbimg = '<li style="background: url('+vidThumburl+') no-repeat; background-size: 180px 110px;">'
		+ '<div class="slider_img" style="height:110px; width:180px;"><button class="glyphicon glyphicon-play-circle" aria-hidden="true"' 
		+ 'style="display:inline; border:0 none; background-color:transparent; padding: 44px 78px; font-size:25px; cursor:pointer;"/></div>'
		+ '<p class="readmore"><a href="#">'+title+'</a></p>';*/
    function nextPage() {
      requestVideoPlaylist(playlistId, nextPageToken);
    }

    // Retrieve the previous page of videos in the playlist.
    function previousPage() {
      requestVideoPlaylist(playlistId, prevPageToken);
    }
    

    
