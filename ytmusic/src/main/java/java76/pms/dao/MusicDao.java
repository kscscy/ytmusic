package java76.pms.dao;

import java.util.List;
import java.util.Map;

import java76.pms.domain.Music;

public interface MusicDao {
  List<Music> selectList(Map<String,Object> paramMap);
  
  Music selectOne(String id);
  
  int update(Music music);

  int insert(Music music);
  
  /*int delete(Map<String,Object> paramMap);*/
  

}







