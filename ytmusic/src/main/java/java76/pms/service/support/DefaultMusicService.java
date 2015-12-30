package java76.pms.service.support;

import java.util.HashMap;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java76.pms.dao.MusicDao;
import java76.pms.domain.Music;
import java76.pms.service.MusicService;

@Service
public class DefaultMusicService implements MusicService {
  private static Logger log = Logger.getLogger(DefaultMusicService.class);
  
  @Autowired MusicDao musicDao;
  
  public List<Music> getMusicList(int pageNo, int pageSize, 
      String keyword, String align) {
    log.debug("getMusicList() 호출됨");
    
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("startIndex", (pageNo - 1) * pageSize);
    paramMap.put("length", pageSize);
    paramMap.put("keyword", keyword);
    paramMap.put("align", align);
    
    return musicDao.selectList(paramMap);
  }
  
  public void register(Music music) {
    log.debug("register() 호출됨");
    musicDao.insert(music);
  }
  
  public void remove(int no, String password) {
    log.debug("remove() 호출됨");
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("no", no);
    paramMap.put("password", password);
    
    musicDao.delete(paramMap);
  }
  
  public void change(Music music) {
    log.debug("change() 호출됨");
    musicDao.update(music);
  }

  public Music retieve(int no) {
    log.debug("retieve() 호출됨");
    return musicDao.selectOne(no);
  }

}







