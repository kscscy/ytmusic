$(function() {

	$.getJSON('album/albumlist.do?member_no='+sessionStorage.getItem('noSession'), function (resultObj) {
		var table = $("#listTable");
		for (var album of resultObj.data) {
			$("<tr>")
			.html("<td>" + album.a_no + 
					"</td><td>" + 
					"<a class='detailLnk' href='#' album_no='" + album.a_no + "'>" +
					//"<a class='detailLnk' href='#' href='myalbumlistdetail.html?album_no=" + album.a_no + "'>" +
					album.name + "</a>" +
					"</td><td><button id='"+ album.a_no +"' class='deleteBtn' type='button' class='btn btn-warning btn-xs'>삭제</button>" + 
					"</td></tr>"
			)
			.appendTo(table);
		}
		$("a.detailLnk").click(clickDetailLnk);
//href='myalbumlistdetail.html?album_no="
		$('.deleteBtn').click(
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
								location.reload(true);
							} else {
								alert("앨범 삭제 실패");
							}
						},'json');

					}
					else {
						return false;
					}
				});
		
	});

	function clickDetailLnk(event) {
		event.preventDefault(); // AJAX로 처리할 것이기 때문에 a 태그의 실행을 취소한다.
		console.log("디테일버툰");
		console.log($(event.target).attr("album_no"));
		var album_no=$(event.target).attr("album_no");
		var new_link="myalbumlistdetail.html?album_no=" + album_no;
		console.log(new_link);
		$("#containers").empty();
		$("#containers").load(new_link);
		//location.href = "myalbumlistdetail.html?album_no=" + $(event.target).attr("album_no"); 
		// jQuery를 통해서 넘어오는 객체는         
		// DOM API에는 attr 이 없다(getAttribute만 있) 
		
	}
});


