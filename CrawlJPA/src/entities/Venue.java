package entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Venue {

	//entities
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String description;
	private String hours;

	@ManyToMany(mappedBy="venues", fetch=FetchType.EAGER)
	private List<RouteVenue> routeVenues;
	
	@Column(name="is_active")
	private boolean isActive;

	@OneToOne
	@JoinColumn(name="address_id")
	private Address address;

	@OneToOne
	@JoinColumn(name="contact_id")
	private Contact contact;
	
	@ManyToMany(mappedBy="venues", fetch=FetchType.EAGER)
	private List<Route> routes;

	//gets and sets

	public Address getAddress() {
		return address;
	}
	public boolean isActive() {
		return isActive;
	}
	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getHours() {
		return hours;
	}
	public void setHours(String hours) {
		this.hours = hours;
	}
	public int getId() {
		return id;
	}
	public void setAddress(Address address) {
		this.address = address;
	}
	public Contact getContact() {
		return contact;
	}
	public void setContact(Contact contact) {
		this.contact = contact;
	}
	public List<Route> getRoutes() {
		return routes;
	}
	public void setRoutes(List<Route> routes) {
		this.routes = routes;
	}
	
	
	public List<RouteVenue> getRouteVenues() {
		return routeVenues;
	}
	public void setRouteVenues(List<RouteVenue> routeVenues) {
		this.routeVenues = routeVenues;
	}
	@Override
	public String toString() {
		return "Venue [id=" + id + ", name=" + name + ", description=" + description + ", hours=" + hours + ", address="
				+ address + ", contact=" +"]";
	}





}
