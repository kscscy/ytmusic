-- 회원
DROP TABLE IF EXISTS MEMBER RESTRICT;

-- 앨범
DROP TABLE IF EXISTS ALBUM RESTRICT;

-- 앨범음악
DROP TABLE IF EXISTS A_MUSIC RESTRICT;

-- 재생로그
DROP TABLE IF EXISTS PLAYLOG RESTRICT;

-- 음악
DROP TABLE IF EXISTS MUSIC RESTRICT;

-- 검색로그
DROP TABLE IF EXISTS SEARCH RESTRICT;

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

-- 앨범 유니크 인덱스
CREATE UNIQUE INDEX UIX_ALBUM
  ON ALBUM ( -- 앨범
    NAME ASC,   -- 앨범명
    MEM_NO ASC  -- 회원번호
  );

-- 앨범음악
CREATE TABLE A_MUSIC (
  A_NO  INTEGER NOT NULL COMMENT '앨범번호', -- 앨범번호
  MU_NO INTEGER NOT NULL COMMENT '음악번호' -- 음악번호
)
COMMENT '앨범음악';

-- 앨범음악
ALTER TABLE A_MUSIC
  ADD CONSTRAINT PK_A_MUSIC -- 앨범음악 기본키2
    PRIMARY KEY (
      A_NO,  -- 앨범번호
      MU_NO  -- 음악번호
    );

-- 재생로그
CREATE TABLE PLAYLOG (
  PL_NO  INTEGER      NOT NULL COMMENT '재생목록번호', -- 재생목록번호
  MU_NO  INTEGER      NOT NULL COMMENT '음악번호', -- 음악번호
  MEM_NO INTEGER      NOT NULL COMMENT '회원번호', -- 회원번호
  P_DATE DATETIME     NOT NULL COMMENT '날짜', -- 날짜
  TITLE  VARCHAR(255) NULL     COMMENT '제목' -- 제목
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

-- 음악
CREATE TABLE MUSIC (
  MU_NO INTEGER      NOT NULL COMMENT '음악번호', -- 음악번호
  ID    VARCHAR(50)  NOT NULL COMMENT '음악아이디', -- 음악아이디
  TITLE VARCHAR(255) NOT NULL COMMENT '음악제목', -- 음악제목
  IMG   VARCHAR(255) NULL     COMMENT '음악이미지', -- 음악이미지
  A_URL VARCHAR(255) NULL     COMMENT '음악오디오URL', -- 음악오디오URL
  V_URL VARCHAR(255) NULL     COMMENT '음악비디오URL', -- 음악비디오URL
  COUNT INTEGER      NULL     COMMENT '음악재생횟수', -- 음악재생횟수
  VIEWS INTEGER      NULL     COMMENT '음악조회수' -- 음악조회수
)
COMMENT '음악';

-- 음악
ALTER TABLE MUSIC
  ADD CONSTRAINT PK_MUSIC -- 음악 기본키
    PRIMARY KEY (
      MU_NO -- 음악번호
    );

-- 음악 유니크 인덱스
CREATE UNIQUE INDEX UIX_MUSIC
  ON MUSIC ( -- 음악
    ID ASC -- 음악아이디
  );

ALTER TABLE MUSIC
  MODIFY COLUMN MU_NO INTEGER NOT NULL AUTO_INCREMENT COMMENT '음악번호';

-- 검색로그
CREATE TABLE SEARCH (
  S_NO   INTEGER     NOT NULL COMMENT '검색번호', -- 검색번호
  S_WORD VARCHAR(50) NOT NULL COMMENT '검색어', -- 검색어
  S_DATE DATETIME    NOT NULL COMMENT '날짜' -- 날짜
)
COMMENT '검색로그';

-- 검색로그
ALTER TABLE SEARCH
  ADD CONSTRAINT PK_SEARCH -- 검색로그 기본키
    PRIMARY KEY (
      S_NO -- 검색번호
    );

ALTER TABLE SEARCH
  MODIFY COLUMN S_NO INTEGER NOT NULL AUTO_INCREMENT COMMENT '검색번호';

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
  ADD CONSTRAINT FK_MUSIC_TO_A_MUSIC -- 음악 -> 앨범음악2
    FOREIGN KEY (
      MU_NO -- 음악번호
    )
    REFERENCES MUSIC ( -- 음악
      MU_NO -- 음악번호
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
      MU_NO -- 음악번호
    )
    REFERENCES MUSIC ( -- 음악
      MU_NO -- 음악번호
    );