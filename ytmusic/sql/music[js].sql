-- 음악
DROP TABLE MUSIC;

-- 음악
ALTER TABLE MUSIC
  DROP CONSTRAINT PK_MUSIC; -- 음악 기본키

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
  EXPIRE BIGINT        NULL      -- 유효기간
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
    
alter table music modify column mu_no int auto_increment;

alter table member modify column mem_no int auto_increment;