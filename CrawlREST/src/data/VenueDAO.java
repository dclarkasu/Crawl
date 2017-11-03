package data;

import java.util.Set;

import entities.Address;
import entities.Contact;
import entities.Venue;

public interface VenueDAO {
	
	public Set<Venue> indexVenue();
	public Set<Venue> findVenueBycity(String city);
	public Venue createVenue(String json);
	public Venue updateVenue(int id, String json);
	public Venue inactiveVenue(int id);
	public Venue activateVenue(int id);
	public Venue findVenue(int id);
	public Address createAddress(String json);
	public Address updateAddress(String json, int id);
	public Venue updateAddressOfVenue(Address address, int id);
	public Venue addContactToVenue(Contact contact, int id);
}
