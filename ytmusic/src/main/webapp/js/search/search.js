

  
  
  
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
      mine: true,
      part: 'contentDetails'
    });
    request.execute(function(response) {
      playlistId = response.result.items[0].contentDetails.relatedPlaylists.uploads;
      requestVideoPlaylist(playlistId);
    });
  }

  // Retrieve the list of videos in the specified playlist.
  function requestVideoPlaylist(playlistId, pageToken) {
    var requestOptions = {
      playlistId: playlistId,
      part: 'snippet',
      maxResults: 30
    };
    if (pageToken) {
      requestOptions.pageToken = pageToken;
    }
    var request = gapi.client.youtube.playlistItems.list(requestOptions);
    request.execute(function(response) {
      // Only show pagination buttons if there is a pagination token for the
      // next or previous page of results.
      nextPageToken = response.result.nextPageToken;
      var nextVis = nextPageToken ? 'visible' : 'hidden';
      $('#next-button').css('visibility', nextVis);
      prevPageToken = response.result.prevPageToken
      var prevVis = prevPageToken ? 'visible' : 'hidden';
      $('#prev-button').css('visibility', prevVis);

      var playlistItems = response.result.items;
       var i = 1;
      if (playlistItems) {
      	$('#mainContainer').empty();
      	
         $('#resultTbody').empty();
         $('#resultThead').empty();
         $('#resultThead').append('<tr><th>선택</th><th>번호</th><th>썸네일</th><th>제목</th><th>듣기</th><th>뮤비</th><th>재생목록</th><th>내앨범</th><th>다운</th>');
        $.each(playlistItems, function(index, item) {
          var title = item.snippet.title;
          var videoId = item.snippet.resourceId.videoId;
          vidThumburl =  item.snippet.thumbnails.default.url;
          vidThumbimg = '<img id="thumb" src="'+vidThumburl+'" alt="No  Image Available." style="width:102px;height:64px">';

          
          $('#resultTbody').append('<tr> <td> <input type="checkbox" value='+videoId+' name="check"> </td> <td>'+i+'</td> <td>'+vidThumbimg+'</td> <td>'+title+'</td>'+'<td><button id="newBtn'+videoId+'" type="button" class="btn btn-default btn-sm" onclick=playMusic("'+videoId+'")><span class="glyphicon glyphicon-headphones" aria-hidden="true"></span></button></td>'+              '<td><button id="newBtn'+videoId+'" type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#myModal" onclick=playVideo("'+videoId+'")><span class="glyphicon glyphicon-film" aria-hidden="true"></span></button></td>'                 +'<td><button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button></td>'+'<td><button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></button></td>'+'<td><button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-save" aria-hidden="true"></span></button></td>');
          i++;
        });
      } else {
        $('#resultTbody').append('Sorry you have no uploaded videos');
      }
    });
  }

  // Create a listing for a video.
  function displayResult(videoSnippet) {
    var title = videoSnippet.title;
    var videoId = videoSnippet.resourceId.videoId;
    vidThumburl =  videoSnippet.thumbnails.default.url;
    vidThumbimg = '<img id="thumb" src="'+vidThumburl+'" alt="No  Image Available." style="width:102px;height:64px">';

    
    $('#resultTbody').append('<tr> <th scope="row"></th> <td>'+vidThumbimg+'</td> <td>'+title+'</td>'+'<td><button id="newBtn'+videoId+'" type="button" class="btn btn-primary btn-lg" onclick=playMusic("'+videoId+'")>'+'음악 재생'+'</button></td><td><button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal" onclick=playVideo("'+videoId+'")>동영상 재생</button></td></tr>');
    
    
  }

  // Retrieve the next page of videos in the playlist.
  function nextPage() {
    requestVideoPlaylist(playlistId, nextPageToken);
  }

  // Retrieve the previous page of videos in the playlist.
  function previousPage() {
    requestVideoPlaylist(playlistId, prevPageToken);
  }
  

    function getChartList(chartListId){
            gapi.client.setApiKey('AIzaSyDBgX7Mi8lKTH5pSvx3L_hhz8bCxP2-WP0');
            gapi.client.load('youtube', 'v3', function() {
               requestVideoPlaylist(chartListId);
            });
    }
    
    function keyWordsearch(){
            gapi.client.setApiKey('AIzaSyDBgX7Mi8lKTH5pSvx3L_hhz8bCxP2-WP0');
            gapi.client.load('youtube', 'v3', function() {
            	$("#mainWrapper").empty();
                    makeRequest();
            });
    }
    function makeRequest() {
            var q = $('#query').val();
            var request = gapi.client.youtube.search.list({
                       q: q,
                    part: 'snippet',
                     maxResults: 30
            });
            
            request.execute(function(response) {
                    var str = JSON.stringify(response.result);
                    //$('#search-container').html('<pre>' + str + '</pre>');
                    $('#mainContainer').empty();
                    $('#resultTbody').empty();
                    $('#resultThead').empty();
                    
                    var resultItems = response.result.items;
                    //console.log(resultItems);
                    var i = 1;
                    $('#resultThead').append('<tr><th>선택</th><th>번호</th><th>썸네일</th><th>제목</th><th>듣기</th><th>뮤비</th><th>재생목록</th><th>내앨범</th><th>다운</th>');
                    $.each(resultItems, function(index, item) {
                       //displayResult(item.snippet);
                      title = item.snippet.title;
                      videoId = item.id.videoId;
                      vidThumburl =  item.snippet.thumbnails.default.url;
                      vidThumbimg = '<img id="thumb" src="'+vidThumburl+'" alt="No  Image Available." style="width:102px;height:64px">';
                      
                      $('#resultTbody').append('<tr> <td> <input type="checkbox" value='+videoId+' name="check"> </td> <td>'+i+'</td> <td>'+vidThumbimg+'</td> <td>'+title+'</td>'+'<td><button id="newBtn'+videoId+'" type="button" class="btn btn-default btn-sm" onclick=playMusic("'+videoId+'")><span class="glyphicon glyphicon-headphones" aria-hidden="true"></span></button></td>'+              '<td><button id="newBtn'+videoId+'" type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#myModal" onclick=playVideo("'+videoId+'")><span class="glyphicon glyphicon-film" aria-hidden="true"></span></button></td>'                 +'<td><button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button></td>'+'<td><button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></button></td>'+'<td><button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-save" aria-hidden="true"></span></button></td>');
                      i++;
                    });
            });
    }

    
   
    function playMusic(vid) {
       /* $.post('ajax/musicPlay.do', {
          vid: vid
       }, function(resultObj) {
          var ajaxResult = resultObj.ajaxResult;
          if (ajaxResult.status == "success") {
                var musicUrl = ajaxResult.data;
                console.log("iii" +resultObj);
               alert(musicUrl);
            }
          console.log(musicUrl);
          
          
           $("<tr>")
             .html('<video controls="" autoplay="" name="media"><source src = '+musicUrl+ ' type="audio/webm"></video>')
                .appendTo(footer);
         
       }, 'json');  */
       
       
       
        $.getJSON('music/ajax/musicPlay.do?vid='+vid, function(resultObj) {
          var ajaxResult = resultObj.ajaxResult;
          if (ajaxResult.status == "success") {
                var musicUrl = ajaxResult.data;
                //console.log("iii" +resultObj);
               //alert(musicUrl);
            }
          console.log(musicUrl);
          
          $(footer).empty();
           $("<tr>")
             .html('<audio controls="" autoplay="" name="media"><source src = '+musicUrl+ ' type="audio/webm"></audio>')
                .appendTo(footer);
           $(footer).append('<a href="'+musicUrl+'" download="aaac.aac">다운로드</a>');
         
       }); 
    }
   
    function playVideo(vid) {
        $.getJSON('music/ajax/videoPlay.do?vid='+vid, function(resultObj) {
          var ajaxResult = resultObj.ajaxResult;
          if (ajaxResult.status == "success") {
                var videoUrl = ajaxResult.data;
                //console.log("iii" +resultObj);
               //alert(musicUrl);
            }
          console.log(videoUrl);

          $(".modal-body").empty();
           $(".modal-body").append('<video id="videoPlayer" controls="" autoplay="" name="media" width="100%"><source src='+videoUrl+' type="video/mp4"></video>');
           $(".modal-body").append('<a href="'+videoUrl+'" download>다운로드</a>');
       }); 
    }
    
    $('#myModal').click(function () {
       $('.modal-body').empty();
    });

  
  
  

