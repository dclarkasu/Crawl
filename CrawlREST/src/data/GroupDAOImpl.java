package data;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Event;
import entities.Group;
import entities.User;

@Transactional
@Repository
public class GroupDAOImpl implements GroupDAO {

	@PersistenceContext
	private EntityManager em;
	
	//Group Methods*****************************
	
	@Override
	public Group createGroup(String groupJSON) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			Group mappedGroup = mapper.readValue(groupJSON, Group.class);
			em.persist(mappedGroup);
			em.flush();
			return mappedGroup;
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public Group updateGroup(int gid, String groupJSON) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Set<Group> findGroupByUserId(int uid) {
		String query = "SELECT u FROM User u WHERE u.id = :uid";
		List <User> users = em.createQuery(query, User.class).setParameter("uid", uid)
				.getResultList();
		return new HashSet<>(users.get(0).getGroups());
		
	}

	@Override
	public Boolean deleteGroup(int gid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Group addUserToGroup(int uid, int gid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Group removeUserFromGroup(int uid, int gid) {
		// TODO Auto-generated method stub
		return null;
	}
	
	
	//Event Methods*****************************
	
	@Override
	public Event createEvent(int gid, String eventJSON) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Event updateEvent(int gid, int eid, String eventJSON) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Boolean deleteEvent(int gid, int eid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Set<Event> findEventByGroupId(int gid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Set<Event> findEventsByGroupIdAndUserId(int gid, int uid) {
		// TODO Auto-generated method stub
		return null;
	}

}
