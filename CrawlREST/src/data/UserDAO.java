package data;

import java.util.Set;

import entities.Contact;
import entities.Login;
import entities.Post;
import entities.User;

public interface UserDAO {
	
	//Auth
	public Login loginUser(String crawlJson);
	public Login registerUser(String crawlJson);
	//Register is create
	
	//User Crud
	public Set<User> indexUsers();
	public User findUser(int id);
	public Set<User> indexUserByGroup(int gid);
	public User updateUser(int id, String crawlJson);
	
	//Post Crud
	public Set<Post> findPostByUser(int id);
	public Set<Post> findPostByGroup(int gid);
	public Post createPost(int uid, int gid, String crawlJson);
	public Post updatePost(int pid, String crawlJson);
	public Boolean deletePost(int pid);
	public User addContactToUser(Contact contact, int id);
	public User groupAdminCheck(int uid, int gid);
	public User eventAdminCheck(int uid, int eid);
	public User routeAdminCheck(int uid, int rid);
	

}
