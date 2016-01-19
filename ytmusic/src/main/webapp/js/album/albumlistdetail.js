$(function() {
	var album_no = location.href.split('?')[1].split('=')[1];

	$.getJSON('album/musiclist.do?album_no='+album_no, function (resultObj) {
		var table = $("#listTable");
		for (var music of resultObj.data) {
			$("<tr id=tablerow>")
			.html("<td><input value='" + music.mu_no + "'id='checkMusic' type='checkbox'/>" + 
					//"</td><td>" + music.mu_no + 
					"</td><td class='dragHandle'>" + " " +
					"</td><td><img src='" + music.img +"'width='100px'>"+ 
					"</td><td>" + music.title +
					"</td><td> <button id='"+ music.mu_no +"' class='deleteBtn' type='button' class='btn btn-warning btn-xs'>삭제</button>" + 
			"</td></tr>")
			.appendTo(table);
		}

		$('.deleteBtn').click(
				function(event) {
					var result = confirm("곡을 삭제하시겠습니까?");
					if(result){

						var music_no = this.id;
						$.getJSON('album/deletemusic.do?album_no=' + album_no + '&music_no='+ music_no, 
								function(resultObj) {
							var ajaxResult = resultObj.ajaxResult;
							if (ajaxResult.status == "success") {
								//location.href = "myalbumlistdetail.html?album_no=" + album_no;
								location.reload(true);
							} else {
								alert("음악 삭제에 실패했습니다.");
							}
						});
					}
					else {
						return false;
					}
				});

		$('#deleteAllCheck').click(
				function(event) {

					var count = $("input[type='checkbox']:checked").length;
					if ($("input:checkbox[id='allCheck']").is(":checked") == true){
						count = count-1;
					}
					
					if (count !=0) {
						var result = confirm(count+"개의 곡을 삭제하시겠습니까?");
						if (result){

							$('input:checkbox[id="checkMusic"]').each(function() {
								if(this.checked == true){
									var music_no = this.value;
									$.getJSON('album/deletemusic.do?album_no=' + album_no + '&music_no='+ music_no, 
											function(resultObj) {
										var ajaxResult = resultObj.ajaxResult;
										if (ajaxResult.status == "success") {
											location.reload(true);
										} else {
											alert("음악 삭제에 실패했습니다.");
										}
									});
								} 
							});

						}
						else {
							return false;
						}
					}
					else {
						alert("선택된 곡이 없습니다!");
					}
				});

		// 테이블 Drag & Drop 플러그인 
		var s4 = document.createElement('script');
		s4.type = "text/javascript";
		s4.src = "js/album/jquery.tablednd.js";
		document.body.appendChild(s4);

		setTimeout(listCall(), 1000);


		$(function(){
			//전체선택 체크박스 클릭
			$("#allCheck").click(function(){
				//만약 전체 선택 체크박스가 체크된상태일경우
				if($("#allCheck").prop("checked")) {
					//해당화면에 전체 checkbox들을 체크해준다
					$("input[type=checkbox]").prop("checked",true);
					// 전체선택 체크박스가 해제된 경우
				} else {
					//해당화면에 모든 checkbox들의 체크를해제시킨다.
					$("input[type=checkbox]").prop("checked",false);
				}
			})
		})


		function listCall() {
			var s3 = document.createElement('script');
			s3.type = "text/javascript";
			s3.src = "js/album/musiclist.js";
			document.body.appendChild(s3);

		}

	});


})

