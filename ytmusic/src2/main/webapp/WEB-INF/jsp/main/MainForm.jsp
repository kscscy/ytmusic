<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<title>냥냥이닷컴</title>
<link rel="stylesheet" href="../css/1cat.css">
<link rel="stylesheet" href="../css/1dog.css">
<link rel="stylesheet" href="../css/1slide.css">
<link rel="stylesheet" href="../css/1layout.css" type="text/css" />
<script type="text/javascript" src="../css/1min.js"></script>
<!-- 슬라이드 부분 -->
<script type="text/javascript" src="../css/1caro.js"></script>
<script type="text/javascript" src="../css/1setup.js"></script>
<!-- 슬라이드 부분 끝 -->
<script src="../css/1lion.js"></script>
<script src="../css/1mouse.js"></script>
<script src="../css/1rabbit.js"></script>
<script src="../css/1tiger.js"></script>
<script type="text/javascript">
	<script type="application/ld+json">
	<div style="border:1px solid #990000;padding-left:20px;margin:0 0 10px 0;">
	</div>null
</script>

<style type="text/css">
.fb_hidden {
	position: absolute;
	top: -10000px;
	z-index: 10001
}

.fb_reposition {
	overflow-x: hidden;
	position: relative
}

.fb_invisible {
	display: none
}

.fb_reset {
	background: none;
	border: 0;
	border-spacing: 0;
	color: #000;
	cursor: auto;
	direction: ltr;
	font-family: "lucida grande", tahoma, verdana, arial, sans-serif;
	font-size: 11px;
	font-style: normal;
	font-variant: normal;
	font-weight: normal;
	letter-spacing: normal;
	line-height: 1;
	margin: 0;
	overflow: visible;
	padding: 0;
	text-align: left;
	text-decoration: none;
	text-indent: 0;
	text-shadow: none;
	text-transform: none;
	visibility: visible;
	white-space: normal;
	word-spacing: normal
}

.fb_reset>div {
	overflow: hidden
}

.fb_link img {
	border: none
}

.fb_dialog {
	background: rgba(82, 82, 82, .7);
	position: absolute;
	top: -10000px;
	z-index: 10001
}

.fb_reset .fb_dialog_legacy {
	overflow: visible
}

.fb_dialog_advanced {
	padding: 10px;
	-moz-border-radius: 8px;
	-webkit-border-radius: 8px;
	border-radius: 8px
}

.fb_dialog_content {
	background: #fff;
	color: #333
}

.fb_dialog_close_icon {
	background:
		url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/yq/r/IE9JII6Z1Ys.png)
		no-repeat scroll 0 0 transparent;
	_background-image:
		url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/yL/r/s816eWC-2sl.gif);
	cursor: pointer;
	display: block;
	height: 15px;
	position: absolute;
	right: 18px;
	top: 17px;
	width: 15px
}

.fb_dialog_mobile .fb_dialog_close_icon {
	top: 5px;
	left: 5px;
	right: auto
}

.fb_dialog_padding {
	background-color: transparent;
	position: absolute;
	width: 1px;
	z-index: -1
}

.fb_dialog_close_icon:hover {
	background:
		url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/yq/r/IE9JII6Z1Ys.png)
		no-repeat scroll 0 -15px transparent;
	_background-image:
		url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/yL/r/s816eWC-2sl.gif)
}

.fb_dialog_close_icon:active {
	background:
		url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/yq/r/IE9JII6Z1Ys.png)
		no-repeat scroll 0 -30px transparent;
	_background-image:
		url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/yL/r/s816eWC-2sl.gif)
}

.fb_dialog_loader {
	background-color: #f6f7f8;
	border: 1px solid #606060;
	font-size: 24px;
	padding: 20px
}

.fb_dialog_top_left, .fb_dialog_top_right, .fb_dialog_bottom_left,
	.fb_dialog_bottom_right {
	height: 10px;
	width: 10px;
	overflow: hidden;
	position: absolute
}

.fb_dialog_top_left {
	background:
		url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/ye/r/8YeTNIlTZjm.png)
		no-repeat 0 0;
	left: -10px;
	top: -10px
}

.fb_dialog_top_right {
	background:
		url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/ye/r/8YeTNIlTZjm.png)
		no-repeat 0 -10px;
	right: -10px;
	top: -10px
}

.fb_dialog_bottom_left {
	background:
		url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/ye/r/8YeTNIlTZjm.png)
		no-repeat 0 -20px;
	bottom: -10px;
	left: -10px
}

.fb_dialog_bottom_right {
	background:
		url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/ye/r/8YeTNIlTZjm.png)
		no-repeat 0 -30px;
	right: -10px;
	bottom: -10px
}

