package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import entities.Contact;
import entities.Friend;
import entities.User;

public class FriendDAOImpl implements FriendDAO {

	@PersistenceContext
	private EntityManager em;
	
	
	@Override
	public void connectFriends(int uid, int fid) {
		User user = em.find(User.class, uid);
		User fUser = em.find(User.class, fid);
		user.getFriends().add(fUser);
		
	}

	@Override
	public Boolean disconnectFriends(int uid, int fid) {
		Boolean bool = false;
		String q = "SELECT f FROM friend f WHERE (f.friend.id = :uid AND f.user.id = :fid) OR (f.friend.id = :fid AND f.user.id";
		Friend friend = em.createQuery(q, Friend.class).setParameter("uid", uid).setParameter("fid", fid).getResultList()
				.get(0);
		int check = friend.getId();
		em.remove(friend);
		if(em.find(Friend.class, check)== null) {
			bool = true;
		};
		return bool;
	}

	

}
