
$('#login').click(
  function(event) {
  	var email = $('#useremail').val();
  	var password = $('#userpassword').val();
  	//var checkValue = $('input:checkbox[name=saveEmail]').is(':checked'));
		
  	$.post('auth/login.do', {
  		email: email,
  		password: password
  		
  	},
  	
     function(resultObj) {
      var ajaxResult = resultObj.ajaxResult;
			var testemail;
			if (ajaxResult.status  == "success") {
      	emailsession = ajaxResult.data.email;
      	//console.log(emailsession);
      	sessionStorage.setItem("emailsession", emailsession);
      	location.href = "index.html";
      	
      } else {
        alert("이메일 또는 비밀번호를 확인하세요.");
      }
    },'json');
  });

$('#signup').click(
		function(event) {
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
				focus.password;
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
	  	
	  	$.post('member/add.do', {
	  		email: email,
	  		password: $('#password').val()
	  		
	  	},
	     function(resultObj) {
	      var ajaxResult = resultObj.ajaxResult;
	      if (ajaxResult.status == "success") {
	        location.href = "index.html";
	      } else {
	        alert("회원가입실패");
	      }
	    },'json');
	  });


