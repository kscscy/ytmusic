package java76.pms.service;

import java.util.List;

import java76.pms.domain.Album;
import java76.pms.domain.Music;

public interface AlbumService {

	List<Album> getAlbumList(int member_no);
  List<Music> getMusicListByAlbum(int album_no);
  
  int registerAlbum(Album album);
  int changeAlbum(
  		String name,
  		int album_no,int member_no);
  int removeAlbum(int album_no,int member_no);
  
  int registerMusicIntoAlbum(int album_no, int music_no);
  int changeMusicFromAlbum(int album_no, int music_no, int seq_no);
  int removeMusicFromAlbum(int album_no, int music_no);
}







