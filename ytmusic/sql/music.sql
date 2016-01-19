alter table music modify column mu_no int auto_increment;

-- 회원
DROP TABLE MEMBER;

-- 음악
DROP TABLE MUSIC;

-- 검색로그
DROP TABLE SEARCH;

-- 재생로그
DROP TABLE PLAYLOG;

-- 앨범
DROP TABLE ALBUM;

-- 앨범음악
DROP TABLE A_MUSIC;

-- 회원
CREATE TABLE MEMBER (
  MEM_NO INTEGER      NOT NULL, -- 회원번호
  EMAIL  VARCHAR(40)  NOT NULL, -- 이메일
  PWD    VARCHAR(255) NOT NULL  -- 비밀번호
);

-- 회원 기본키
CREATE UNIQUE INDEX PK_MEMBER
  ON MEMBER ( -- 회원
    MEM_NO ASC -- 회원번호
  );

-- 회원 유니크 인덱스
CREATE UNIQUE INDEX UIX_MEMBER
  ON MEMBER ( -- 회원
    EMAIL ASC -- 이메일
  );

-- 회원
ALTER TABLE MEMBER
  ADD
    CONSTRAINT PK_MEMBER -- 회원 기본키
    PRIMARY KEY (
      MEM_NO -- 회원번호
    );

-- 회원
ALTER TABLE MEMBER
  ADD
    CONSTRAINT UK_MEMBER -- 회원 유니크 제약
    UNIQUE (
      EMAIL -- 이메일
    );

-- 회원
COMMENT ON TABLE MEMBER IS '회원';

-- 회원번호
COMMENT ON COLUMN MEMBER.MEM_NO IS '회원번호';

-- 이메일
COMMENT ON COLUMN MEMBER.EMAIL IS '이메일';

-- 비밀번호
COMMENT ON COLUMN MEMBER.PWD IS '비밀번호';

-- 회원 기본키
COMMENT ON INDEX PK_MEMBER IS '회원 기본키';

-- 회원 유니크 인덱스
COMMENT ON INDEX UIX_MEMBER IS '회원 유니크 인덱스';

-- 회원 기본키
COMMENT ON CONSTRAINT MEMBER.PK_MEMBER IS '회원 기본키';

-- 회원 유니크 제약
COMMENT ON CONSTRAINT MEMBER.UK_MEMBER IS '회원 유니크 제약';

-- 음악
CREATE TABLE MUSIC (
  MU_NO  INTEGER       NOT NULL, -- 음악번호
  ID     VARCHAR(50)   NOT NULL, -- 음악아이디
  TITLE  VARCHAR(255)  NOT NULL, -- 음악제목
  IMG    VARCHAR(255)  NULL,     -- 음악이미지
  A_URL  VARCHAR(1000) NULL,     -- 음악오디오URL
  V_URL  VARCHAR(1000) NULL,     -- 음악비디오URL
  COUNT  INTEGER       NULL,     -- 음악재생횟수
  VIEWS  INTEGER       NULL,     -- 음악조회수
  S_DATE INTEGER       NULL      -- 저장날짜
);

-- 음악 기본키
CREATE UNIQUE INDEX PK_MUSIC
  ON MUSIC ( -- 음악
    MU_NO ASC -- 음악번호
  );

-- 음악
ALTER TABLE MUSIC
  ADD
    CONSTRAINT PK_MUSIC -- 음악 기본키
    PRIMARY KEY (
      MU_NO -- 음악번호
    );

-- 음악
COMMENT ON TABLE MUSIC IS '음악';

-- 음악번호
COMMENT ON COLUMN MUSIC.MU_NO IS '음악번호';

-- 음악아이디
COMMENT ON COLUMN MUSIC.ID IS '음악아이디';

-- 음악제목
COMMENT ON COLUMN MUSIC.TITLE IS '음악제목';

-- 음악이미지
COMMENT ON COLUMN MUSIC.IMG IS '음악이미지';

-- 음악오디오URL
COMMENT ON COLUMN MUSIC.A_URL IS '음악오디오URL';


-- 음악비디오URL
COMMENT ON COLUMN MUSIC.V_URL IS '음악비디오URL';

-- 음악재생횟수
COMMENT ON COLUMN MUSIC.COUNT IS '음악재생횟수';

-- 음악조회수
COMMENT ON COLUMN MUSIC.VIEWS IS '음악조회수';

-- 저장날짜
COMMENT ON COLUMN MUSIC.S_DATE IS '저장날짜';

-- 음악 기본키
COMMENT ON INDEX PK_MUSIC IS '음악 기본키';

