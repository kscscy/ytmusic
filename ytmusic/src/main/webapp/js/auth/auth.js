$(document).ready(function() {
	
	sessionStorage.removeItem('checkEmail');
	sessionStorage.removeItem('checkedEmail');
});
$(function() {
	var useremail = $.cookie('useremail');
	if(useremail != undefined) {

		$("#useremail").val(useremail);
		$("#saveEmail").prop("checked",true);
	}

	$('#login').click(
			function(event) {
				var email = $('#useremail').val();
				var password = $('#userpassword').val();
				var checkBox = $('input:checkbox[id="saveEmail"]').is(":checked");

				if($("#saveEmail").prop("checked")) {
					$.cookie('useremail', email);
					//아이디저장 미체크면 쿠키에 정보가 있던간에 삭제
				} else {
					$.removeCookie("useremail");
				}

				if (email == '' || email == null) {
					alert('email을 입력하세요');

					$("input[id=useremail]").focus();
					return false;
				}
				if (password == '' || password == null) {
					alert('비밀번호를 입력하세요');
					$("input[id=userpassword]").focus();
					return false;
				}



				$.post('auth/login.do', {
					email: email,
					password: password

				},

				function(resultObj) {
					var ajaxResult = resultObj.ajaxResult;

					if (ajaxResult.status  == "success") {

						emailSession = ajaxResult.data.email;
						noSession = ajaxResult.data.mem_no;

						sessionStorage.setItem('emailSession', emailSession);
						sessionStorage.setItem('noSession', noSession);
						//$.session.set('emailSession',emailSession);
						//$.session.set('noSession',noSession);
						location.href = "index.html";

					} else {
						alert("이메일 또는 비밀번호를 확인하세요.");
					}
				},'json');
			});
});

$('#signup').click(
		function(event) {
			//sessionStorage.removeItem('checkEmail');
			//console.log("세션테스트 : " + sessionStorage.getItem("emailsession"));
			var email = $('#email').val();
			var password = $('#password').val();
			var passwordcheck = $('#passwordcheck').val();
			var regEmail = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

			if (email == '' || email == null) {
				alert('email을 입력하세요');

				$("input[id=email]").focus();
				return false;
			}
			if(!regEmail.test(email)) {
				alert('유효하지 않은 email입니다');
				$("input[id=email]").focus();
				return false;
			}
			if (password == '' || password == null) {
				alert('비밀번호를 입력하세요');
				$("input[id=password]").focus();
				return false;
			}

			if (passwordcheck == '' || passwordcheck == null) {
				alert('비밀번호확인란을 입력하세요');
				$("input[id=passwordcheck]").focus();
				return false;
			}

			/*비밀번호와 비밀번호확인란 같은지 확인*/
			if (password != passwordcheck){
				alert("비밀번호와 비밀번호 확인란이 다릅니다.");
				$("input[id=password]").focus();
				return false;
			} 
			if (sessionStorage.getItem('checkEmail') === 'success') {
				if (sessionStorage.getItem('checkedEmail') === $('#email').val()){
					$.post('member/add.do', {
						email: email,
						password: password
						
					},
					function(resultObj) {
						var ajaxResult = resultObj.ajaxResult;
						if (ajaxResult.status == "success") {
							alert("회원가입 성공!");
							location.href = "index.html";
						} else {
							alert("회원가입 실패");
						}
					},'json');
					
				} else {
					alert("중복검사를 다시 하세요");
					$("input[id=email]").focus();
				}
			} else {
				alert("이메일 중복을 검사하세요");
				$("input[id=email]").focus();
			}

		});

$('#duplicateCheck').click(
		function(event) {
			
			var email = $('#email').val();
			var regEmail = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

			if (email == '' || email == null) {
				alert('email을 입력하세요');

				$("input[id=email]").focus();
				return false;
			}
			if(!regEmail.test(email)) {
				alert('유효하지 않은 email입니다');
				$("input[id=email]").focus();
				return false;
			}
			$.ajax({
				url: "http://localhost:8081",
				type: 'POST',
				data: {
					email: email,
				},
				dataType:'json',
				beforeSend: function (xhr) {
					xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
				}
			}).done(function(resultObj) {
				var result = resultObj;
				if (result.status == "success") {
					//alert("사용 가능한 이메일");
					$("#dc").text('사용 가능한 이메일 입니다.');
					
					sessionStorage.setItem('checkEmail', result.status);
					sessionStorage.setItem('checkedEmail', email);
					console.log((sessionStorage.getItem('checkEmail') === 'success'));
					console.log((sessionStorage.getItem('checkedEmail') === $('#email').val()));
					//console.log(sessionStorage.getItem('checkEmail'));
				} else if (result.status == "fail") {
					//alert("중복된 이메일");
					$("#dc").text('사용할 수 없는 이메일 입니다.');
					$("input[id=email]").focus();
				}
			});
		});




$('#logoutbtn').click(

		function(event) {

			$.getJSON('auth/logout.do',
					function(resultObj) {
				var ajaxResult = resultObj.ajaxResult;
				if (ajaxResult.status == "success") {
					sessionStorage.clear();
					//$.session.clear();
					//$.session.remove('emailSession');
					//$.session.remove('noSession');
					location.href = "index.html";
				}
			},'json');
		});
$('#closeBtn').click(

		function(event) {
			sessionStorage.removeItem('checkEmail');
			location.href = "index.html";
		});