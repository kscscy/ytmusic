package java76.pms.controller;

import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java76.pms.domain.Member;
import java76.pms.service.MemberService;

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
      String email,
      String password,
      Model model) throws Exception {
    
    Member member = new Member();
    member.setEmail(email);
    member.setPassword(password);

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
      String email,
      String password,
      Model model) throws Exception {
    
    Member member = new Member();
    member.setEmail(email);
    member.setPassword(password);
    
    memberService.change(member);
    return "redirect:list.do";
  }
  
  @RequestMapping("delete")
  public String delete(String email, Model model) throws Exception {
    memberService.remove(email);
    return "redirect:list.do";
  }
  
}
