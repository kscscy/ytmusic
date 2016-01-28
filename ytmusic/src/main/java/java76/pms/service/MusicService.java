package java76.pms.service;

import java.util.List;

import java76.pms.domain.Music;

public interface MusicService {
  List<Music> getMusicList(
      int pageNo, int pageSize, 
      String keyword, String align);
  void register(Music music);
  void remove(int no, String password);
  void change(Music music);
  Music retieve(int no);
}







