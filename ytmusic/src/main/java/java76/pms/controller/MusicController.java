package java76.pms.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java76.pms.dao.MusicDao;
import java76.pms.domain.AjaxResult;
import java76.pms.domain.Music;
import java76.pms.domain.Music2;

@Controller("ajax.MusicController")
@RequestMapping("/music/ajax/*")
public class MusicController { 
  
  /*public static final String SAVED_DIR = "/attachfile";*/
  
  @Autowired MusicDao musicDao;
  @Autowired ServletContext servletContext;
   
  private static final Logger log = Logger.getLogger(MusicController.class);  
  
  HashMap<String, String> splitTitleArtist(String str) {
    HashMap<String, String> map = new HashMap<>();
    String artist = "";
    String title = "";
    
    String tempArtist = "";
    String tempArtist2 = "";
        
    
    if(str.contains("-") || str.contains("–") || str.contains("_") || str.contains("--")) {
        String[] titleSplit = str.split("-");
        if(titleSplit.length == 2) {
          artist = titleSplit[0];
          title = titleSplit[1];
        }        
        if(titleSplit.length == 1) {
          titleSplit = str.split("–");
          if(titleSplit.length == 2) {
            artist = titleSplit[0];
            title = titleSplit[1];
          }
        }
        if (titleSplit.length == 1){
          titleSplit = str.split("_");
          if(titleSplit.length == 2) {
            artist = titleSplit[0];
            title = titleSplit[1];
          }
        }
        if (titleSplit.length == 1){
          titleSplit = str.split("--");
          if(titleSplit.length == 2) {
            artist = titleSplit[0];
            title = titleSplit[1];
          }
        }
        
        if (titleSplit.length > 2){
          title = str;
          artist = "이름 없음";
        }
        
    } else {
      title = str;
      artist = "이름 없음";
    }
    
    if (artist.length() > title.length()) {
      
    }
    map.put("title", title);
    map.put("artist", artist);
    return map;
  }
  
  String getUrl(String musicUrl) {
    String result = null;
    try {
        Process p = null;
        log.debug(System.getProperty("os.name"));
        if (System.getProperty("os.name").startsWith("Win")) {
          p = Runtime.getRuntime()
              .exec("c:/ytdl/youtube-dl.exe -g -f 140 " + musicUrl);
        } else if (System.getProperty("os.name").startsWith("Mac")) {
          p = Runtime.getRuntime().exec("/usr/local/bin/youtube-dl -g -f 140 " + musicUrl);
        }
        
        BufferedReader stdInput = new BufferedReader(new InputStreamReader(p.getInputStream()));

        BufferedReader stdError = new BufferedReader(new InputStreamReader(p.getErrorStream()));

        while ((musicUrl = stdInput.readLine()) != null) {
          log.debug("musicUrl : " + musicUrl);
          result = musicUrl;
        }
        while ((musicUrl = stdError.readLine()) != null) {
          log.debug("musicUrl : " + musicUrl);
        }
         
    } catch (IOException e) {
        log.debug("exception happened - here's what I know: ");
        e.printStackTrace();
    }
    
    return result;
  }
  
