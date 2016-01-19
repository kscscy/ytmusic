$(document).ready(function() {
	//console.log("js안에서 회원번호 : "+ $.session.get('noSession'));
	//var no = $.session.get('noSession');
	$.getJSON('album/albumlist.do?member_no='+sessionStorage.getItem('noSession'), function (resultObj) {
		var table = $("#listTable");
		console.log(resultObj.data);
    for (var album of resultObj.data) {
     $("<tr>")
      .html("<td><input type='checkbox'/></td><td>" + album.a_no + 
      		"</td><td><a href='myalbumlistdetail.html?album_no=" + album.a_no + "'>"
//      		"</td><td><a class='detailLnk' href='#' album_no='" + album.a_no + "'>"
        		+ album.name + "</a></td></tr>")
        .appendTo(table);
    }
    // 제목 링크에 클릭 이벤트 리스너를 등록한다.
//    $("a.detailLnk").click(clickDetailLnk);
});
})


function clickDetailLnk(event) {
	event.preventDefault(); // AJAX로 처리할 것이기 때문에 a 태그의 실행을 취소한다.
	
	location.href = "myalbumlistdetail.html?album_no=" + $(event.target).attr("album_no"); 
	// jQuery를 통해서 넘어오는 객체는         
	// DOM API에는 attr 이 없다(getAttribute만 있) 
	  
}



