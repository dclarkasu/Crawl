package entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="route_venue")
public class RouteVenue {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="route_id")
	private  Route route;
	
	@JsonIgnore
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
		return "Route_Venue [id=" + id + ", routeId=" + route + ", venueId=" + venue + ", spot=" + spot + "]";
	}
	
	
	
}
