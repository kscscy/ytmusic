package java76.pms.domain;

import java.io.Serializable;
import java.sql.Date;

public class Review  implements Serializable {
  private static final long serialVersionUID = 1L;

  protected String    genre;
  protected String    style;
  protected Date      createdDate;
  protected String    writer;
  protected int       reviewNo;
  protected int       memberNo;
  protected String    photo;
  protected String    video;
  protected String    text;
  protected int       views;
  protected String    title;
  
  public Review() {};

  @Override
  public String toString() {
    return "Review [genre=" + genre + ", style=" + style + ", createdDate=" + createdDate + ", writer=" + writer
        + ", reviewNo=" + reviewNo + ", memberNo=" + memberNo + ", photo=" + photo + ", video=" + video + ", text="
        + text + ", views=" + views + ", title=" + title + "]";
  }

  public String getVideo() {
    return video;
  }

  public void setVideo(String video) {
    this.video = video;
  }

  public String getGenre() {
    return genre;
  }

  public void setGenre(String genre) {
    this.genre = genre;
  }

  public String getStyle() {
    return style;
  }

  public void setStyle(String style) {
    this.style = style;
  }

  public Date getCreatedDate() {
    return createdDate;
  }

  public void setCreatedDate(Date createdDate) {
    this.createdDate = createdDate;
  }

  public String getWriter() {
    return writer;
  }

  public void setWriter(String writer) {
    this.writer = writer;
  }

  public int getReviewNo() {
    return reviewNo;
  }

  public void setReviewNo(int reviewNo) {
    this.reviewNo = reviewNo;
  }

  public int getMemberNo() {
    return memberNo;
  }

  public void setMemberNo(int memberNo) {
    this.memberNo = memberNo;
  }

  public String getPhoto() {
    return photo;
  }

  public void setPhoto(String photo) {
    this.photo = photo;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public int getViews() {
    return views;
  }

  public void setViews(int views) {
    this.views = views;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  
}
