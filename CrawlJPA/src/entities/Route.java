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

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
public class Route {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	private String name;
	
	@JsonIgnore

	@OneToMany(mappedBy="route", fetch=FetchType.EAGER)
	private List<RouteVenue> routeVenues;
	
	@JsonIgnore
	@ManyToMany(cascade= {CascadeType.PERSIST,CascadeType.REMOVE})
	@JoinTable(name="route_venue",
	joinColumns = @JoinColumn(name="route_id"),
	inverseJoinColumns = @JoinColumn(name="venue_id"))
	private List<Venue> venues;

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

	@Override
	public String toString() {
		return "Route [name=" + name + "]";
	}
	
	
}
