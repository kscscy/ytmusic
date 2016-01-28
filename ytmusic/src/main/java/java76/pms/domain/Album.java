package java76.pms.domain;

import java.io.Serializable;

public class Album implements Serializable {

	private static final long serialVersionUID = 1L;
	protected int		 album_no;
	protected int		 member_no;
	protected String album_name;
	
	public int getAlbum_no() {
		return album_no;
	}
	public void setAlbum_no(int album_no) {
		this.album_no = album_no;
	}
	public int getMember_no() {
		return member_no;
	}
	public void setMember_no(int member_no) {
		this.member_no = member_no;
	}
	public String getAlbum_name() {
		return album_name;
	}
	public void setAlbum_name(String album_name) {
		this.album_name = album_name;
	}
	
}
