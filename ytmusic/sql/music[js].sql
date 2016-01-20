-- 검색로그
DROP TABLE IF EXISTS SEARCH RESTRICT;

-- 음악
DROP TABLE IF EXISTS MUSIC RESTRICT;

-- 앨범
DROP TABLE IF EXISTS ALBUM RESTRICT;

-- 회원
DROP TABLE IF EXISTS MEMBER RESTRICT;

-- 앨범음악
DROP TABLE IF EXISTS A_MUSIC RESTRICT;

-- 재생로그
DROP TABLE IF EXISTS PLAYLOG RESTRICT;

-- 새 테이블
DROP TABLE IF EXISTS MELON_CHART RESTRICT;

-- 임시 테이블
DROP TABLE IF EXISTS CHART_MUSIC RESTRICT;

-- 새 테이블2
DROP TABLE IF EXISTS CHECK_TIME RESTRICT;

-- 임시 테이블2
DROP TABLE IF EXISTS CHECK_TIME RESTRICT;

-- 검색로그
CREATE TABLE SEARCH (
  S_NO   INTEGER     NOT NULL COMMENT '검색번호', -- 검색번호
  S_WORD VARCHAR(50) NOT NULL COMMENT '검색어', -- 검색어
  S_DATE DATE        NOT NULL COMMENT '날짜' -- 날짜
)
COMMENT '검색로그';

-- 검색로그
ALTER TABLE SEARCH
  ADD CONSTRAINT PK_SEARCH -- 검색로그 기본키
    PRIMARY KEY (
      S_NO -- 검색번호
    );

-- 검색로그 유니크 인덱스
CREATE UNIQUE INDEX UIX_SEARCH
  ON SEARCH ( -- 검색로그
    S_NO ASC -- 검색번호
  );

ALTER TABLE SEARCH
  MODIFY COLUMN S_NO INTEGER NOT NULL AUTO_INCREMENT COMMENT '검색번호';

-- 음악
CREATE TABLE MUSIC (
  ID     VARCHAR(50)   NOT NULL COMMENT '음악아이디', -- 음악아이디
  MU_NO  INTEGER       NOT NULL COMMENT '음악번호', -- 음악번호
  TITLE  VARCHAR(255)  NOT NULL COMMENT '음악제목', -- 음악제목
  IMG    VARCHAR(255)  NOT NULL COMMENT '음악이미지', -- 음악이미지
  A_URL  VARCHAR(1000) NOT NULL COMMENT '음악오디오URL', -- 음악오디오URL
  V_URL  VARCHAR(1000) NULL     COMMENT '음악비디오URL', -- 음악비디오URL
  COUNT  INTEGER       NULL     COMMENT '음악재생횟수', -- 음악재생횟수
  VIEWS  INTEGER       NULL     COMMENT '음악조회수', -- 음악조회수
  EXPIRE BIGINT        NOT NULL COMMENT '유효기간' -- 유효기간
)
COMMENT '음악';

-- 음악
ALTER TABLE MUSIC
  ADD CONSTRAINT PK_MUSIC -- 음악 기본키
    PRIMARY KEY (
      ID -- 음악아이디
    );

-- 음악 유니크 인덱스
CREATE UNIQUE INDEX UIX_MUSIC
  ON MUSIC ( -- 음악
    MU_NO ASC -- 음악번호
  );

ALTER TABLE MUSIC
  MODIFY COLUMN MU_NO INTEGER NOT NULL AUTO_INCREMENT COMMENT '음악번호';

-- 앨범
CREATE TABLE ALBUM (
  A_NO   INTEGER      NOT NULL COMMENT '앨범번호', -- 앨범번호
  MEM_NO INTEGER      NOT NULL COMMENT '회원번호', -- 회원번호
  NAME   VARCHAR(255) NOT NULL COMMENT '앨범명' -- 앨범명
)
COMMENT '앨범';

-- 앨범
ALTER TABLE ALBUM
  ADD CONSTRAINT PK_ALBUM -- 앨범 기본키
    PRIMARY KEY (
      A_NO -- 앨범번호
    );

ALTER TABLE ALBUM
  MODIFY COLUMN A_NO INTEGER NOT NULL AUTO_INCREMENT COMMENT '앨범번호';

-- 회원
CREATE TABLE MEMBER (
  MEM_NO INTEGER      NOT NULL COMMENT '회원번호', -- 회원번호
  EMAIL  VARCHAR(40)  NOT NULL COMMENT '이메일', -- 이메일
  PWD    VARCHAR(255) NOT NULL COMMENT '비밀번호' -- 비밀번호
)
COMMENT '회원';

-- 회원
ALTER TABLE MEMBER
  ADD CONSTRAINT PK_MEMBER -- 회원 기본키
    PRIMARY KEY (
      MEM_NO -- 회원번호
    );

-- 회원 유니크 인덱스
CREATE UNIQUE INDEX UIX_MEMBER
  ON MEMBER ( -- 회원
    EMAIL ASC -- 이메일
  );

ALTER TABLE MEMBER
  MODIFY COLUMN MEM_NO INTEGER NOT NULL AUTO_INCREMENT COMMENT '회원번호';

-- 앨범음악
CREATE TABLE A_MUSIC (
  A_NO   INTEGER     NOT NULL COMMENT '앨범번호', -- 앨범번호
  ID     VARCHAR(50) NOT NULL COMMENT '음악아이디', -- 음악아이디
  SEQ_NO INTEGER     NOT NULL COMMENT '순서' -- 순서
)
COMMENT '앨범음악';

