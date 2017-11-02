package data;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Group;
import entities.Login;
import entities.Post;
import entities.User;

@Transactional
@Repository
public class UserDAOImpl implements UserDAO {

	@PersistenceContext
	private EntityManager em;
	 
//	@Autowired
//	private PasswordEncoder encoder;

	//Login (User)
	@Override
	public Login loginUser(String crawlJson) {
		// show user
		return null;
	}

	@Override
	public Login registerUser(String crawlJson) {
		// create user
		return null;
	}

	//User
	@Override
	public Set<User> indexUserByGroup(int gid) {
		String query = "SELECT g FROM Group g where g.id = :id"; //JPQL
		List<Group> groups = em.createQuery(query, Group.class)
				.setParameter("id", gid)
				.getResultList();
		return new HashSet<User>(groups.get(0).getUsers());
	}
	
	@Override
	public User findUser(int id) {
		return em.find(User.class, id);
			
	}


	@Override
	public User updateUser(int id, String crawlJson) {
		ObjectMapper mapper = new ObjectMapper();
		  User mappedUser = null;
		  try {
			  mappedUser = mapper.readValue(crawlJson, User.class);
		  }	catch(Exception e) {
			  e.printStackTrace();
		  }
		  User u = em.find(User.class, id);
		  u.setFirstName(mappedUser.getFirstName());
		  u.setLastName(mappedUser.getLastName());
		  //going to need contact
		 return u;
	}

	

	//Posts
	@Override
	public Set<Post> findPostByUser(int id, int pid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Set<Post> findPostByGroup(int gid, int pid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Post createPost(int id, String crawlJson) {
		ObjectMapper mapper = new ObjectMapper();
		
		try {
		  Post mappedPost = mapper.readValue(crawlJson, Post.class);
		  User u = em.find(User.class, id); //mapping the foreign key and associates them together
		  mappedPost.setUser(u);
		  em.persist(mappedPost);
		  em.flush();
		  
		  return mappedPost;
		} catch (Exception e) {
		  e.printStackTrace();
		}
		return null;
	}

	@Override
	public Post updatePost(int pid, String crawlJson) {
		ObjectMapper mapper = new ObjectMapper();
		  Post mappedPost = null;
		  try {
			  mappedPost = mapper.readValue(crawlJson, Post.class);
		  }	catch(Exception e) {
			  e.printStackTrace();
		  }
		  Post p = em.find(Post.class, pid);
		  p.setMessage(mappedPost.getMessage());
		
		 return p;	
		 }

	@Override
	public Boolean deletePost(int pid) {
		Post p = em.find(Post.class, pid);
		try{
			em.remove(p);
			return true;
		}catch(Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	


}
