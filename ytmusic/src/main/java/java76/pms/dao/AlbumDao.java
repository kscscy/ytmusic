package java76.pms.dao;

import java.util.List;
import java.util.Map;

import java76.pms.domain.Album;
import java76.pms.domain.Music;

public interface AlbumDao {
	
	List<Album> selectList(int member_no);
  List<Music> selectOne(int album_no);
  
  int insertAlbum(Album album);
  int updateAlbum(Map<String,Object> paramMap);
  int deleteAlbum(Map<String,Object> paramMap);
  
  int insertMusic(Map<String,Object> paramMap);
  int updateMusic(Map<String,Object> paramMap);
  int deleteMusic(Map<String,Object> paramMap);
  
}







