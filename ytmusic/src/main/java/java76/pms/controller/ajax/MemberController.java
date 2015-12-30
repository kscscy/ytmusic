package java76.pms.controller.ajax;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java76.pms.domain.Member;
import java76.pms.service.MemberService;
import net.coobird.thumbnailator.Thumbnails;

@Controller
@RequestMapping("/member/*")
public class MemberController {
  public static final String SAVED_DIR = "/file";
  
  @Autowired MemberService memberService;
  @Autowired ServletContext servletContext;

  @RequestMapping("list")
  public String list(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="10") int pageSize,
      @RequestParam(defaultValue="email") String keyword,
      @RequestParam(defaultValue="asc") String align,
      Model model) throws Exception {

    List<Member> members = memberService.getMemberList(
        pageNo, pageSize, keyword, align);

    model.addAttribute("members", members);

    return "member/MemberList";

  }
  
  @RequestMapping(value="add", method=RequestMethod.GET)
  public String form() {
    return "member/MemberForm";
  }
  
  @RequestMapping(value="add", method=RequestMethod.POST)
  public String add(
      String name,
      String email,
      String tel,
      String cid,
      String password,
      MultipartFile photofile,
      Model model) throws Exception {

    String newFileName = null;
    
    Member member = new Member();
    member.setName(name);
    member.setEmail(email);
    member.setTel(tel);
    member.setCid(cid);
    member.setPassword(password);
    member.setPhoto(newFileName);

    memberService.register(member);

    return "redirect:list.do";

  }
  
  @RequestMapping("detail")
  public String detail(String email, Model model) 
          throws Exception {

    Member member = memberService.retrieve(email);
    model.addAttribute("member", member);

    return "member/MemberDetail";
  }

  @RequestMapping("update")
  public String update(
      String name,
      String email,
      String tel,
      String cid,
      String photo,
      MultipartFile photofile,
      Model model) throws Exception {

    String newFileName = null;
    
    Member member = new Member();
    member.setName(name);
    member.setEmail(email);
    member.setTel(tel);
    member.setCid(cid);
    
    if (newFileName != null) {
      member.setPhoto(newFileName);
    } else if (newFileName == null && photo.length() > 0) {
      member.setPhoto(photo);
    }
    
    memberService.change(member);
    return "redirect:list.do";
  }
  
  @RequestMapping("delete")
  public String delete(String email, Model model) throws Exception {
    memberService.remove(email);
    return "redirect:list.do";
  }
  
  private void makeThumbnailImage(String originPath, String thumbPath) 
      throws IOException {
    Thumbnails.of(new File(originPath))
    .size(60,44)
    .outputFormat("png")
    .outputQuality(1.0)
    .toFile(new File(thumbPath));
  }
}
