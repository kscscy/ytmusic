delete from check_time;
insert into check_time(s_time,c_kind) values(10,1);
insert into check_time(s_time,c_kind) values(10,2);

delete from a_music;
INSERT INTO `ytmusic`.`A_MUSIC` (`SEQ_NO`, `A_NO`, `ID`) VALUES ('1', '1', 'BC2dRkm8ATU');
INSERT INTO `ytmusic`.`A_MUSIC` (`SEQ_NO`, `A_NO`, `ID`) VALUES ('2', '1', 'c2EJMd7ZN7w');
INSERT INTO `ytmusic`.`A_MUSIC` (`SEQ_NO`, `A_NO`, `ID`) VALUES ('3', '1', 'ej2Td1mKeoQ');
INSERT INTO `ytmusic`.`A_MUSIC` (`SEQ_NO`, `A_NO`, `ID`) VALUES ('4', '1', 'FMlcn-_jpWY');
INSERT INTO `ytmusic`.`A_MUSIC` (`SEQ_NO`, `A_NO`, `ID`) VALUES ('5', '1', 'VOAoF09QG6k');

INSERT INTO ALBUM (`A_NO`, `MEM_NO`, `NAME`) VALUES ('1', '1', '1월 앨범');
INSERT INTO ALBUM (`A_NO`, `MEM_NO`, `NAME`) VALUES ('2', '1', '2월 앨범');
INSERT INTO ALBUM (`A_NO`, `MEM_NO`, `NAME`) VALUES ('3', '1', '3월 앨범');


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

-- 뮤직차트
DROP TABLE IF EXISTS CHART_MUSIC RESTRICT;

-- 타임체크
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
  ID      VARCHAR(50)   NOT NULL COMMENT '음악아이디', -- 음악아이디
  MU_NO   INTEGER       NOT NULL COMMENT '음악번호', -- 음악번호
  Y_TITLE VARCHAR(255)  NOT NULL COMMENT '유투브제목', -- 유투브제목
  TITLE   VARCHAR(255)  NOT NULL COMMENT '음악제목', -- 음악제목
  ARTIST  VARCHAR(255)  NULL     COMMENT '아티스트', -- 아티스트
  IMG     VARCHAR(255)  NOT NULL COMMENT '음악이미지', -- 음악이미지
  A_URL   VARCHAR(1000) NOT NULL COMMENT '음악오디오URL', -- 음악오디오URL
  V_URL   VARCHAR(1000) NULL     COMMENT '음악비디오URL', -- 음악비디오URL
  COUNT   INTEGER       NULL     COMMENT '음악재생횟수', -- 음악재생횟수
  VIEWS   INTEGER       NULL     COMMENT '음악조회수', -- 음악조회수
  EXPIRE  BIGINT        NOT NULL COMMENT '유효기간' -- 유효기간
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

  
CREATE TABLE A_MUSIC (
  SEQ_NO INTEGER     NOT NULL COMMENT '순서', -- 순서
  A_NO   INTEGER     NOT NULL COMMENT '앨범번호', -- 앨범번호
  ID     VARCHAR(50) NOT NULL COMMENT '음악아이디' -- 음악아이디
)
COMMENT '앨범음악';

-- 앨범음악
ALTER TABLE A_MUSIC
  ADD CONSTRAINT PK_A_MUSIC -- 앨범음악 기본키2
    PRIMARY KEY (
      SEQ_NO, -- 순서
      A_NO,   -- 앨범번호
      ID      -- 음악아이디
    );

ALTER TABLE A_MUSIC
  MODIFY COLUMN SEQ_NO INTEGER NOT NULL AUTO_INCREMENT COMMENT '순서';
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

-- 뮤직차트
CREATE TABLE CHART_MUSIC (
  CM_NO   INTEGER      NOT NULL COMMENT '차트음악번호', -- 차트음악번호
  Y_TITLE VARCHAR(255) NULL     COMMENT '유투브제목', -- 유투브제목
  TITLE   VARCHAR(255) NULL     COMMENT '음악제목', -- 음악제목
  ARTIST  VARCHAR(255) NULL     COMMENT '가수명', -- 가수명
  IMG     VARCHAR(255) NULL     COMMENT '이미지', -- 이미지
  C_KIND  INTEGER      NULL     COMMENT '차트종류', -- 차트종류
  ID      VARCHAR(50)  NULL     COMMENT '음악아이디' -- 음악아이디
)
COMMENT '뮤직차트';

-- 뮤직차트
ALTER TABLE CHART_MUSIC
  ADD CONSTRAINT PK_CHART_MUSIC -- 뮤직차트 기본키
    PRIMARY KEY (
      CM_NO -- 차트음악번호
    );

ALTER TABLE CHART_MUSIC
  MODIFY COLUMN CM_NO INTEGER NOT NULL AUTO_INCREMENT COMMENT '차트음악번호';

-- 타임체크
CREATE TABLE CHECK_TIME (
  C_KIND INTEGER NOT NULL COMMENT '차트종류', -- 차트종류
  S_TIME BIGINT  NOT NULL DEFAULT 10 COMMENT '저장시간' -- 저장시간
)
COMMENT '타임체크';

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