-- 앨범음악
ALTER TABLE A_MUSIC
  ADD CONSTRAINT PK_A_MUSIC -- 앨범음악 기본키2
    PRIMARY KEY (
      A_NO, -- 앨범번호
      ID    -- 음악아이디
    );

-- 재생로그
CREATE TABLE PLAYLOG (
  PL_NO  INTEGER      NOT NULL COMMENT '재생목록번호', -- 재생목록번호
  MEM_NO INTEGER      NOT NULL COMMENT '회원번호', -- 회원번호
  P_DATE DATE         NOT NULL COMMENT '날짜', -- 날짜
  TITLE  VARCHAR(255) NULL     COMMENT '제목', -- 제목
  SEQ_NO INTEGER      NOT NULL COMMENT '순서', -- 순서
  ID     VARCHAR(50)  NOT NULL COMMENT '음악아이디' -- 음악아이디
)
COMMENT '재생로그';

-- 재생로그
ALTER TABLE PLAYLOG
  ADD CONSTRAINT PK_PLAYLOG -- 재생로그 기본키
    PRIMARY KEY (
      PL_NO -- 재생목록번호
    );

ALTER TABLE PLAYLOG
  MODIFY COLUMN PL_NO INTEGER NOT NULL AUTO_INCREMENT COMMENT '재생목록번호';

-- 새 테이블
CREATE TABLE MELON_CHART (
  MC_NO  <데이터 타입 없음> NOT NULL COMMENT '차트번호', -- 차트번호
  REAR_T <데이터 타입 없음> NOT NULL COMMENT '실시간', -- 실시간
  DAY    <데이터 타입 없음> NOT NULL COMMENT '일간', -- 일간
  WEEK   <데이터 타입 없음> NOT NULL COMMENT '주간' -- 주간
)
COMMENT '새 테이블';

-- 새 테이블
ALTER TABLE MELON_CHART
  ADD CONSTRAINT PK_MELON_CHART -- 새 테이블 기본키
    PRIMARY KEY (
      MC_NO -- 차트번호
    );

-- 임시 테이블
CREATE TABLE CHART_MUSIC (
  CM_NO  INTEGER      NOT NULL COMMENT '차트음악번호', -- 차트음악번호
  TITLE  VARCHAR(255) NOT NULL COMMENT '음악제목', -- 음악제목
  ARTIST VARCHAR(255) NOT NULL COMMENT '가수명', -- 가수명
  IMG    VARCHAR(255) NOT NULL COMMENT '이미지', -- 이미지
  C_KIND INTEGER      NOT NULL COMMENT '차트종류', -- 차트종류
  M_ID   VARCHAR(50)  NOT NULL COMMENT '음악아이디' -- 음악아이디
)
COMMENT '임시 테이블';

-- 임시 테이블
ALTER TABLE CHART_MUSIC
  ADD CONSTRAINT PK_CHART_MUSIC -- 임시 테이블 기본키
    PRIMARY KEY (
      CM_NO -- 차트음악번호
    );

-- 새 테이블2
CREATE TABLE CHECK_TIME (
)
COMMENT '새 테이블2';

-- 임시 테이블2
CREATE TABLE CHECK_TIME (
  S_TIME BIGINT NOT NULL COMMENT '저장시간' -- 저장시간
)
COMMENT '임시 테이블2';

-- 앨범
ALTER TABLE ALBUM
  ADD CONSTRAINT FK_MEMBER_TO_ALBUM -- 회원 -> 앨범
    FOREIGN KEY (
      MEM_NO -- 회원번호
    )
    REFERENCES MEMBER ( -- 회원
      MEM_NO -- 회원번호
    );

-- 앨범음악
ALTER TABLE A_MUSIC
  ADD CONSTRAINT FK_ALBUM_TO_A_MUSIC -- 앨범 -> 앨범음악
    FOREIGN KEY (
      A_NO -- 앨범번호
    )
    REFERENCES ALBUM ( -- 앨범
      A_NO -- 앨범번호
    );

-- 앨범음악
ALTER TABLE A_MUSIC
  ADD CONSTRAINT FK_MUSIC_TO_A_MUSIC -- 음악 -> 앨범음악
    FOREIGN KEY (
      ID -- 음악아이디
    )
    REFERENCES MUSIC ( -- 음악
      ID -- 음악아이디
    );

-- 재생로그
ALTER TABLE PLAYLOG
  ADD CONSTRAINT FK_MEMBER_TO_PLAYLOG -- 회원 -> 재생로그
    FOREIGN KEY (
      MEM_NO -- 회원번호
    )
    REFERENCES MEMBER ( -- 회원
      MEM_NO -- 회원번호
    );

-- 재생로그
ALTER TABLE PLAYLOG
  ADD CONSTRAINT FK_MUSIC_TO_PLAYLOG -- 음악 -> 재생로그
    FOREIGN KEY (
      ID -- 음악아이디
    )
    REFERENCES MUSIC ( -- 음악
      ID -- 음악아이디
    );

-- 임시 테이블
ALTER TABLE CHART_MUSIC
  ADD CONSTRAINT FK_MUSIC_TO_CHART_MUSIC -- 음악 -> 임시 테이블
    FOREIGN KEY (
      M_ID -- 음악아이디
    )
    REFERENCES MUSIC ( -- 음악
      ID -- 음악아이디
    );