package java76.pms.controller.ajax;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java76.pms.dao.StudentDao;
import java76.pms.domain.CourseEnrollment;
import java76.pms.service.CourseEnrollmentService;

@Controller
@RequestMapping("/enroll/*")
public class CourseEnrollmentController {

	@Autowired CourseEnrollmentService enrollService;
	@Autowired StudentDao studentDao;
	
	@RequestMapping("list.do")
	public String list(Model model) throws Exception {
		
		List<CourseEnrollment> list = enrollService.getEnrollmentList();
		model.addAttribute("enrolls", list);
		
		return "enroll/EnrollList";
	}
	
	@RequestMapping(value="add", method=RequestMethod.GET)
	public String form(){
		return "enroll/EnrollForm";
	}
	
	@RequestMapping(value="add", method=RequestMethod.POST)
	public String add(String email, String name, String tel) throws Exception {

		CourseEnrollment enroll = new CourseEnrollment();
		
		enroll.setEmail(email);
		enroll.setName(name);
		enroll.setTel(tel);
		
		enrollService.enroll(enroll);

		return "redirect:list.do";
	}

	@RequestMapping("detail.do")
	public String get(
			String email,
			Model model) throws Exception{
		CourseEnrollment enroll = enrollService.retrieveByEmail(email);
		model.addAttribute("enroll", enroll);
		return "enroll/EnrollDetail";
	}
	
	@RequestMapping(value="update", method=RequestMethod.POST)
	public String update(String email, String name, String tel) throws Exception {

		CourseEnrollment enroll = new CourseEnrollment();
		
		enroll.setEmail(email);
		enroll.setName(name);
		enroll.setTel(tel);
		
		enrollService.change(enroll);

		return "redirect:list.do";
	}
	
	@RequestMapping("/enroll/delete.do")
	public String delete(String email) throws Exception {

		enrollService.remove(email);
		return "redirect:list.do";
	}
	
	@RequestMapping("reject")
	public String reject(String email) throws Exception {

		HashMap<String, Object> paramMap = new HashMap<>();
		paramMap.put("email", email);
		paramMap.put("status", CourseEnrollment.STATUS_REJECT);
		enrollService.reject(email);

		return "redirect:list.do";
	}
	
	@RequestMapping("approve")
	public String approve(String email) throws Exception {
		enrollService.approve(email);
		return "redirect:list.do";
	}
}
