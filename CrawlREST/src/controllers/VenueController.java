package controllers;

import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.ContactDAO;
import data.VenueDAO;
import entities.Address;
import entities.Contact;
import entities.Venue;

@RestController
public class VenueController {
	
	@Autowired
	private VenueDAO dao;
	
	@Autowired
	private ContactDAO contactDao;
	
	@RequestMapping(path="users/{uid}/venues", method=RequestMethod.GET)
	public Set<Venue> indexVenue(){
		return dao.indexVenue();
	}
	
	@RequestMapping(path="users/{uid}/venues/search/{city}", method=RequestMethod.GET)
	public Set<Venue> indexVenue(@PathVariable String city){
		return dao.findVenueBycity(city);
	}
	
	@RequestMapping(path="users/{uid}/venues/{id}", method=RequestMethod.GET)
	public Venue findVenue(@PathVariable int id) {
		return dao.findVenue(id);
	}
	
	@RequestMapping(path="users/{uid}/venues", method=RequestMethod.POST)
	public Venue createVenue(@RequestBody String json, HttpServletResponse res) {
		Venue venue = dao.createVenue(json);
		if(venue != null) {
			res.setStatus(201);
			return venue;
		}
		res.setStatus(422);
		return null;
	}
	
	@RequestMapping(path="users/{uid}/venues/{id}", method=RequestMethod.PUT)
	public Venue updateVenue(@RequestBody String json, 
			@PathVariable int id,
			HttpServletResponse res) {
		Venue venue = dao.updateVenue(id, json);
		if(venue != null) {
			return venue;
		}
		return null;
	}
	
	@RequestMapping(path="users/{uid}/venues/{id}/deactivate", method=RequestMethod.PUT)
	public Venue makeVenueInactive(@PathVariable int id) {
		return dao.inactiveVenue(id);
	}
	
	@RequestMapping(path="users/{uid}/venues/{id}/activate", method=RequestMethod.PUT)
	public Venue makeVenueActive(@PathVariable int id) {
		return dao.activateVenue(id);
	}
	
	@RequestMapping(path="users/{uid}/venues/address", method=RequestMethod.POST)
	public Address createdAddress(@RequestBody String json, HttpServletResponse res) {
		Address address = dao.createAddress(json);
		if(address != null) {
			res.setStatus(201);
			return address;
		}
		res.setStatus(422);
		return null;
	}
	
	@RequestMapping(path="users/{uid}/venues/address/{id}", method=RequestMethod.PUT)
	public Address updateAddress(@RequestBody String json, 
			@PathVariable int id, 
			HttpServletResponse res) {
		Address address = dao.updateAddress(json, id);
		if(address != null) {
			return address;
		}
		res.setStatus(422);
		return null;
	}
	
	@RequestMapping(path="users/{uid}/venues/{id}/address", method=RequestMethod.POST)
	public Venue addAddressToVenue(@RequestBody String json, 
			@PathVariable int id,
			HttpServletResponse res) {
		Address address = dao.createAddress(json);
		if(address != null) {
			Venue venue = dao.updateAddressOfVenue(address, id);
			if(venue != null) {
				res.setStatus(201);
				return venue;
			}
		}
		res.setStatus(422);
		return null;
	}
	
	@RequestMapping(path="users/{uid}/venues/{id}/contacts", method=RequestMethod.POST)
	public Venue addContactToVenue(@RequestBody String json, 
			@PathVariable int id,
			@PathVariable int uid,
			HttpServletResponse res) {
		Contact contact = contactDao.createContact(uid, json);
		if(contact != null) {
			Venue venue = dao.addContactToVenue(contact, id);
			if(venue != null) {
				return venue;
			}
		}
		res.setStatus(422);
		return null;
	}
	
}
