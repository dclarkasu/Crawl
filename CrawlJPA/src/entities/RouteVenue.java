package entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="route_venue")
public class RouteVenue {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	
	
	@ManyToOne
	@JoinColumn(name="route_id")
	private  Route route;
	
	
	@ManyToOne
	@JoinColumn(name="venue_id")
	private  Venue venue;
	

	private int spot;



	public Route getRoute() {
		return route;
	}

	public void setRoute(Route route) {
		this.route = route;
	}

	public Venue getVenue() {
		return venue;
	}

	public void setVenue(Venue venue) {
		this.venue = venue;
	}

	public int getSpot() {
		return spot;
	}

	public void setSpot(int spot) {
		this.spot = spot;
	}

	public int getId() {
		return id;
	}

	@Override
	public String toString() {
		return "Route_Venue [id=" + id + ": "+ venue.getName() +" ]";
	}
	
	
	
}