.fb_dialog_vert_left, .fb_dialog_vert_right, .fb_dialog_horiz_top,
	.fb_dialog_horiz_bottom {
	position: absolute;
	background: #525252;
	filter: alpha(opacity = 70);
	opacity: .7
}

.fb_dialog_vert_left, .fb_dialog_vert_right {
	width: 10px;
	height: 100%
}

.fb_dialog_vert_left {
	margin-left: -10px
}

.fb_dialog_vert_right {
	right: 0;
	margin-right: -10px
}

.fb_dialog_horiz_top, .fb_dialog_horiz_bottom {
	width: 100%;
	height: 10px
}

.fb_dialog_horiz_top {
	margin-top: -10px
}

.fb_dialog_horiz_bottom {
	bottom: 0;
	margin-bottom: -10px
}

.fb_dialog_iframe {
	line-height: 0
}

.fb_dialog_content .dialog_title {
	background: #6d84b4;
	border: 1px solid #3a5795;
	color: #fff;
	font-size: 14px;
	font-weight: bold;
	margin: 0
}

.fb_dialog_content .dialog_title>span {
	background:
		url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/yd/r/Cou7n-nqK52.gif)
		no-repeat 5px 50%;
	float: left;
	padding: 5px 0 7px 26px
}

body.fb_hidden {
	-webkit-transform: none;
	height: 100%;
	margin: 0;
	overflow: visible;
	position: absolute;
	top: -10000px;
	left: 0;
	width: 100%
}

.fb_dialog.fb_dialog_mobile.loading {
	background:
		url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/ya/r/3rhSv5V8j3o.gif)
		white no-repeat 50% 50%;
	min-height: 100%;
	min-width: 100%;
	overflow: hidden;
	position: absolute;
	top: 0;
	z-index: 10001
}

.fb_dialog.fb_dialog_mobile.loading.centered {
	width: auto;
	height: auto;
	min-height: initial;
	min-width: initial;
	background: none
}

.fb_dialog.fb_dialog_mobile.loading.centered #fb_dialog_loader_spinner {
	width: 100%
}

.fb_dialog.fb_dialog_mobile.loading.centered .fb_dialog_content {
	background: none
}

.loading.centered #fb_dialog_loader_close {
	color: #fff;
	display: block;
	padding-top: 20px;
	clear: both;
	font-size: 18px
}

#fb-root #fb_dialog_ipad_overlay {
	background: rgba(0, 0, 0, .45);
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	min-height: 100%;
	z-index: 10000
}

#fb-root #fb_dialog_ipad_overlay.hidden {
	display: none
}

.fb_dialog.fb_dialog_mobile.loading iframe {
	visibility: hidden
}

.fb_dialog_content .dialog_header {
	-webkit-box-shadow: white 0 1px 1px -1px inset;
	background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#738ABA),
		to(#2C4987));
	border-bottom: 1px solid;
	border-color: #1d4088;
	color: #fff;
	font: 14px Helvetica, sans-serif;
	font-weight: bold;
	text-overflow: ellipsis;
	text-shadow: rgba(0, 30, 84, .296875) 0 -1px 0;
	vertical-align: middle;
	white-space: nowrap
}

.fb_dialog_content .dialog_header table {
	-webkit-font-smoothing: subpixel-antialiased;
	height: 43px;
	width: 100%
}

.fb_dialog_content .dialog_header td.header_left {
	font-size: 12px;
	padding-left: 5px;
	vertical-align: middle;
	width: 60px
}

.fb_dialog_content .dialog_header td.header_right {
	font-size: 12px;
	padding-right: 5px;
	vertical-align: middle;
	width: 60px
}

.fb_dialog_content .touchable_button {
	background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#4966A6),
		color-stop(.5, #355492), to(#2A4887));
	border: 1px solid #2f477a;
	-webkit-background-clip: padding-box;
	-webkit-border-radius: 3px;
	-webkit-box-shadow: rgba(0, 0, 0, .117188) 0 1px 1px inset,
		rgba(255, 255, 255, .167969) 0 1px 0;
	display: inline-block;
	margin-top: 3px;
	max-width: 85px;
	line-height: 18px;
	padding: 4px 12px;
	position: relative
}

.fb_dialog_content .dialog_header .touchable_button input {
	border: none;
	background: none;
	color: #fff;
	font: 12px Helvetica, sans-serif;
	font-weight: bold;
	margin: 2px -12px;
	padding: 2px 6px 3px 6px;
	text-shadow: rgba(0, 30, 84, .296875) 0 -1px 0
}

.fb_dialog_content .dialog_header .header_center {
	color: #fff;
	font-size: 16px;
	font-weight: bold;
	line-height: 18px;
	text-align: center;
	vertical-align: middle
}

.fb_dialog_content .dialog_content {
	background:
		url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/y9/r/jKEcVPZFk-2.gif)
		no-repeat 50% 50%;
	border: 1px solid #555;
	border-bottom: 0;
	border-top: 0;
	height: 150px
}

.fb_dialog_content .dialog_footer {
	background: #f6f7f8;
	border: 1px solid #555;
	border-top-color: #ccc;
	height: 40px
}

#fb_dialog_loader_close {
	float: left
}

