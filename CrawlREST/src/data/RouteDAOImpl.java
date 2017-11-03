package data;


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
		r.getVenues().add(v);
		return r;
	}

	@Override
	public void editVenueOrder(int uid, int rid, int vid, int change) {
		change = 1-change;
		
		try {
			String q = "SELECT r FROM RouteVenue r WHERE r.routeId =:rid AND r.venueId = :vid";
			RouteVenue rv = em.createQuery(q, RouteVenue.class).setParameter("rid", rid).setParameter("vid", vid).getResultList().get(0);
			q = "SELECT r FROM RouteVenue r WHERE r.routeId =:rid";
			int rvn = em.createQuery(q, RouteVenue.class).setParameter("rid", rid).getResultList().size()-1;
			int rvs = rv.getSpot();
			boolean test = (change>0? (rvs<rvn? true : false):(rvs>0? true : false));
			if(test) {
			int rvts = rvs + change;
			q = "SELECT r FROM RouteVenue r WHERE r.spot =:rvts AND r.venueId = :vid";
			RouteVenue rvt = em.createQuery(q, RouteVenue.class).setParameter("rvts", rvts).getResultList().get(0);
			rv.setSpot(rvts);
			rvt.setSpot(rvs);}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public Route removeVenueFromRoute(int uid, int rid, int vid) {
		Route r = em.find(Route.class, rid);
		List<Venue> venues = r.getVenues();
		for (Venue venue : venues) {
			if(venue.getId()==vid) {
				venues.remove(venues.indexOf(venue));
			}
		}
		r.setVenues(venues);
		return r;
	}
}

