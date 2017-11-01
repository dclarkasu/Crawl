package controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.UserDAO;

@RestController
public class UserController {

//	 @Autowired
//	  private UserDAO userDAO;
	 
	 @RequestMapping(path = "ping", method = RequestMethod.GET)
	    public String ping() {
	        return "pong";
	    }
}