.fb_dialog.fb_dialog_mobile .fb_dialog_close_button {
	text-shadow: rgba(0, 30, 84, .296875) 0 -1px 0
}

.fb_dialog.fb_dialog_mobile .fb_dialog_close_icon {
	visibility: hidden
}

#fb_dialog_loader_spinner {
	animation: rotateSpinner 1.2s linear infinite;
	background-color: transparent;
	background-image:
		url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/yD/r/t-wz8gw1xG1.png);
	background-repeat: no-repeat;
	background-position: 50% 50%;
	height: 24px;
	width: 24px
}

@
keyframes rotateSpinner { 0%{
	transform: rotate(0deg)
}

100%{
transform


:rotate(360deg)




}
}
.fb_iframe_widget {
	display: inline-block;
	position: relative
}

.fb_iframe_widget span {
	display: inline-block;
	position: relative;
	text-align: justify
}

.fb_iframe_widget iframe {
	position: absolute
}

.fb_iframe_widget_fluid_desktop, .fb_iframe_widget_fluid_desktop span,
	.fb_iframe_widget_fluid_desktop iframe {
	max-width: 100%
}

.fb_iframe_widget_fluid_desktop iframe {
	min-width: 220px;
	position: relative
}

.fb_iframe_widget_lift {
	z-index: 1
}

.fb_hide_iframes iframe {
	position: relative;
	left: -10000px
}

.fb_iframe_widget_loader {
	position: relative;
	display: inline-block
}

.fb_iframe_widget_fluid {
	display: inline
}

.fb_iframe_widget_fluid span {
	width: 100%
}

.fb_iframe_widget_loader iframe {
	min-height: 32px;
	z-index: 2;
	zoom: 1
}

