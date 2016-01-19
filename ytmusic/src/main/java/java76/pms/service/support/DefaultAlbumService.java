package java76.pms.service.support;

import java.util.HashMap;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java76.pms.dao.AlbumDao;
import java76.pms.domain.Album;
import java76.pms.domain.Music;
import java76.pms.service.AlbumService;

@Service
public class DefaultAlbumService implements AlbumService {
  private static Logger log = Logger.getLogger(DefaultAlbumService.class);
  
  @Autowired AlbumDao albumDao;

	@Override
	public List<Album> getAlbumList(int member_no) {
		log.debug("getAlbumList() 호출됨");
		log.debug("mem_no : " + member_no);
		return albumDao.selectList(member_no);
	}

	@Override
	public List<Music> getMusicListByAlbum(int album_no) {
		log.debug("getMusicListByAlbum() 호출됨");
		return albumDao.selectOne(album_no);
	}

	@Override
	public int registerAlbum(Album album) {
		log.debug("registerAlbum() 호출됨");
		return albumDao.insertAlbum(album);
	}

	@Override
	public int removeAlbum(int album_no, int member_no) {
		log.debug("removeAlbum() 호출됨");
		
		HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("a_no", album_no);
    paramMap.put("mem_no", member_no);
    
		return albumDao.deleteAlbum(paramMap);
	}

	@Override
	public int changeAlbum(String name,
  		int album_no,int member_no) {
		log.debug("changeAlbum() 호출됨");
		
		HashMap<String,Object> paramMap = new HashMap<>();
		paramMap.put("name", name);
    paramMap.put("a_no", album_no);
    paramMap.put("mem_no", member_no);
    
		return albumDao.updateAlbum(paramMap);
	}

	@Override
	public int registerMusicIntoAlbum(int album_no, int music_no) {
		log.debug("registerMusicIntoAlbum() 호출됨");
		
		HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("a_no", album_no);
    paramMap.put("mu_no", music_no);
    
		return albumDao.insertMusic(paramMap);
	}

	@Override
	public int removeMusicFromAlbum(int album_no, int music_no) {
		log.debug("removeMusicFromAlbum() 호출됨");
		
		HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("a_no", album_no);
    paramMap.put("mu_no", music_no);
    
		return albumDao.deleteMusic(paramMap);
	}

	@Override
	public int changeMusicFromAlbum(int album_no, int music_no, int seq_no) {
		log.debug("changeMusicFromAlbum() 호출됨");
		
		HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("a_no", album_no);
    paramMap.put("mu_no", music_no);
    paramMap.put("seq_no", seq_no);
    
		return albumDao.deleteMusic(paramMap);
	}


}