-- 음악 기본키
COMMENT ON CONSTRAINT MUSIC.PK_MUSIC IS '음악 기본키';

-- 검색로그
CREATE TABLE SEARCH (
  S_NO   INTEGER     NOT NULL, -- 검색번호
  S_WORD VARCHAR(50) NOT NULL, -- 검색어
  S_DATE DATE        NOT NULL  -- 날짜
);

-- 검색로그 기본키
CREATE UNIQUE INDEX PK_SEARCH
  ON SEARCH ( -- 검색로그
    S_NO ASC -- 검색번호
  );

-- 검색로그 유니크 인덱스
CREATE UNIQUE INDEX UIX_SEARCH
  ON SEARCH ( -- 검색로그
    S_NO ASC -- 검색번호
  );

-- 검색로그
ALTER TABLE SEARCH
  ADD
    CONSTRAINT PK_SEARCH -- 검색로그 기본키
    PRIMARY KEY (
      S_NO -- 검색번호
    );

-- 검색로그
COMMENT ON TABLE SEARCH IS '검색로그';

-- 검색번호
COMMENT ON COLUMN SEARCH.S_NO IS '검색번호';

-- 검색어
COMMENT ON COLUMN SEARCH.S_WORD IS '검색어';

-- 날짜
COMMENT ON COLUMN SEARCH.S_DATE IS '날짜';

-- 검색로그 기본키
COMMENT ON INDEX PK_SEARCH IS '검색로그 기본키';

-- 검색로그 유니크 인덱스
COMMENT ON INDEX UIX_SEARCH IS '검색로그 유니크 인덱스';

-- 검색로그 기본키
COMMENT ON CONSTRAINT SEARCH.PK_SEARCH IS '검색로그 기본키';

-- 재생로그
CREATE TABLE PLAYLOG (
  PL_NO  INTEGER      NOT NULL, -- 재생목록번호
  MU_NO  INTEGER      NOT NULL, -- 음악번호
  MEM_NO INTEGER      NOT NULL, -- 회원번호
  P_DATE DATE         NOT NULL, -- 날짜
  TITLE  VARCHAR(255) NULL      -- 제목
);

-- 재생로그 기본키
CREATE UNIQUE INDEX PK_PLAYLOG
  ON PLAYLOG ( -- 재생로그
    PL_NO ASC -- 재생목록번호
  );

-- 재생로그
ALTER TABLE PLAYLOG
  ADD
    CONSTRAINT PK_PLAYLOG -- 재생로그 기본키
    PRIMARY KEY (
      PL_NO -- 재생목록번호
    );

-- 재생로그
COMMENT ON TABLE PLAYLOG IS '재생로그';

-- 재생목록번호
COMMENT ON COLUMN PLAYLOG.PL_NO IS '재생목록번호';

-- 음악번호
COMMENT ON COLUMN PLAYLOG.MU_NO IS '음악번호';

-- 회원번호
COMMENT ON COLUMN PLAYLOG.MEM_NO IS '회원번호';

-- 날짜
COMMENT ON COLUMN PLAYLOG.P_DATE IS '날짜';

-- 제목
COMMENT ON COLUMN PLAYLOG.TITLE IS '제목';

-- 재생로그 기본키
COMMENT ON INDEX PK_PLAYLOG IS '재생로그 기본키';

-- 재생로그 기본키
COMMENT ON CONSTRAINT PLAYLOG.PK_PLAYLOG IS '재생로그 기본키';

-- 앨범
CREATE TABLE ALBUM (
  A_NO   INTEGER      NOT NULL, -- 앨범번호
  MEM_NO INTEGER      NOT NULL, -- 회원번호
  NAME   VARCHAR(255) NOT NULL  -- 앨범명
);

-- 앨범 기본키
CREATE UNIQUE INDEX PK_ALBUM
  ON ALBUM ( -- 앨범
    A_NO ASC -- 앨범번호
  );

-- 앨범
ALTER TABLE ALBUM
  ADD
    CONSTRAINT PK_ALBUM -- 앨범 기본키
    PRIMARY KEY (
      A_NO -- 앨범번호
    );

-- 앨범
COMMENT ON TABLE ALBUM IS '앨범';

-- 앨범번호
COMMENT ON COLUMN ALBUM.A_NO IS '앨범번호';

-- 회원번호
COMMENT ON COLUMN ALBUM.MEM_NO IS '회원번호';

-- 앨범명
COMMENT ON COLUMN ALBUM.NAME IS '앨범명';

