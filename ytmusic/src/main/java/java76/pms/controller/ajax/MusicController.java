package java76.pms.controller.ajax;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java76.pms.dao.MusicDao;
import java76.pms.domain.AjaxResult;
import java76.pms.domain.Music;
import java76.pms.domain.Music2;

@Controller("ajax.MusicController")
@RequestMapping("/music/ajax/*")
public class MusicController {

  public static final String SAVED_DIR = "/attachfile";

  @Autowired
  MusicDao musicDao;
  @Autowired
  ServletContext servletContext;

  //
  // @RequestMapping("detail")
  // public Object detail(int no) throws Exception {
  // Music music = musicDao.selectOne(no);
  // return new AjaxResult("success", music);
  // }
  //

  @RequestMapping("musicPlay")
  public Object musicPlay(Music2 vid) throws Exception {
    System.out.println(vid);
    String musicUrl1 = null;
    String musicUrl = "https://www.youtube.com/watch?v=" + vid.getVid();
    System.out.println(musicUrl);
    try { 
      // run the Unix "ps -ef" command
      // using the Runtime exec method:
      Process p = null;
      System.out.println(System.getProperty("os.name"));
      if (System.getProperty("os.name").startsWith("Win")) {
        p = Runtime.getRuntime()
            .exec("c:/ytdl/youtube-dl.exe -g --extract-audio --audio-format aac --audio-quality 0 " + musicUrl);
      } else if (System.getProperty("os.name").startsWith("Mac")) {
      	System.out.println("durltlfgodehla");
        p = Runtime.getRuntime().exec("/usr/local/bin/youtube-dl -g --extract-audio --audio-format aac --audio-quality 0 " + musicUrl);
      }
      
      BufferedReader stdInput = new BufferedReader(new InputStreamReader(p.getInputStream()));

      BufferedReader stdError = new BufferedReader(new InputStreamReader(p.getErrorStream()));

      // read the output from the command
      System.out.println("Here is the standard output of the command:\n");
      while ((musicUrl = stdInput.readLine()) != null) {
        System.out.println(musicUrl);
        musicUrl1 = musicUrl;

      }

      // read any errors from the attempted command
      System.out.println("Here is the standard error of the command (if any):\n");
      while ((musicUrl = stdError.readLine()) != null) {
        System.out.println(musicUrl);
      }

    } catch (IOException e) {
      System.out.println("exception happened - here's what I know: ");
      e.printStackTrace();
    }
    System.out.println("보낼 musicUrl1" + musicUrl1);
    return new AjaxResult("success", musicUrl1);
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
  public Object list(@RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "10") int pageSize,
      @RequestParam(defaultValue = "no") String keyword, @RequestParam(defaultValue = "desc") String align)
          throws Exception {

    HashMap<String, Object> paramMap = new HashMap<>();
    paramMap.put("startIndex", (pageNo - 1) * pageSize);
    paramMap.put("length", pageSize);
    paramMap.put("keyword", keyword);
    paramMap.put("align", align);

    List<Music> musics = musicDao.selectList(paramMap);

    HashMap<String, Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("data", musics);

    return resultMap;
  }

  @RequestMapping(value = "add", method = RequestMethod.GET)
  public String form() {
    return "music/MusicForm";
  }

  @RequestMapping(value = "add", method = RequestMethod.POST)
  public AjaxResult add(Music music/* , MultipartFile file */) throws Exception {
    /*
     * if (file.getSize() > 0) { String newFileName =
     * MultipartHelper.generateFilename(file.getOriginalFilename()); File
     * attachfile = new File(servletContext.getRealPath(SAVED_DIR) + "/" +
     * newFileName); file.transferTo(attachfile);
     * music.setAttachFile(newFileName); }
     */
    musicDao.insert(music);

    return new AjaxResult("success", null);
  }

  @RequestMapping("detail")
  public Object detail(int no) throws Exception {
    Music music = musicDao.selectOne(no);
    return new AjaxResult("success", music);
  }

  @RequestMapping(value = "update", method = RequestMethod.POST)
  public AjaxResult update(Music music/* , MultipartFile file */) throws Exception {
    /*
     * if (file.getSize() > 0) { String newFileName =
     * MultipartHelper.generateFilename(file.getOriginalFilename()); File
     * attachfile = new File(servletContext.getRealPath(SAVED_DIR) + "/" +
     * newFileName); file.transferTo(attachfile);
     * music.setAttachFile(newFileName); } else if
     * (music.getAttachFile().length() == 0) { music.setAttachFile(null); }
     */

    if (musicDao.update(music) <= 0) {
      return new AjaxResult("failure", null);
    }

    return new AjaxResult("success", null);
  }

  @RequestMapping("delete.do")
  public AjaxResult delete(int no, String password) throws Exception {

    HashMap<String, Object> paramMap = new HashMap<>();
    paramMap.put("no", no);
    paramMap.put("password", password);

    if (musicDao.delete(paramMap) <= 0) {
      return new AjaxResult("failure", null);
    }

    return new AjaxResult("success", null);
  }
}
