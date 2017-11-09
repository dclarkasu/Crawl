package entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Route {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@OneToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "admin_id")
	private User admin;

	@JsonIgnore
	@OneToMany(mappedBy = "route", fetch = FetchType.EAGER)
	private List<RouteVenue> routeVenues;

	@JsonIgnore
	@ManyToMany(cascade = { CascadeType.ALL })
	@JoinTable(name = "route_venue", joinColumns = @JoinColumn(name = "route_id"), inverseJoinColumns = @JoinColumn(name = "venue_id"))
	private List<Venue> venues;
	
	private int edited;
	private String name;

	//Gets and Sets
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Venue> getVenues() {
		return venues;
	}

	public void setVenues(List<Venue> venues) {
		this.venues = venues;
	}

	public int getId() {
		return id;
	}

	public int getEdited() {
		return edited;
	}

	public void setEdited(int edited) {
		this.edited = edited;
	}

	public List<RouteVenue> getRouteVenues() {
		return routeVenues;
	}

	public void setRouteVenues(List<RouteVenue> routeVenues) {
		this.routeVenues = routeVenues;
	}

	public User getAdmin() {
		return admin;
	}

	public void setAdmin(User admin) {
		this.admin = admin;
	}

	@Override
	public String toString() {
		return "Route [name=" + name + "]";
	}

}
