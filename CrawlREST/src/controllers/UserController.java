package controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.UserDAO;
import entities.User;

@RestController
public class UserController {

	 @Autowired
	  private UserDAO userDAO;
	 
	 @RequestMapping(path = "ping", method = RequestMethod.GET)
	    public String ping() {
	        return "pong";
	    }
	 
	 @RequestMapping(path="/users", method= RequestMethod.GET)
	 public List<User> getAllUsers() {
		 return userDAO.index();
	 }
}
