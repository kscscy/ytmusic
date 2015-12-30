package java76.pms.dao;

import java.util.List;
import java.util.Map;

import java76.pms.domain.Review;

public interface ReviewDao {
  List<Review> selectList(Map<String,Object> paramMap);
  
  int insert(Review review);
  
  int delete(int no);
  
  int update(Review review);

  Review selectOne(int no);
  
}