.fb_iframe_widget_loader .FB_Loader {
	background:
		url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/y9/r/jKEcVPZFk-2.gif)
		no-repeat;
	height: 32px;
	width: 32px;
	margin-left: -16px;
	position: absolute;
	left: 50%;
	z-index: 4
}
</style>
</head>
<body class="Windows Chrome version47 responseLevel3 mainresponseLevel3">

	<div class="loadIndicator" style="display: none;">
		<div id="indi">
			<img src="//image.soribada.com/image/v25/common/large.png" alt="로딩바"
				style="transform: rotate(0deg);">
		</div>
	</div>
	<object width="1" height="1" id="sharedobject"
		type="application/x-shockwave-flash"
		data="/flash/common/so.swf?rnd=0.8697609466034919"
		style="visibility: visible;">
		<param name="allowScriptAccess" value="always">
		<param name="allowNetworking" value="all">
		<param name="wmode" value="opaque">
		<param name="flashvars"
			value="onLoadComplete=S.app.localStorage.onLoadComplete">
	</object>
	<!-- soribadaWrapper -->
	<div id="header">
		<a href="/" tabindex="1"><span class="hide">냥냥이닷컴</span></a>

		<!-- 검색 -->
		<div id="searchSection">
			<fieldset>
				<legend class="hide">검색</legend>
				<span> <input type="text" class="textType_hide"
					placeholder="">
				</span>
			</fieldset>
			<button class="searchBtn">
				<span>검색</span>
			</button>
			<div class="suggestion" style="display: none;"></div>
		</div>

		<div class="headerBanner">
			<a href="/djcamus/playlist/1531190" target="_self"><img src=""></a>
		</div>
		<div id="userSection">
			<div class="btnMypage">
				<a href="/member/login" class="login">로그인</a>
			</div>
		</div>
	</div>
	<!-- // header -->

	<div id="containers">
		<!-- containers -->
		<div id="leftContainer">
			<!-- leftContainer -->
			<div class="tse-scrollable leftContainerScrollWrapper"
				style="width: 185px; height: 665px;">
				<div class="tse-scrollbar" style="display: block;">
					<div class="drag-handle" style="top: 2px; height: 578px;"></div>
				</div>
				<div class="tse-scroll-content" style="width: 185px; height: 665px;">
					<div class="tse-content">
						<div id="leftContents">
							<!-- gnb -->
							<div id="gnb">
								<ul>
									<li class="lm gnb1"><a href="/music/new/recommend/all"
										title="최신앨범">최신앨범<span class="ir"></span></a></li>
									<li class="lm gnb2"><a href="/music/chart" title="인기차트">인기차트<span
											class="ir"></span></a></li>
									<li class="lm gnb3"><a href="/music/genre" title="장르음악">장르음악<span
											class="ir"></span></a></li>
									<li class="lm gnb4"><a href="/music/video" title="뮤직비디오">뮤직비디오<span
											class="ir"></span></a></li>
									<li class="lm gnb5"><a href="/recommend" title="추천음악">추천음악<span
											class="ir"></span></a></li>
									<li class="lm gnb6"><a href="/music/artist" title="아티스트랭킹">아티스트랭킹<span
											class="ir"></span></a></li>
								</ul>
							</div>
							<!-- /gnb -->

							<!-- 마이뮤직 -->
							<div id="cloudCounter" class="sideListType">
								<p class="title">
									<span>마이뮤직<span class="ir"></span></span>
								</p>
								<ul>
									<li class="mm music3"><span class="menuTxt" index="1"
										title="음악친구">음악친구<span class="ir"></span></span></li>
									<li class="mm music1"><span class="music1_margin"
										title="재생목록">재생목록<span class="ir"></span></span>
										<ul>
											<li class="mm my_list my_list01"><span class="menuTxt"
												index="3" title="즐겨찾기 곡">즐겨찾기 곡<span
													class="ir tit_ir"></span></span>
												<button class="btn fullPlay" title="전체듣기" index="3">
													전체듣기<span class="ir"></span>
												</button></li>
											<li class="mm my_list my_list02"><span class="menuTxt"
												index="4" title="최근 들은 곡">최근 들은 곡<span
													class="ir tit_ir"></span></span>
												<button class="btn fullPlay" title="전체듣기" index="1">
													전체듣기<span class="ir"></span>
												</button></li>
											<li class="mm my_list my_list03"><span class="menuTxt"
												index="5" title="많이 들은 곡">많이 들은 곡<span
													class="ir tit_ir"></span></span>
												<button class="btn fullPlay" title="전체듣기" index="2">
													전체듣기<span class="ir"></span>
												</button></li>
											<li class="mm my_list my_list04"><span class="menuTxt"
												index="6" title="내 목록">내 목록<span class="ir tit_ir"></span></span>
											</li>
										</ul></li>
									<li class="mm music2"><span class="menuTxt" index="0"
										title="구매한 음악">구매한 음악<span class="ir"></span></span></li>
									<li class="mm music4"><span class="menuTxt" index="2"
										title="내 클라우드">내 클라우드<span class="ir"></span></span></li>
								</ul>
							</div>
							<!-- /마이뮤직 -->

							<!-- 바로가기링크 -->
							<div class="siteUtils">
								<div class="btnBuy">
									<a href="/ticket/hit" title="이용권 구매">이용권구매</a>
								</div>
								<div class="moreMenu">
									<a href="/event/list/motion/all/1" class="btn_event"
										title="이벤트">이벤트</a> <a
										href="http://phone.soribada.com/soribada/list_main.asp"
										target="_blank" class="btn_phoneDeco" title="폰꾸미기">폰꾸미기</a>
								</div>
								<div class="serviceMenu">
									<a href="/cs/notic/1" target="_blank" class="service_notice"
										title="공지사항">공지사항</a> <span class="bar"></span> <a href="/cs"
										target="_blank" class="service_cs" title="고객센터">고객센터</a>
								</div>
								<div class="sns-link">
									<ul>
										<li><a href="https://www.facebook.com/soribada"
											target="_blank" class="btn_fb" title="페이스북">페이스북</a></li>
										<li><a href="http://twitter.com/soribada" target="_blank"
											class="btn_tw" title="트위터">트위터</a></li>
										<li><a href="http://blog.naver.com/soribada007"
											target="_blank" class="btn_blog" title="네이버 블로그">네이버 블로그</a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div id="centerContainer" style="width: 1195px;">
			<div class="tse-scrollable centerContainerScrollWrapper"
				style="width: 1195px; height: 665px;">
				<div class="tse-scroll-content"
					style="width: 1195px; height: 665px;">
					<div class="tse-content">
						<div id="centerContents" class="contentsNormal">
							<div id="mainContents" class="mainContents">
								<div class="album_recent">
									<div class="wrap_tit"></div>
									<div class="listRecent list_recent">
										<div class="wrapper col3">
											<div id="waterwheelCarousel">
												<img src="../image/1.gif" alt="" /> <img
													src="../image/2.gif" alt="" /> <img src="../image/3.gif"
													alt="" /> <img src="../image/4.gif" alt="" /> <img
													src="../image/5.gif" alt="" /> <img src="../image/6.gif"
													alt="" /> <img src="../image/7.gif" alt="" /> <img
													src="../image/8.gif" alt="" /> <img src="../image/9.gif"
													alt="" />
												<div class="catalogStyleType01 rListing"
													style="margin-top: -314px;"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="doubleContentsSection">
							<!-- // 소리바다 차트 -->
							<div class="chartSection">
								<div class="mainChartContent">
									<div class="sectionHeader">
										<h3 class="tit_chart img_chart">
											<a href="/music/chart" title="인기차트">인기차트</a>
										</h3>
									</div>
									<div class="wrap">
										<ul class="chart-list">
										</ul>
									</div>
								</div>
							</div>
							<div class="secondSection">
								<!-- // 추천음악 -->
								<div class="recommendMusic">
									<div class="sectionHeader">
										<h3 class="tit_recommend img_recomm">
											<a href="/recommend" title="추천음악">추천음악</a>
										</h3>

									</div>
									<div class="listRecomm list_recomm">
										<div class="mainRecommContent">
											<div class="recommendMusic recommendmusic_main renderType2">
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div id="rightContainer">
		<div class="tse-scrollable rightContainerScrollWrapper"
			style="width: 220px; height: 665px;">
			<div class="tse-scrollbar" style="display: block;">
				<div class="drag-handle" style="top: 2px; height: 532px;"></div>
			</div>
		</div>
	</div>

	<div id="footer">
		<div id="player" style="z-index: 100;">
			<div class="player">
				<div class="guide"></div>
				<div id="playerWrap" style="width: 1379px;">
					<div id="cover">
						<a> <img width="72" height="72" title="앨범커버"
							src="//image.soribada.com/image/v25/common/default_album.png">
							<span class="glow"></span> <span class="tag"
							style="display: none"></span>
						</a>
					</div>
					<div id="song-artist">
						<div class="info">
							<a id="pado_player" class="pado_player" title="파도"></a>
							<p class="pado_tit_wrap">
								<span id="adult" class="adult" style="display: none">19금</span>
								<strong>곡제목</strong> <em class="slash"> / </em> <span>아티스트</span>
							</p>
						</div>
					</div>
					<div id="infomation">
						<div id="_player_imfomation">
							<div class="info-cont info-cont-type1">
								<p class="txt">
									<strong>현재 재생목록에 곡이 없습니다.</strong>
								</p>
							</div>
						</div>
					</div>
					<div id="progress">
						<span id="time" class="disable"> <span class="now">00:00</span><em
							class="slash">/</em><span class="total">00:00</span>
						</span>
						<div class="base"></div>
						<div id="fill" style="width: 0px">
							<div class="bar">
								<div id="handle" class="disable" style="opacity: 0;"></div>
							</div>
						</div>
					</div>
					<div id="timeTool" style="display: none;">
						<div>00:00</div>
					</div>
					<div id="controller">
						<button id="prev" title="이전곡"></button>
						<button id="play" title="재생" class="play"></button>
						<!-- 일시정지-->
						<button id="next" title="다음곡"></button>
						<button id="loop" title="반복없음->전체반복" class="loop-off"></button>
						<button id="shuffle" title="순차재생->랜덤재생"></button>
					</div>
					<div id="features">
						<button id="favorite" class="dim" title="즐겨찾기"></button>
						<button id="btn-lyrics" class="dim" title="가사보기"
							subtitle="가사보기|가사등록"></button>
						<button id="down" class="dim" title="다운로드"></button>
						<div id="featuresTool"></div>
					</div>
					<div id="volume" title="볼륨">
						<div class="volumeWrap" style="display: none;">
							<div class="vol_base">
								<div class="vol_fill" style="width: 100%;">
									<div class="vol_bar">
										<div class="vol_handle" style="left: 100px;"></div>
									</div>
								</div>
							</div>
						</div>
						<div class="vol_btn"></div>
					</div>
				</div>
				<div class="function">
					<button id="list" title="재생목록">
						<span id="cart-status02" class="badge" style="display: none"><span
							class="num">0</span><span class="after"></span></span>
					</button>
					<button id="cart" title="다운로드">
						<span id="cart-status" class="badge" style="display: none"><span
							class="num">0</span><span class="after"></span></span>
					</button>
					<span id="tail" style="display: none"></span>
					<div id="notify"></div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>