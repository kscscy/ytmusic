package java76.pms.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebFilter("*.do")
public class AjaxFilter implements Filter {
  
  @Override
  public void init(FilterConfig filterConfig) throws ServletException {}

  @Override
  public void doFilter(
      ServletRequest req, ServletResponse resp, FilterChain chain)
      throws IOException, ServletException {
    
    HttpServletRequest request = (HttpServletRequest) req;
    HttpServletResponse response = (HttpServletResponse) resp;
    
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
    response.setHeader("Access-Control-Max-Age", "3600");
    response.setHeader("Access-Control-Allow-Headers", "x-requested-with, origin, content-type, accept");
    System.out.println("ajaxfilterajaxfilterajaxfilterajaxfilterajaxfilterajaxfilterajaxfilterajaxfilterajaxfilterajaxfilterajaxfilterajaxfilterajaxfilterajaxfilterajaxfilterajaxfilterajaxfilterajaxfilterajaxfilterajaxfilterajaxfilterajaxfilterajaxfilterajaxfilter");
    chain.doFilter(request, response);
  }

  @Override
  public void destroy() {}

}
