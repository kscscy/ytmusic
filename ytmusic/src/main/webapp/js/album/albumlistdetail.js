$(function() {

	var album_no = location.href.split('?')[1].split('=')[1];
	sessionStorage.removeItem('no_array_data');
	var num = 0;
	var music = new Array();
	var musiclist = new Array();

	$.getJSON('album/musiclist.do?album_no='+album_no, function (resultObj) {
		var table = $("#listTable");
		for (music of resultObj.data) {
			$("<tr id=tablerow-" + music.seq_no + ">")
			.html("<td><input value='" + music.mu_no + "'id='checkMusic' type='checkbox'/>" + 
					"</td><td class='dragHandle'>" + " " +
					"</td><td><img src='" + music.img +"'width='100px'>"+ 
					"</td><td>" + music.seq_no + 
					"</td><td>" + music.title +
					"</td><td> <button id='"+ music.mu_no +"' class='deleteBtn' type='button' class='btn btn-warning btn-xs'>삭제</button>" + 
			"</td></tr>")
			.appendTo(table);
			musiclist.push(music);
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

		if(num == 0) {
			// 테이블 Drag & Drop 플러그인 
			var s4 = document.createElement('script');
			s4.type = "text/javascript";
			s4.src = "js/album/jquery.tablednd.js";
			document.body.appendChild(s4);
			num++;
			console.log("test1");
		} 
		if(num == 1) {
			console.log("test2");
			var s3 = document.createElement('script');
			s3.type = "text/javascript";
			s3.src = "js/album/musiclist.js";
			document.body.appendChild(s3);

		}


		$('#updateList').click(
				function(event) {
					if(sessionStorage.getItem('no_array_data')===null){
						alert("변경 사항이 없습니다.");
					}else {
						var result = confirm("저장 하시겠습니까?");
						
					  var seq_session = sessionStorage.getItem('no_array_data').split(",");
					  //var new_seq = new Array();
					  
					  //console.log(seq_session);
					  var music_no = null;
						if(result){
							for (var i=0; i<musiclist.length; i++) {
								//console.log(musiclist[i].seq_no);
								//console.log(seq_session[i]);
								console.log(musiclist[i].seq_no);
								console.log(musiclist[i].mu_no);
								musiclist[i].seq_no = seq_session[i];
								music_no = musiclist[i].mu_no;
/*
								$.getJSON('album/updatemusic.do?album_no=' + album_no + '&music_no='+ music_no + '&seq_no=' + musiclist[i].seq_no, 
										function(resultObj) {
									var ajaxResult = resultObj.ajaxResult;
									if (ajaxResult.status == "success") {
										//location.href = "myalbumlistdetail.html?album_no=" + album_no;
										location.reload(true);
									} else {
										alert("목록 변경에 실패했습니다.");
									}
								});
*/
								$.post('album/updatemusic.do', {
									album_no : album_no,
									music_no : music_no,
									seq_no : musiclist[i].seq_no
								},
								function(resultObj) {
									var ajaxResult = resultObj.ajaxResult;
									if (ajaxResult.status == "success") {
										//alert("회원가입 성공!");
										location.reload(true);
									} else {
										alert("목록 변경 실패");
									}
								},'json');
								
								
							
							}
						}
						//console.log(musiclist);
						//console.log(musiclist.length);

						else {
							return false;
						}
					}
				});


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



	});
});

