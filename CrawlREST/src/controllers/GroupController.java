package controllers;

import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.GroupDAO;
import entities.Group;
//brian thomas was here
@RestController
public class GroupController {
	
	@Autowired
	private GroupDAO groupDAO;
	
	@RequestMapping(path="/groups/ping", method=RequestMethod.GET)
	public String ping() {
		return "pong";
	}
	
	@RequestMapping(path="/groups/{gid}", method=RequestMethod.GET)
    public Group showGroup(HttpServletRequest req, HttpServletResponse res,@PathVariable int gid) {
        res.setStatus(302);
        return groupDAO.findGroupById(gid);
    }
	
	@RequestMapping(path="/{uid}/groups", method=RequestMethod.POST)
	public Group createGroup(@RequestBody String groupJSON, @PathVariable int uid, HttpServletResponse res) {
		Group newGroup = groupDAO.createGroup(uid, groupJSON);
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
			res.setStatus(404);
			return null;
		} else {
			res.setStatus(302);
			return groupSet;
		}
	}
	
	@RequestMapping(path="/groups/{gid}", method=RequestMethod.PUT)
	public Group updateGroup(@PathVariable int gid, @RequestBody String groupJSON, HttpServletResponse res) {
		Group updateGroup = groupDAO.updateGroup(gid, groupJSON);
		if(updateGroup == null) {
			res.setStatus(304);
			return null;
		} else {
			res.setStatus(202);
			return updateGroup;
		}
	}
	
	@RequestMapping(path="/groups/{gid}", method=RequestMethod.DELETE)
	public Boolean deleteGroup(@PathVariable int gid, HttpServletResponse res) {
		Boolean bool = groupDAO.deleteGroup(gid);
		if (bool == true) {
			res.setStatus(202);
			return true;
		} else {
			res.setStatus(304);
			return false;
		}
	}
}
