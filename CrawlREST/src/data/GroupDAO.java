package data;

import java.util.Set;

import entities.Event;
import entities.Group;

public interface GroupDAO {
	
	//Group Specific Methods
	public Group findGroupById(int gid);
	public Group createGroup(int uid, String groupJSON);
	public Group updateGroup(int gid, String groupJSON);
	public Set<Group> findGroupByUserId(int uid);
	public Boolean deleteGroup(int gid);
	public Group addUserToGroup(int uid, int gid);
	public Group removeUserFromGroup(int uid, int gid);
//	public Group findGroupByEventId(int eid);
	
	//Event Specific Methods
	public Event createEvent(int gid, String eventJSON);
	public Event updateEvent(int gid, int eid, String eventJSON);
	public Boolean deleteEvent(int gid, int eid);
	public Set<Event> findEventByGroupId(int gid);
	public Set<Event> findEventsByUserId(int uid);
	
}
