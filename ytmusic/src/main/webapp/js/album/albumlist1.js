
$(document.body).on('click', 'a.detailLnk',
	
	function clickDetailLnk(event) {
		//console.log("clickDetailLnk");
		$("#containers").empty();
		
		event.preventDefault(); // AJAX로 처리할 것이기 때문에 a 태그의 실행을 취소한다.
		var album_no=$(event.target).attr("album_no");
	  window.album_no = album_no;
	
		var music = new Array();
		var musiclist = new Array();
		sessionStorage.removeItem('no_array_data');
		console.log("앨범번호 : " + album_no);

		$("#containers").append("<div class='container'><h1>앨범 노래 목록</h1>" + 
				"<table id='musicListTable' class='table table-hover table-responsive'>" +
				"<thead><tr><th><input type='checkbox' id='allCheck'/></th>" +
				"<th>test</th><th>img</th>" +
				"<th>제목</th><th>" +
				"<button id='updateList' type='button' class='detailForm btn btn-info btn-xs'>저장하기</button>" +
				"<button id='deleteAllCheck' type='button' class='detailForm btn btn-warning btn-xs'>선택삭제</button>" +
		"</th></tr></thead><tbody id='listTbody'></tbody></table></div>");
	
		
		
			detailTest(album_no);
		
		
		return false;
});

var detailTest = function (album_no) {


	$.ajax({
		url: 'album/musiclist.do?album_no=' + album_no,
		type: 'GET',
		async: false,
		dataType: "JSON",

		success: function(resultObj) {

			//$.getJSON('album/musiclist.do?album_no=' + album_no, function (resultObj) {

			var table = $("#listTbody");
			//var table = $("#musicListTable");

			if (resultObj.data != null) {

				//c(album_no);

				//console.log("위쪽함수?");
				for (music of resultObj.data) {

					$("<tr id=tablerow^" + music.id + ">")
					.html("<td><input value='" + music.id + "'id='checkMusic' type='checkbox'/>" + 
							"</td><td class='dragHandle'>" + " " +
							"</td><td><img src='" + music.img +"'width='100px'>"+ 
							"</td><td>" + music.title +
							"</td><td> <button data-id='"+ music.id +"' class='deleteMusicBtn' type='button' class='btn btn-warning btn-xs'>삭제</button>" + 
					"</td></tr>")
					.appendTo(table);
					//musiclist.push(music);
				} 


			}


		}
	})

	$(function() {    	

		//var num = 0;
		$('#musicListTable').tableDnD({
			onDragStart: function(table, row) {

				$(table).parent().find('.result').text('');
			},
			onDrop: function(table, row) {
				var data = $(table).tableDnDSerialize();

				//console.log(data);
				var array_data = data.split("&");	// 테이블행이 포함된 순서
				var no_array_data = new Array();	// 새로 잘라낸 순서?  a

				for (var i = 0; i < array_data.length; i++) {
					no_array_data[i] = array_data[i].substring(32);

				};
				//console.log(array_data);
				console.log(no_array_data);
				sessionStorage.setItem("no_array_data",no_array_data);

				//$("#listTbody").empty();
				//jQuery('#containers').load(c(album_no));
				//sessionStorage.setItem("arrayObj", JSON.stringify(arrayObj));

			},
			dragHandle: ".dragHandle"

		});

		$("#musicListTable").find("tr").hover(function() {
			$(this.cells[1]).addClass('showDragHandle');
		}, function() {
			$(this.cells[1]).removeClass('showDragHandle');
		});


	});

	return false;
};


$(document.body).on('click', '.deleteBtn',

		function(event) {
			var result = confirm("앨범을 삭제하시겠습니까?");
			if(result){

				$.post('album/deletealbum.do', {
					album_no : this.id,
					member_no : sessionStorage.getItem('noSession')
				},
				function(resultObj) {
					var ajaxResult = resultObj.ajaxResult;
					if (ajaxResult.status == "success") {
						jQuery('#containers').load('myalbumlist.html');
						//location.reload(true);
					} else {
						alert("앨범 삭제 실패");
					}
				},'json');

			}
			else {
				return false;
			}
});