  @RequestMapping("musicPlay")
  public Object musicPlay(Music object) throws Exception {
    long currentTime = System.currentTimeMillis();
    String musicUrl = "https://www.youtube.com/watch?v="+object.getMusic_id();
    
    Music music = musicDao.selectOne(object.getMusic_id());
    if(music != null) {
      music.setCount(music.getCount() + 1);
      musicDao.updateCount(music);
      log.debug("저장된 music 존재. 조회수 : " + ((int)music.getCount()+1));
      long expire = music.getExpire();
      log.debug("유효기간 : " + (expire - currentTime)/1000/60); 
      /*if (expire < currentTime || music.getImage() == null) {*/
      if (expire < currentTime) {
        log.debug("유효기간 지남 -> music 업데이트");
        String newUrl = getUrl(musicUrl);
        long newExpire = Long.parseLong(newUrl.split("expire=")[1].substring(0,10))*1000;
        music.setExpire(newExpire);
        /*music.setImage(object.getImage());*/
        music.setAudioURL(newUrl);
        
        musicDao.update(music);
        
        return new AjaxResult("success", music.getAudioURL());
      }
      log.debug("audioUrl : " + music.getAudioURL());
      log.debug("");
      return new AjaxResult("success", music.getAudioURL());
    }
    log.debug("music 저장");
    String url = getUrl(musicUrl);
    
    String expireStr = "";
    try {
      expireStr = url.split("expire=")[1].substring(0,10);
    } catch (Exception e) {
      expireStr = url.split("expire/")[1].substring(0,10);
    }
    
    long expire = Long.parseLong(expireStr)*1000;
    music = new Music();
    music.setMusic_id(object.getMusic_id());
    music.setImg(object.getImg());
    music.setCount(1);
    log.debug(object.getTitle());
    HashMap<String, String> map = splitTitleArtist(object.getTitle());
    music.setY_title(object.getTitle());
    music.setTitle(map.get("title"));
    music.setArtist(map.get("artist"));

    music.setViews(object.getViews());
    music.setExpire(expire);
    music.setAudioURL(url);
    /*music.setVideoUrl();*/
    musicDao.insert(music);
    
    log.debug("");
    return new AjaxResult("success", music.getAudioURL());
  }

  
  
  
  @RequestMapping("videoPlay")
  public Object videoPlay(Music2 vid) throws Exception {
    System.out.println(vid);
    String videoUrl1 = null;
    String videoUrl = "https://www.youtube.com/watch?v=" + vid.getVid();
    System.out.println(videoUrl);
    try { 
      // run the Unix "ps -ef" command
      // using the Runtime exec method:
      Process p = null;
      System.out.println(System.getProperty("os.name"));
      if (System.getProperty("os.name").startsWith("Win")) {
        p = Runtime.getRuntime()
            .exec("c:/ytdl/youtube-dl.exe -g " + videoUrl);
      } else if (System.getProperty("os.name").startsWith("Mac")) {
        System.out.println("durltlfgodehla");
        p = Runtime.getRuntime().exec("/usr/local/bin/youtube-dl -g " + videoUrl);
      }
      
      BufferedReader stdInput = new BufferedReader(new InputStreamReader(p.getInputStream()));
      
      BufferedReader stdError = new BufferedReader(new InputStreamReader(p.getErrorStream()));
      
      // read the output from the command
      System.out.println("Here is the standard output of the command:\n");
      while ((videoUrl = stdInput.readLine()) != null) {
        System.out.println(videoUrl);
        videoUrl1 = videoUrl;
        
      }
      
      // read any errors from the attempted command
      System.out.println("Here is the standard error of the command (if any):\n");
      while ((videoUrl = stdError.readLine()) != null) {
        System.out.println(videoUrl);
      }
      
    } catch (IOException e) {
      System.out.println("exception happened - here's what I know: ");
      e.printStackTrace();
    }
    System.out.println("보낼 videoUrl1" + videoUrl1);
    return new AjaxResult("success", videoUrl1);
  }

  
  
  @RequestMapping("list")
  public Object list(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="10") int pageSize,
      @RequestParam(defaultValue="count") String keyword,
      @RequestParam(defaultValue="desc") String align) throws Exception {
    
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("startIndex", (pageNo - 1) * pageSize);
    paramMap.put("length", pageSize);
    paramMap.put("keyword", keyword);
    paramMap.put("align", align);
    
    List<Music> musics = musicDao.selectList(paramMap);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("data", musics);
    return resultMap;
  }
  /*
  @RequestMapping(value="add", method=RequestMethod.GET)
  public String form() {
    return "music/MusicForm";
  }
      
  @RequestMapping(value="add", method=RequestMethod.POST)
  public AjaxResult add(Music music, MultipartFile file) throws Exception {
    
    if (file.getSize() > 0) {
      String newFileName = MultipartHelper.generateFilename(file.getOriginalFilename());  
      File attachfile = new File(servletContext.getRealPath(SAVED_DIR) 
                                  + "/" + newFileName);
      file.transferTo(attachfile);
      music.setAttachFile(newFileName);
    }
    
    musicDao.insert(music);
    
    return new AjaxResult("success", null);
  }
  
  @RequestMapping("detail")
  public Object detail(int no) throws Exception {
    Music music = musicDao.selectOne(no);
    return new AjaxResult("success", music);
  }*/
/*
  @RequestMapping(value="update", method=RequestMethod.POST)
  public AjaxResult update(Music music, MultipartFile file) throws Exception {
    
    if (file.getSize() > 0) {
      String newFileName = MultipartHelper.generateFilename(file.getOriginalFilename());  
      File attachfile = new File(servletContext.getRealPath(SAVED_DIR) 
                                  + "/" + newFileName);
      file.transferTo(attachfile);
      music.setAttachFile(newFileName);
    } else if (music.getAttachFile().length() == 0) {
      music.setAttachFile(null);
    }
    
    
    if (musicDao.update(music) <= 0) {
      return new AjaxResult("failure", null);
    } 
    
    return new AjaxResult("success", null);
  }
  
  @RequestMapping("delete.do")
  public AjaxResult delete(int no, String password) throws Exception {

    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("no", no);
    paramMap.put("password", password);
    
    if (musicDao.delete(paramMap) <= 0) {
      return new AjaxResult("failure", null);
    } 

    return new AjaxResult("success", null);
  }*/
}