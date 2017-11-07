package security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import entities.Login;
import entities.User;

public class DataSecurityInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		System.out.println(request.getRequestURI());
		System.out.println(request.getRequestURI().split("/")[4]);
		System.out.println(request.getSession().getAttribute("login"));
		if (request.getSession().getAttribute("login") != null) {
			int userId = Integer.parseInt(request.getRequestURI().split("/")[4]);// grabbing user id from request
			if (userId == ((Login)request.getSession().getAttribute("login")).getUser().getId()) {
				return true;
			}
		}
		System.out.println("before redirect");
		response.sendRedirect("/CrawlREST/rest/auth/unauthorized");
		return false;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		// TODO Auto-generated method stub

	}

}
