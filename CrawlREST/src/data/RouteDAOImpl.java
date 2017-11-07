package data;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Group;
import entities.Route;
import entities.RouteVenue;
import entities.Venue;

@Transactional
@Repository
public class RouteDAOImpl implements RouteDAO {

	@PersistenceContext
	private EntityManager em;

	@Override
	public List<Route> index(int uid) {
		String q = "SELECT r FROM Route r";
		return em.createQuery(q, Route.class).getResultList();

	}

	@Override
	public Route showRoute(int uid, int rid) {
		Route r = em.find(Route.class, rid);
		return r;
	}

	@Override
	public Route createRoute(int uid, String routeJson) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			Route mappedRoute = mapper.readValue(routeJson, Route.class);
			em.persist(mappedRoute);
			em.flush();
			return mappedRoute;

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public Route updateRoute(int uid, int sid, String routeJson) {
		ObjectMapper mapper = new ObjectMapper();
		Group mappedGroup = null;
		try {

			mappedGroup = mapper.readValue(routeJson, Group.class);

			Route r = em.find(Route.class, sid);
			r.setName(mappedGroup.getName());

			return r;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;

	}

	@Override
	public Boolean deleteRoute(int uid, int sid) {
		try {
			String q = "SELECT r FROM Route r WHERE r.id =:sid";
			Route route = em.createQuery(q, Route.class).setParameter("sid", sid).getResultList().get(0);
			em.remove(route);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		;
		return null;
	}

	@Override
	public Route addVenueToRoute(int uid, int rid, int vid) {
		Route r = em.find(Route.class, rid);
		Venue v = em.find(Venue.class, vid);

		RouteVenue rv = new RouteVenue();
		rv.setRoute(r);
		rv.setVenue(v);

		String q = "SELECT r FROM RouteVenue r WHERE r.route.id =:rid";
		int sp = em.createQuery(q, RouteVenue.class).setParameter("rid", rid).getResultList().size();
		rv.setSpot(sp + 1);
		em.persist(rv);
		return r;
	}

	@Override
	public Boolean editVenueOrder(int uid, int rid, int vid, int change) {
		change = 1 - change;
		boolean bool = false;
		Route r = em.find(Route.class, rid);
		Venue v = em.find(Venue.class, vid);
		
		try {
			String q = "SELECT r FROM RouteVenue r WHERE r.route =:r AND r.venue = :v";
			RouteVenue rv = em.createQuery(q, RouteVenue.class).setParameter("r", r)
					.setParameter("v", em.find(Venue.class, vid)).getResultList().get(0);
			q = "SELECT r FROM RouteVenue r WHERE r.route =:r";
			int rvn = em.createQuery(q, RouteVenue.class).setParameter("r", r).getResultList().size();
			int rvs = rv.getSpot();
			boolean test = (change > 0 ? (rvs < rvn ? true : false) : (rvs > 1 ? true : false));
			if (test) {
				int rvts = rvs + change;
				q = "SELECT r FROM RouteVenue r WHERE r.spot =:rvts AND r.route = :r";
				RouteVenue rvt = em.createQuery(q, RouteVenue.class).setParameter("rvts", rvts).setParameter("r", r).getResultList().get(0);
				rv.setSpot(rvts);
				rvt.setSpot(rvs);
				bool = true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return bool;
	}

	@Override
	public Route removeVenueFromRoute(int uid, int rid, int vid) {
		String q = "SELECT r FROM RouteVenue r WHERE r.route =:r AND r.venue = :v";
		Route r = em.find(Route.class, rid);
		RouteVenue routeVen = em.createQuery(q, RouteVenue.class).setParameter("r", r)
				.setParameter("v", em.find(Venue.class, vid)).getResultList().get(0);
		int s = routeVen.getSpot();

		em.remove(routeVen);

		String w = "SELECT r FROM RouteVenue r WHERE r.route.id = :rid AND r.spot >:s";
		List<RouteVenue> rvs = em.createQuery(w, RouteVenue.class).setParameter("rid", r.getId()).setParameter("s", s)
				.getResultList();

		for (RouteVenue rv : rvs) {
			System.out.println("in for loop");
			System.out.println(rv);
			int sp = rv.getSpot() - 1;
			rv.setSpot(sp);
		}

		return r;
	}

	@Override
	public List<Venue> showVenuesByRoute(int uid, int sid) {
		String q = "SELECT v from RouteVenue v where v.route.id = :rid";
		List <RouteVenue> rVenues = em.createQuery(q, RouteVenue.class).setParameter("rid", sid).getResultList();
		List<Venue> venues = new ArrayList<Venue>();
		for (RouteVenue routeVenue : rVenues) {
			venues.add(routeVenue.getVenue());
		}
		return venues;
	}
	
	@Override
	public List<RouteVenue> showRouteVenuesByRoute(int uid, int sid){
		String q = "SELECT v from RouteVenue v where v.route.id = :rid";
		List <RouteVenue> rVenues = em.createQuery(q, RouteVenue.class).setParameter("rid", sid).getResultList();
		System.out.println(rVenues);
		return rVenues;
	}
}
