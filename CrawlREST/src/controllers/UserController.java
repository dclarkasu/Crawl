package controllers;

import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.ContactDAO;
import data.UserDAO;
import entities.Contact;
import entities.Login;
import entities.Post;
import entities.User;

@RestController
public class UserController {

	 @Autowired
	 private UserDAO userDao;
	 @Autowired
	 private ContactDAO contactDao;
	 
	
	 //user auth
	 @RequestMapping(path = "auth/register", method = RequestMethod.POST)
	  public Login registerUser(HttpSession session, @RequestBody String crawlJson, HttpServletResponse res) {
		   Login login = userDao.registerUser(crawlJson);
		   if(login != null) {
			   session.setAttribute("login", login); 
			   res.setStatus(201);
			   return login;
		   }
		   res.setStatus(422);
		   	return null;
	    
	  }
	  
	  @RequestMapping(path = "auth/login", method = RequestMethod.POST)
	  public Login login(HttpSession session, @RequestBody String crawlJson, HttpServletResponse res) {
		  Login login = userDao.loginUser(crawlJson);
			if(login != null) {
				  session.setAttribute("login", login);
				  return login;
			}
			res.setStatus(401);
			return null;
	  }
	  
	  @RequestMapping(path = "auth/logout", method = RequestMethod.POST)
	  public Boolean logout(HttpSession session, HttpServletResponse response) {
		  session.removeAttribute("login");
		   if(session.getAttribute("login") == null) {
		    return true;
		   }
		  return false;
		   
	  }
	  
	  @RequestMapping(path = "auth/unauthorized")
	  public String unauth(HttpServletResponse response) {
		  System.out.println("unauthorized");
	    response.setStatus(401);
	    return "unauthorized";
	  }
	 
	 //user
	  @RequestMapping(path="users", method=RequestMethod.GET)
	  public Set<User> indexUsers(HttpServletResponse res) {
		  Set<User> users = userDao.indexUsers();
		  if (users == null) {
			  res.setStatus(400);
			  return null;
		  } else {
			  res.setStatus(200);
			  return users;
		  }
	  }
	 
	 //works
	 @RequestMapping(path="users/{id}", method= RequestMethod.GET)
	    public User findUser(HttpServletRequest req, HttpServletResponse res, @PathVariable int id){
			return userDao.findUser(id);
	    	
	    }
	 //works
	@RequestMapping(path="users/{id}/group/{gid}", method= RequestMethod.GET)
    		public Set<User> indexUserByGroup(HttpServletRequest req, HttpServletResponse res, @PathVariable int gid){
			return userDao.indexUserByGroup(gid);
		}
	//works
	@RequestMapping(path="users/{id}", method=RequestMethod.PUT)
    		public User updateUser(HttpServletRequest req, HttpServletResponse res,@PathVariable int id, @RequestBody String crawlJson) {
			return userDao.updateUser(id, crawlJson);
		}
	//works
	@RequestMapping(path="users/{id}/contacts", method=RequestMethod.POST)
		public User addContactToUser(HttpServletRequest req, HttpServletResponse res,@PathVariable int id, @RequestBody String crawlJson) {
			Contact contact = contactDao.createContact(id, crawlJson);
			if(contact != null) {
				User user = userDao.addContactToUser(contact, id);
				if(user != null) {
					return user;
				}
			}
			res.setStatus(422);
			return null;
	}
	
	 //posts
	
	//works
	@RequestMapping(path="users/{id}/group/{gid}/post", method=RequestMethod.POST)
    		public Post createPost(HttpServletRequest req, HttpServletResponse res,@PathVariable int id, @PathVariable int gid,@RequestBody String crawlJson) {
			res.setStatus(201);
			System.out.println("tovihngobvhnrovnrvornvorgnv");
			return userDao.createPost(id, gid, crawlJson);
		}
	//works
	@RequestMapping(path="users/{id}/post/{pid}", method=RequestMethod.PUT)
    public Post updatePost(HttpServletRequest req, HttpServletResponse res,@PathVariable int id,@PathVariable int pid,@RequestBody String crawlJson) {
		return userDao.updatePost(pid, crawlJson);
    	
    }
	//works
    @RequestMapping(path="users/{id}/post/{pid}", method=RequestMethod.DELETE)
    public Boolean destroyPost(HttpServletRequest req, HttpServletResponse res,@PathVariable  int id,@PathVariable  int pid) {
		return userDao.deletePost(pid);
    	
    }
	
	//works
	@RequestMapping(path="users/{id}/post", method=RequestMethod.GET)
		public Set<Post>findPostByUser(HttpServletRequest req, HttpServletResponse res,@PathVariable int id) {
			return userDao.findPostByUser(id);
		}
	
	//works
	@RequestMapping(path="users/{id}/post/group/{gid}", method=RequestMethod.GET)
		public Set<Post>findPostByGroup(HttpServletRequest req, HttpServletResponse res,@PathVariable int gid) {
			return userDao.findPostByGroup(gid);
	}
	
	@RequestMapping(path = "ping", method = RequestMethod.GET)
    public String ping() {
        return "pong";
    }
	
}
