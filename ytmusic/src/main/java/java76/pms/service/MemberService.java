package java76.pms.service;

import java.util.List;

import java76.pms.domain.Member;

public interface MemberService {
  List<Member> getMemberList(
      int pageNo, 
      int pageSize, 
      String keyword, 
      String align);
  int register(Member member);
  int remove(String email);
  int change(Member member);
  Member retrieve(String email);
  Member retrieve(String email, String password);
}







