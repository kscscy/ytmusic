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

import java76.pms.dao.BoardDao;
import java76.pms.domain.AjaxResult;
import java76.pms.domain.Board;
import java76.pms.domain.Music;

@Controller("ajax.BoardController")
@RequestMapping("/board/ajax/*")
public class BoardController_backup { 
  
  public static final String SAVED_DIR = "/attachfile";
  
  @Autowired BoardDao boardDao;
  @Autowired ServletContext servletContext;
  
  
  
  
  
  
  
//  
//  @RequestMapping("detail")
//  public Object detail(int no) throws Exception {
//    Board board = boardDao.selectOne(no);
//    return new AjaxResult("success", board);
//  }
//  
  
  
  
  
  
  
  @RequestMapping("musicPlay")
  public Object musicPlay(Music vid) throws Exception {
    System.out.println(vid);
    System.out.println(vid);
    System.out.println(vid);
    System.out.println(vid);
    System.out.println(vid);
    System.out.println(vid);
    String musicUrl1=null;
    String musicUrl = "https://www.youtube.com/watch?v="+vid.getVid();
    System.out.println(musicUrl);
    try {
    // run the Unix "ps -ef" command
        // using the Runtime exec method:
        Process p = Runtime.getRuntime().exec("c:/ytdl/youtube-dl.exe -g --extract-audio --audio-format aac --audio-quality 0 "+musicUrl);
         
        BufferedReader stdInput = new BufferedReader(new
             InputStreamReader(p.getInputStream()));

        BufferedReader stdError = new BufferedReader(new
             InputStreamReader(p.getErrorStream()));

        // read the output from the command
        System.out.println("Here is the standard output of the command:\n");
        while ((musicUrl = stdInput.readLine()) != null) {
            System.out.println(musicUrl);
            musicUrl1=musicUrl;
            
        }
         
        // read any errors from the attempted command
        System.out.println("Here is the standard error of the command (if any):\n");
        while ((musicUrl = stdError.readLine()) != null) {
            System.out.println(musicUrl);
        }
         
    }
    catch (IOException e) {
        System.out.println("exception happened - here's what I know: ");
        e.printStackTrace();
    }
    System.out.println(musicUrl1);
    return new AjaxResult("success", musicUrl1);
  }
  
  
  
  
  @RequestMapping("list")
  public Object list(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="10") int pageSize,
      @RequestParam(defaultValue="no") String keyword,
      @RequestParam(defaultValue="desc") String align) throws Exception {
    
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("startIndex", (pageNo - 1) * pageSize);
    paramMap.put("length", pageSize);
    paramMap.put("keyword", keyword);
    paramMap.put("align", align);
    
    List<Board> boards = boardDao.selectList(paramMap);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("data", boards);
    
    return resultMap;
  }
  
  @RequestMapping(value="add", method=RequestMethod.GET)
  public String form() {
    return "board/BoardForm";
  }
      
  @RequestMapping(value="add", method=RequestMethod.POST)
  public AjaxResult add(Board board/*, MultipartFile file*/) throws Exception {
    /*
    if (file.getSize() > 0) {
      String newFileName = MultipartHelper.generateFilename(file.getOriginalFilename());  
      File attachfile = new File(servletContext.getRealPath(SAVED_DIR) 
                                  + "/" + newFileName);
      file.transferTo(attachfile);
      board.setAttachFile(newFileName);
    }
    */
    boardDao.insert(board);
    
    return new AjaxResult("success", null);
  }
  
  @RequestMapping("detail")
  public Object detail(int no) throws Exception {
    Board board = boardDao.selectOne(no);
    return new AjaxResult("success", board);
  }

  @RequestMapping(value="update", method=RequestMethod.POST)
  public AjaxResult update(Board board/*, MultipartFile file*/) throws Exception {
    /*
    if (file.getSize() > 0) {
      String newFileName = MultipartHelper.generateFilename(file.getOriginalFilename());  
      File attachfile = new File(servletContext.getRealPath(SAVED_DIR) 
                                  + "/" + newFileName);
      file.transferTo(attachfile);
      board.setAttachFile(newFileName);
    } else if (board.getAttachFile().length() == 0) {
      board.setAttachFile(null);
    }
    */
    
    if (boardDao.update(board) <= 0) {
      return new AjaxResult("failure", null);
    } 
    
    return new AjaxResult("success", null);
  }
  
  @RequestMapping("delete.do")
  public AjaxResult delete(int no, String password) throws Exception {

    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("no", no);
    paramMap.put("password", password);
    
    if (boardDao.delete(paramMap) <= 0) {
      return new AjaxResult("failure", null);
    } 

    return new AjaxResult("success", null);
  }
}
