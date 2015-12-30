package java76.pms.service.support;

import java.util.HashMap;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java76.pms.dao.MemberDao;
import java76.pms.domain.Member;
import java76.pms.service.MemberService;

@Service
public class DefaultMemberService implements MemberService {
  private static Logger log = 
      Logger.getLogger(DefaultMemberService.class);
  
  @Autowired MemberDao memberDao;
  
  public List<Member> getMemberList(
      int pageNo, 
      int pageSize, 
      String keyword, 
      String align) {
    log.debug("getMemberList() 호출됨");
    
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("startIndex", (pageNo - 1) * pageSize);
    paramMap.put("length", pageSize);
    paramMap.put("keyword", keyword);
    paramMap.put("align", align);
    
    return memberDao.selectList(paramMap);
  }

  public void register(Member member) {
    log.debug("register() 호출됨");
    memberDao.insert(member);
  }

  public void remove(String email) {
    log.debug("remove() 호출됨");
    memberDao.delete(email);
  }
  
  public void change(Member member) {
    log.debug("change() 호출됨");
    memberDao.update(member);
  }

  public Member retrieve(String email) {
    log.debug("retrieve(email) 호출됨");
    return memberDao.selectOne(email);
  }

  public Member retrieve(String email, String password) {
    log.debug("retrieve(email,password) 호출됨");
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("email", email);
    paramMap.put("password", password);
    
    return memberDao.selectOneByEmailPassword(paramMap);
  }
}







