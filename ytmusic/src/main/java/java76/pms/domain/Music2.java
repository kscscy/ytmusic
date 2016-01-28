package java76.pms.domain;

import java.io.Serializable;
import java.sql.Date;

public class Music2  implements Serializable {
  private static final long serialVersionUID = 1L;

  protected String vid;

  public String getVid() {
    return vid;
  }

  public void setVid(String vid) {
    this.vid = vid;
  }

  @Override
  public String toString() {
    return "Music [vid=" + vid + "]";
  }
  
  
  
  
}