-- 앨범 기본키
COMMENT ON INDEX PK_ALBUM IS '앨범 기본키';

-- 앨범 기본키
COMMENT ON CONSTRAINT ALBUM.PK_ALBUM IS '앨범 기본키';

-- 앨범음악
CREATE TABLE A_MUSIC (
  A_NO  INTEGER NOT NULL, -- 앨범번호
  MU_NO INTEGER NOT NULL  -- 음악번호
);

-- 앨범음악 기본키2
CREATE UNIQUE INDEX PK_A_MUSIC
  ON A_MUSIC ( -- 앨범음악
    A_NO  ASC, -- 앨범번호
    MU_NO ASC  -- 음악번호
  );

-- 앨범음악
ALTER TABLE A_MUSIC
  ADD
    CONSTRAINT PK_A_MUSIC -- 앨범음악 기본키2
    PRIMARY KEY (
      A_NO,  -- 앨범번호
      MU_NO  -- 음악번호
    );

-- 앨범음악
COMMENT ON TABLE A_MUSIC IS '앨범음악';

-- 앨범번호
COMMENT ON COLUMN A_MUSIC.A_NO IS '앨범번호';

-- 음악번호
COMMENT ON COLUMN A_MUSIC.MU_NO IS '음악번호';

-- 앨범음악 기본키2
COMMENT ON INDEX PK_A_MUSIC IS '앨범음악 기본키2';

-- 앨범음악 기본키2
COMMENT ON CONSTRAINT A_MUSIC.PK_A_MUSIC IS '앨범음악 기본키2';

-- 재생로그
ALTER TABLE PLAYLOG
  ADD
    CONSTRAINT FK_MEMBER_TO_PLAYLOG -- 회원 -> 재생로그
    FOREIGN KEY (
      MEM_NO -- 회원번호
    )
    REFERENCES MEMBER ( -- 회원
      MEM_NO -- 회원번호
    );

-- 회원 -> 재생로그
COMMENT ON CONSTRAINT PLAYLOG.FK_MEMBER_TO_PLAYLOG IS '회원 -> 재생로그';

-- 재생로그
ALTER TABLE PLAYLOG
  ADD
    CONSTRAINT FK_MUSIC_TO_PLAYLOG -- 음악 -> 재생로그
    FOREIGN KEY (
      MU_NO -- 음악번호
    )
    REFERENCES MUSIC ( -- 음악
      MU_NO -- 음악번호
    );

-- 음악 -> 재생로그
COMMENT ON CONSTRAINT PLAYLOG.FK_MUSIC_TO_PLAYLOG IS '음악 -> 재생로그';

-- 앨범
ALTER TABLE ALBUM
  ADD
    CONSTRAINT FK_MEMBER_TO_ALBUM -- 회원 -> 앨범
    FOREIGN KEY (
      MEM_NO -- 회원번호
    )
    REFERENCES MEMBER ( -- 회원
      MEM_NO -- 회원번호
    );

-- 회원 -> 앨범
COMMENT ON CONSTRAINT ALBUM.FK_MEMBER_TO_ALBUM IS '회원 -> 앨범';

-- 앨범음악
ALTER TABLE A_MUSIC
  ADD
    CONSTRAINT FK_ALBUM_TO_A_MUSIC -- 앨범 -> 앨범음악
    FOREIGN KEY (
      A_NO -- 앨범번호
    )
    REFERENCES ALBUM ( -- 앨범
      A_NO -- 앨범번호
    );

-- 앨범 -> 앨범음악
COMMENT ON CONSTRAINT A_MUSIC.FK_ALBUM_TO_A_MUSIC IS '앨범 -> 앨범음악';

-- 앨범음악
ALTER TABLE A_MUSIC
  ADD
    CONSTRAINT FK_MUSIC_TO_A_MUSIC -- 음악 -> 앨범음악2
    FOREIGN KEY (
      MU_NO -- 음악번호
    )
    REFERENCES MUSIC ( -- 음악
      MU_NO -- 음악번호
    );
    
ALTER TABLE `ytmusic`.`MUSIC` 
CHANGE COLUMN `A_URL` `A_URL` VARCHAR(1000) NULL DEFAULT NULL COMMENT '음악오디오URL' ,
CHANGE COLUMN `V_URL` `V_URL` VARCHAR(1000) NULL DEFAULT NULL COMMENT '음악비디오URL' ;    

-- 음악 -> 앨범음악2
COMMENT ON CONSTRAINT A_MUSIC.FK_MUSIC_TO_A_MUSIC IS '음악 -> 앨범음악2';
