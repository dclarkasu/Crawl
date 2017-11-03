package controllers;

import java.util.Collection;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.ContactDAO;
import data.UserDAO;
import entities.Contact;
import entities.Group;
import entities.Post;
import entities.User;

@RestController
public class UserController {

	 @Autowired
	  private UserDAO userDao;
	 @Autowired
	 private ContactDAO contactDao;
	 
	 
	 
	 @RequestMapping(path = "ping", method = RequestMethod.GET)
	    public String ping() {
	        return "pong";
	    }
	 
	 //user
	 
	 //logout user
	 
	 //works
	 @RequestMapping(path="/user/{id}", method= RequestMethod.GET)
	    public User findUser(HttpServletRequest req, HttpServletResponse res, @PathVariable int id){
			return userDao.findUser(id);
	    	
	    }
	 //works
	@RequestMapping(path="/group/{gid}", method= RequestMethod.GET)
    		public Set<User> indexUserByGroup(HttpServletRequest req, HttpServletResponse res, @PathVariable int gid){
			return userDao.indexUserByGroup(gid);
		}
	//works
	@RequestMapping(path="/user/{id}", method=RequestMethod.PUT)
    		public User update(HttpServletRequest req, HttpServletResponse res,@PathVariable int id, @RequestBody String crawlJson) {
			return userDao.updateUser(id, crawlJson);
		}
	//cant test until I can create user
	@RequestMapping(path="/user/{id}/contacts", method=RequestMethod.POST)
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
	
	//not working
	@RequestMapping(path="/user/{id}/post", method=RequestMethod.POST)
    		public Post createPost(HttpServletRequest req, HttpServletResponse res,@PathVariable int id,@RequestBody String crawlJson) {
			res.setStatus(201);
			return userDao.createPost(id, crawlJson);
		}
	
	//works
	@RequestMapping(path="/user/{id}/post", method=RequestMethod.GET)
		public Set<Post>findPostByUser(HttpServletRequest req, HttpServletResponse res,@PathVariable int id) {
			System.out.println("**************************");
			return userDao.findPostByUser(id);
		}
	
	//works
	@RequestMapping(path="/user/{id}/post/group/{gid}", method=RequestMethod.GET)
		public Set<Post>findPostByGroup(HttpServletRequest req, HttpServletResponse res,@PathVariable int gid) {
			System.out.println("**************************");
			return userDao.findPostByGroup(gid);
	}
	
	
	
}
