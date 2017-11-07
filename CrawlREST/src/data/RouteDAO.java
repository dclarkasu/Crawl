package data;

import java.util.List;

import entities.Route;
import entities.RouteVenue;
import entities.Venue;

public interface RouteDAO {

	  public Route showRoute(int uid, int sid);

	  public Route createRoute(int uid, String todoJson);

	  public Route updateRoute(int uid, int sid, String todoJson);

	  public Boolean deleteRoute(int uid, int cid);
	  
	  public Route addVenueToRoute(int uid, int rid, int vid);
	  
	  public Route removeVenueFromRoute(int uid, int rid, int vid);

	  public Boolean editVenueOrder(int uid, int rid, int vid, int change);

	  public List<Route> index(int uid); 

	  public List<Venue> showVenuesByRoute(int uid, int sid); 
	
	  public List<RouteVenue> showRouteVenuesByRoute(int uid, int sid); 
	  
	  public List<Venue> showAllVenuesExcept(int uid, int sid); 
}
