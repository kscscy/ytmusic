$(function() {

	$.getJSON('album/albumlist.do?member_no='+sessionStorage.getItem('noSession'), function (resultObj) {
		var table = $("#listTable");
		for (var album of resultObj.data) {
			$("<tr>")
			.html("<td>" + album.a_no + 
					"</td><td>" + 
					"<a href='myalbumlistdetail.html?album_no=" + album.a_no + "'>" +
					album.name + "</a>" +
					"</td><td><button id='"+ album.a_no +"' class='deleteBtn' type='button' class='btn btn-warning btn-xs'>삭제</button>" + 
					"</td></tr>"
			)
			.appendTo(table);
		}

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

});


