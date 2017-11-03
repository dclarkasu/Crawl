package data;

import entities.Route;

public interface RouteDAO {

	  public Route showRoute(int uid, int sid);

	  public Route createRoute(int uid, String todoJson);

	  public Route updateRoute(int uid, int sid, String todoJson);

	  public Boolean deleteRoute(int uid, int cid);
	  
	  public Route addVenueToRoute(int uid, int rid, int vid);
	  
	  public Route removeVenueFromRoute(int uid, int rid, int vid);
	  
	  public void editVenueOrder(int uid, int rid, int vid, int change); 

	
}
