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
import entities.Event;
import entities.Group;

@RestController
public class GroupController {
	
	@Autowired
	private GroupDAO groupDAO;
	
	@RequestMapping(path="users/{id}/groups/ping", method=RequestMethod.GET)
	public String ping() {
		return "pong";
	}
	
	@RequestMapping(path="users/{id}/groups/{gid}", method=RequestMethod.GET)
    public Group showGroup(HttpServletRequest req, HttpServletResponse res,@PathVariable int gid) {
        res.setStatus(200);
        Group g = groupDAO.findGroupById(gid);
        System.out.println(g);
        return g;
    }
	
	@RequestMapping(path="users/{uid}/groups", method=RequestMethod.POST)
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
			res.setStatus(200);
			return groupSet;
		}
	}
	
	@RequestMapping(path="users/{id}/group/{gid}", method=RequestMethod.PUT)
	public Group updateGroup(@PathVariable int gid, @RequestBody String groupJSON, HttpServletResponse res) {
		Group updateGroup = groupDAO.updateGroup(gid, groupJSON);
		if(updateGroup == null) {
			res.setStatus(417);
			return null;
		} else {
			res.setStatus(202);
			return updateGroup;
		}
	}
	
	@RequestMapping(path="users/{id}/groups/{gid}", method=RequestMethod.DELETE)
	public Boolean deleteGroup(@PathVariable int gid, HttpServletResponse res) {
		Boolean bool = groupDAO.deleteGroup(gid);
		if (bool == true) {
			res.setStatus(202);
			return true;
		} else {
			res.setStatus(417);
			return false;
		}
	}
	
	@RequestMapping(path="users/{uid}/groups/{gid}/add/{mid}", method=RequestMethod.PUT)
	public Group addUserToGroup(@PathVariable int mid,@PathVariable int gid, HttpServletResponse res) {
		Group updatedGroup = groupDAO.addUserToGroup(mid, gid);
		if (updatedGroup == null) {
			res.setStatus(406);
			return null;
		} else {
			res.setStatus(201);
			return updatedGroup;
		}
	}
	
	@RequestMapping(path="users/{uid}/group/{gid}/remove/{mid}", method=RequestMethod.DELETE)
	public Group removeUserFromGroup(@PathVariable int mid,@PathVariable int gid, HttpServletResponse res) {
		Group result = groupDAO.removeUserFromGroup(mid, gid);
		if (result == null) {
			res.setStatus(406);
			return null;
		} else {
			res.setStatus(201);
			return result;
		}
	}
	
	//Event Methods******************************************************
	
	@RequestMapping(path="users/{uid}/groups/{gid}/events", method=RequestMethod.POST)
	public Event createEvent(@PathVariable int uid, @PathVariable int gid, @RequestBody String eventJSON, HttpServletResponse res) {
		Event event = groupDAO.createEvent(uid, gid, eventJSON);
		System.out.println("??????????????????????????????????????");
		System.out.println("UID: " + uid + "GID"+ gid);
		if (event == null) {
			res.setStatus(400);
			return null;
		} else {
			res.setStatus(201);
			return event;
		}
	}
	
	@RequestMapping(path="users/{id}/group/events/{eid}", method=RequestMethod.GET)
    public Event showEvent(HttpServletResponse res, @PathVariable int eid) {
        res.setStatus(200);
        Event event = groupDAO.findEventById(eid);
        return event;
    }
	
	@RequestMapping(path="users/{uid}/groups/{gid}/events", method=RequestMethod.GET)
	public Set<Event> findEventByGroupId(@PathVariable int gid, HttpServletResponse res) {
		Set<Event> events = groupDAO.findEventByGroupId(gid);
		if (events == null) {
			res.setStatus(404);
			return null;
		} else {
			res.setStatus(200);
			return events;
		}
	}
	
	@RequestMapping(path="users/{uid}/groups/{gid}/events/{eid}", method=RequestMethod.PUT)
	public Event updateEvent(@PathVariable int gid,@PathVariable int eid,@RequestBody String eventJSON, HttpServletResponse res) {
		Event updatedEvent = groupDAO.updateEvent(gid, eid, eventJSON);
		if(updatedEvent == null) {
			res.setStatus(400);
			return null;
		} else {
			res.setStatus(202);
			return updatedEvent;
		}
	}
	
	@RequestMapping(path="users/{uid}/groups/{gid}/events/{eid}", method=RequestMethod.DELETE)
	public Boolean deleteEvent(@PathVariable int gid, @PathVariable int eid, HttpServletResponse res) {
		Boolean bool = groupDAO.deleteEvent(gid, eid);
		if (bool == true) {
			res.setStatus(202);
			return true;
		} else {
			res.setStatus(400);
			return false;
		}
	}
	
	@RequestMapping(path="users/{uid}/events", method=RequestMethod.GET)
	public Set<Event> findEventByUserId(@PathVariable int uid, HttpServletResponse res) {
		Set<Event> events = groupDAO.findEventsByUserId(uid);
		if (events == null) {
			res.setStatus(404);
			return null;
		} else {
			res.setStatus(200);
			return events;
		}
	}

	@RequestMapping(path="users/{uid}/group/events/{eid}/route/{rid}", method=RequestMethod.PUT)
	public Event addRouteToEvent(@PathVariable int eid, @PathVariable int rid, HttpServletResponse res) {
		Event event = groupDAO.addRouteToEvent(rid, eid);
		if (event == null) {
			res.setStatus(422);
			return null;
		} else {
			res.setStatus(200);
			return event;
		}
	}
}
