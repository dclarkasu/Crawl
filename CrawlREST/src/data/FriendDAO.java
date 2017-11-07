package data;

import java.util.List;

import entities.User;

public interface FriendDAO {
	
	
	  
	  public void connectFriends(int uid, int fid);
	  
	  public Boolean disconnectFriends(int uid, int fid);
	  
	  

}
