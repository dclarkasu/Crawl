package data;

import entities.Route;

public interface RouteDAO {

	  public Route showRoute(int uid, int sid);

	  public Route createRoute(int uid, String todoJson);

	  public Route updateRoute(int uid, int sid, String todoJson);

	  public Boolean deleteRoute(int uid, int cid);
	  
	  public Route addVenueToRoute(int uid, int rid, int vid);
	  
	  public Route removeVenueFromRoute(int uid, int rid, int vid);
	  
<<<<<<< HEAD
	  public void editVenueOrder(int uid, int rid, int vid, int change); 
=======
//	  public Route editVenueOrder(int uid, int rid);
>>>>>>> e053e20d3dc35aa962e8e2dd1a37c5724b3c6a3e

	
}
