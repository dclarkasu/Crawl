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
import entities.Group;
import entities.User;

@RestController
public class UserController {

	 @Autowired
	  private UserDAO userDao;
//	 @Autowired
//	 private ContactDAO contactDao;
	 
	 
	 
	 @RequestMapping(path = "ping", method = RequestMethod.GET)
	    public String ping() {
	        return "pong";
	    }
	 
	 @RequestMapping(path="/user/{id}", method= RequestMethod.GET)
	    public User indexUser(HttpServletRequest req, HttpServletResponse res, @PathVariable int id){
			return userDao.findUser(id);
	    	
	    }
	 
	@RequestMapping(path="/group/{gid}", method= RequestMethod.GET)
    		public Set<User> index(HttpServletRequest req, HttpServletResponse res, @PathVariable int gid){
			return userDao.indexUserByGroup(gid);
		}
	
	@RequestMapping(path="/user/{id}", method=RequestMethod.PUT)
    		public User update(HttpServletRequest req, HttpServletResponse res,@PathVariable int id, @RequestBody String todoJson) {
			return userDao.updateUser(id,todoJson);
		}
	
	 
}
