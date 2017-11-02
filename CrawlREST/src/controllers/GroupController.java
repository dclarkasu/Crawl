package controllers;

import java.util.HashSet;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.GroupDAO;
import entities.Group;

@RestController
public class GroupController {
	
	@Autowired
	private GroupDAO groupDAO;
	
	@RequestMapping(path="/groups/ping", method=RequestMethod.GET)
	public String ping() {
		return "pong";
	}
	
	@RequestMapping(path="/groups", method=RequestMethod.POST)
	public Group createGroup(@RequestBody String groupJSON, HttpServletResponse res) {
		Group newGroup = groupDAO.createGroup(groupJSON);
		if (newGroup == null) {
			res.setStatus(400);
			return null;
		} else {
			res.setStatus(201);
			return newGroup;
		}
	}
	
	@RequestMapping(path="/users/{uid}/groups", method=RequestMethod.GET)
	public Set<Group> findGroupByUserId(@PathVariable int uid, HttpServletResponse res) {
		Set<Group> groupSet = groupDAO.findGroupByUserId(uid);
		if (groupSet == null) {
			res.setStatus(400);
			return null;
		} else {
			res.setStatus(200);
			return groupSet;
		}
	}
	
}
