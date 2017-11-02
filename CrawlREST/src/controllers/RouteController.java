package controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.RouteDAO;
import entities.Contact;
import entities.Route;

@RestController
public class RouteController {
	@Autowired
	private RouteDAO routeDao;
	
	@RequestMapping(path="/routes/ping", method=RequestMethod.GET)
	public String ping() {
		return "pong";
	}







	@RequestMapping(path="/{uid}/routes/{sid}", method=RequestMethod.GET)
	public Route show(HttpServletRequest req, HttpServletResponse res,@PathVariable int uid,@PathVariable int sid) {
		res.setStatus(202);
		return routeDao.showRoute(uid, sid);
	}


	
	@RequestMapping(path="/{uid}/routes", method=RequestMethod.POST)
	public Route create(HttpServletRequest req, HttpServletResponse res, @PathVariable int uid, @RequestBody String routeJson) {
		res.setStatus(201);
		
		return routeDao.createRoute(uid,routeJson);
	}



	@RequestMapping(path="/{uid}/routes/{sid}", method=RequestMethod.PUT)
	public Route updateRoute(HttpServletRequest req, HttpServletResponse res, @PathVariable int uid, @PathVariable int sid, @RequestBody String routeJson) {
		res.setStatus(202);
		return routeDao.updateRoute(uid, sid, routeJson);
	}


	
	@RequestMapping(path="/{uid}/routes/{sid}", method=RequestMethod.DELETE)
	public Boolean destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable int uid, @PathVariable int sid) {
		res.setStatus(202);
		return routeDao.deleteRoute(uid, sid);
	}

	
	
}
