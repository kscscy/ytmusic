package java76.pms.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java76.pms.controller.ajax.AuthController;
import java76.pms.domain.AjaxResult;
import java76.pms.domain.Album;
import java76.pms.domain.Music;
import java76.pms.service.AlbumService;

@Controller
@RequestMapping("/album/*")
public class AlbumController { 
	private static final Logger log = Logger.getLogger(AuthController.class);  
  @Autowired AlbumService albumService;
  @Autowired ServletContext servletContext;
  
  @RequestMapping(value="albumlist", method=RequestMethod.GET)
  public Object albumList(
  		int member_no) throws Exception {
    
  	List<Album> albums = albumService.getAlbumList(member_no);
    log.debug("albums? "+albums);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("data", albums);
    
    return resultMap;
  }
  
  @RequestMapping(value="musiclist", method=RequestMethod.GET)
  public Object musicList(
  		int album_no) throws Exception {
  	log.debug(album_no);
  	List<Music> musics = albumService.getMusicListByAlbum(album_no);
  	log.debug(musics);
  	
  	HashMap<String,Object> resultMap = new HashMap<>();
  	resultMap.put("status", "success");
  	resultMap.put("data", musics);
  	
  	return resultMap;
  }
  
  
  /*@RequestMapping(value="ad", method=RequestMethod.GET)
  public String form() {
    return "board/BoardForm";
  }*/
      
  @RequestMapping(value="addalbum", method=RequestMethod.POST)
  public AjaxResult addAlbum(Album album) throws Exception {
    
    if (albumService.registerAlbum(album) <= 0) {
    	new AjaxResult("failure", null);
    }
    return new AjaxResult("success", null);
  }
  
  @RequestMapping(value="updatealbum", method=RequestMethod.POST)
  public AjaxResult updateAlbum(String name,
  		int album_no, int member_no) throws Exception {
    
    if (albumService.changeAlbum(name, album_no, member_no) <= 0) {
      return new AjaxResult("failure", null);
    } 
    return new AjaxResult("success", null);
  }
  
  @RequestMapping(value="deletealbum", method=RequestMethod.POST)
  public AjaxResult deleteAlbum(int album_no,int member_no) throws Exception {
    
    if (albumService.removeAlbum(album_no, member_no) <= 0) {
      return new AjaxResult("failure", null);
    } 
    return new AjaxResult("success", null);
  }
  /* album music 구분선 */
  @RequestMapping(value="addmusic", method=RequestMethod.POST)
  public AjaxResult addMusic(int album_no, int music_no) throws Exception {
    
    if (albumService.registerMusicIntoAlbum(album_no, music_no) <= 0) {
    	new AjaxResult("failure", null);
    }
    return new AjaxResult("success", null);
  }
  
  @RequestMapping(value="updatemusic", method=RequestMethod.POST)
  public AjaxResult updateMusic(int album_no, int music_no, int seq_no) throws Exception {
    
    if (albumService.changeMusicFromAlbum(album_no, music_no, seq_no) <= 0) {
      return new AjaxResult("failure", null);
    } 
    return new AjaxResult("success", null);
  }
  
  @RequestMapping(value="deletemusic", method=RequestMethod.POST)
  public AjaxResult deleteMusic(int album_no, int music_no) throws Exception {
  	
    if (albumService.removeMusicFromAlbum(album_no, music_no) <= 0) {
      return new AjaxResult("failure", null);
    } 
    return new AjaxResult("success", null);
  }
  
}
