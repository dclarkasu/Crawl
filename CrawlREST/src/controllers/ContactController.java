package controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.ContactDAO;
import entities.Contact;

@RestController
public class ContactController {
	@Autowired
	private ContactDAO contactDao;
	
	@RequestMapping(path="users/{id}/contact/ping", method=RequestMethod.GET)
	public String ping() {
		return "pong";
	}

	@RequestMapping(path="users/{uid}/contact/{sid}", method=RequestMethod.GET)
	public Contact show(HttpServletRequest req, HttpServletResponse res,@PathVariable int uid,@PathVariable int sid) {
		res.setStatus(202);
		return contactDao.showContact(uid, sid);
	}


	
	@RequestMapping(path="users/{uid}/contact", method=RequestMethod.POST)
	public Contact create(HttpServletRequest req, HttpServletResponse res, @PathVariable int uid, @RequestBody String todoJson) {
		res.setStatus(201);
		System.out.println("sup");
		return contactDao.createContact(uid,todoJson);
	}



	@RequestMapping(path="users/{uid}/contact/{sid}", method=RequestMethod.PUT)
	public Contact updateContact(HttpServletRequest req, HttpServletResponse res, @PathVariable int uid, @PathVariable int sid, @RequestBody String todoJson) {
		res.setStatus(202);
		return contactDao.updateContact(uid, sid, todoJson);
	}


	
	@RequestMapping(path="users/{uid}/contact/{sid}", method=RequestMethod.DELETE)
	public Boolean destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable int uid, @PathVariable int sid) {
		res.setStatus(202);
		return contactDao.deleteContact(uid, sid);
	}

	@RequestMapping(path="users/{uid}/contactUser/{sid}", method=RequestMethod.GET)
	public Contact findContactByUser(HttpServletRequest req, HttpServletResponse res, @PathVariable int uid, @PathVariable int sid) {
		res.setStatus(202);
		return contactDao.findContactByUser(uid, sid);
	}

	@RequestMapping(path="users/{uid}/contactVenue/{sid}", method=RequestMethod.GET)
	public Contact findContactByVenue(HttpServletRequest req, HttpServletResponse res, @PathVariable int uid, @PathVariable int sid) {
		res.setStatus(202);
		return contactDao.findContactByVenue(uid, sid);
	}
	
}
