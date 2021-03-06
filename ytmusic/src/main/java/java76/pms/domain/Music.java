package java76.pms.domain;

import java.io.Serializable;

public class Music  implements Serializable {
  private static final long serialVersionUID = 1L;

  protected int       music_no;
  protected String 		music_id;
  protected String    y_title;
  protected String    title;
  protected String    img;
  protected String		audioURL;
  protected String		videoURL;
  protected String    artist;
  protected int       count;
  protected int       views;
  protected long 			expire;
  
  
	public int getMusic_no() {
		return music_no;
	}
	public void setMusic_no(int music_no) {
		this.music_no = music_no;
	}
	public String getMusic_id() {
		return music_id;
	}
	public void setMusic_id(String music_id) {
		this.music_id = music_id;
	}
	
	public String getY_title() {
    return y_title;
  }
  
  public void setY_title(String y_title) {
    this.y_title = y_title;
  }
  
  public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	public String getAudioURL() {
		return audioURL;
	}
	public void setAudioURL(String audioURL) {
		this.audioURL = audioURL;
	}
	public String getVideoURL() {
		return videoURL;
	}
	public void setVideoURL(String videoURL) {
		this.videoURL = videoURL;
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
	public long getExpire() {
		return expire;
	}
	public void setExpire(long expire) {
		this.expire = expire;
	}
  public String getArtist() {
    return artist;
  }
  
  public void setArtist(String artist) {
    this.artist = artist;
  }
  
	
	
  
}
