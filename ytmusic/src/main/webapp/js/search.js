// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
	gapi.client.setApiKey('AIzaSyDBgX7Mi8lKTH5pSvx3L_hhz8bCxP2-WP0');
	gapi.client.load('youtube', 'v3', function() {
	  data = jQuery.parseJSON( '{ "data": [{"name":"orsons"}] }' );
	  $.each(data["data"], function(index, value) {
	    makeRequest(value["name"]);
	  });
	});  
  var q = $('#query').val();
  
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet'
  });

  request.execute(function(response) {
    var str = JSON.stringify(response.result);
    $('#search-container').html('<pre>' + str + '</pre>');
  });
}

function init() {
    gapi.client.setApiKey('AIzaSyDBgX7Mi8lKTH5pSvx3L_hhz8bCxP2-WP0');
    gapi.client.load('youtube', 'v3', function() {
      data = jQuery.parseJSON( '{ "data": [{"name":"orsons"}] }' );
      $.each(data["data"], function(index, value) {
        makeRequest(value["name"]);
      });
    });
  }