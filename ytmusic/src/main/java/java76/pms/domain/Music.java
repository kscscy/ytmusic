package java76.pms.domain;

import java.io.Serializable;

public class Music  implements Serializable {
  private static final long serialVersionUID = 1L;
/*  MU_NO INTEGER      NOT NULL COMMENT '음악번호', -- 음악번호
  ID    VARCHAR(50)  NOT NULL COMMENT '음악아이디', -- 음악아이디
  TITLE VARCHAR(255) NOT NULL COMMENT '음악제목', -- 음악제목
  IMG   VARCHAR(255) NULL     COMMENT '음악이미지', -- 음악이미지
  COUNT INTEGER      NULL     COMMENT '음악재생횟수', -- 음악재생횟수
  VIEWS INTEGER      NULL     COMMENT '음악조회수' -- 음악조회수
  
  V_URL VARCHAR(255) NULL     COMMENT '음악비디오URL', -- 음악비디오URL
  A_URL VARCHAR(255) NULL     COMMENT '음악오디오URL', -- 음악오디오URL*/
  
  protected int       no;
  protected String    id;
  protected String    audioUrl;
  protected String    videoUrl;
  protected String    title;
  protected String    image;
  protected int       count;
  protected int       views;
  protected long      savedDate;
  
  
  
  @Override
  public String toString() {
    return "Music [no=" + no + ", id=" + id + ", title=" + title + ", image=" + image + ", count=" + count + ", views="
        + views + "]";
  }

  public int getNo() {
    return no;
  }
  
  public void setNo(int no) {
    this.no = no;
  }
  
  public String getId() {
    return id;
  }
  
  public void setId(String id) {
    this.id = id;
  }
  
  
  public String getAudioUrl() {
    return audioUrl;
  }
  

  public void setAudioUrl(String audioUrl) {
    this.audioUrl = audioUrl;
  }
  

  public String getVideoUrl() {
    return videoUrl;
  }
  

  public void setVideoUrl(String videoUrl) {
    this.videoUrl = videoUrl;
  }
  

  public String getTitle() {
    return title;
  }
  
  public void setTitle(String title) {
    this.title = title;
  }
  
  public String getImage() {
    return image;
  }
  
  public void setImage(String image) {
    this.image = image;
  }
  
  public int getCount() {
    return count;
  }
  
  public void setCount(int count) {
    this.count = count;
  }
  
  public int getViews() {
    return views;
  }
  
  public void setViews(int views) {
    this.views = views;
  }

  public long getSavedDate() {
    return savedDate;
  }
  

  public void setSavedDate(long savedDate) {
    this.savedDate = savedDate;
  }
  


  
  
  
  
  
}
