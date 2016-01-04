package java76.pms.service;

import java.util.List;

import java76.pms.domain.Member;

public interface MemberService {
  List<Member> getMemberList(
      int pageNo, 
      int pageSize, 
      String keyword, 
      String align);
  void register(Member member);
  void remove(String email);
  void change(Member member);
  Member retrieve(String email);
  Member retrieve(String email, String password);
}







