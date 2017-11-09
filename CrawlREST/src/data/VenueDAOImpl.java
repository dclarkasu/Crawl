package data;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Address;
import entities.Contact;
import entities.Venue;

@Transactional
@Repository
public class VenueDAOImpl implements VenueDAO {
	
	@PersistenceContext
	EntityManager em;

	@Override
	public Set<Venue> indexVenue() {
		String sql = "SELECT v FROM Venue v WHERE v.isActive = true";
		List<Venue>  venueList = em.createQuery(sql, Venue.class).getResultList();
		return new HashSet<>(venueList);
	}

	@Override
	public Set<Venue> findVenueBycity(String city) {
		String sql = "SELECT v FROM Venue v WHERE v.address.city = :city";
		List<Venue> venueList = em.createQuery(sql, Venue.class)
					.setParameter("city", city)
					.getResultList();
		return new HashSet<>(venueList);
	}

	@Override
	public Venue createVenue(String json) {
		System.out.println(json);
		ObjectMapper mapper = new ObjectMapper();
		try {
			Venue venue = mapper.readValue(json, Venue.class);
			venue.setActive(true);
			System.out.println(venue);
			System.out.println(venue.getAddress());
			em.persist(venue);
			em.flush();
			return venue;
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} 
		return null;
	}

	@Override
	public Venue updateVenue(int id, String json) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			Venue venueInput = mapper.readValue(json, Venue.class);
			Venue venueManaged = em.find(Venue.class, id);
			if(venueManaged != null) {
				venueManaged.setName(venueInput.getName());
				venueManaged.setDescription(venueInput.getDescription());
				venueManaged.setHours(venueInput.getHours());
				venueManaged.setImgUrl(venueInput.getImgUrl());
				return venueManaged;
			}
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return null;
	}

	@Override
	public Venue inactiveVenue(int id) {
		Venue venue = em.find(Venue.class, id);
		venue.setActive(false);
		return venue;
	}

	@Override
	public Venue activateVenue(int id) {
		Venue venue = em.find(Venue.class, id);
		venue.setActive(true);
		return venue;
	}
	
	@Override
	public Venue findVenue(int id) {
		return em.find(Venue.class, id);
	}

	@Override
	public Address createAddress(String json) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			Address address = mapper.readValue(json, Address.class);
			em.persist(address);
			em.flush();
			return address;
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	
	@Override
	public Address updateAddress(String json, int id) {
		System.out.println(json);
		ObjectMapper mapper = new ObjectMapper();
		try {
			Address addressInput = mapper.readValue(json, Address.class);
			System.out.println(addressInput);
			Address addressManaged = em.find(Address.class, id);
			if(addressManaged != null) {
				addressManaged.setCity(addressInput.getCity());
				addressManaged.setState(addressInput.getState());
				addressManaged.setLatitude(addressInput.getLatitude());
				addressManaged.setLongitude(addressInput.getLongitude());
				addressManaged.setStreet(addressInput.getStreet());
				addressManaged.setStreet2(addressInput.getStreet2());
				return addressManaged;
			}
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public Venue updateAddressOfVenue(Address address, int id) {
		Venue venue = em.find(Venue.class, id);
		if(venue != null) {
			venue.setAddress(address);
			return null;
		}
		return null;
	}

	@Override
	public Venue addContactToVenue(Contact contact, int id) {
		Venue venue = em.find(Venue.class, id);
		if(venue != null) {
			venue.setContact(contact);
			return venue;
		}
		return null;
	}



}
