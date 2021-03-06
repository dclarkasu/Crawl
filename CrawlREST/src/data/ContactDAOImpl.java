package data;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Contact;
import entities.User;
import entities.Venue;

@Transactional
@Repository
public class ContactDAOImpl implements ContactDAO {

	@PersistenceContext
	private EntityManager em;
	
	@Override
	public Contact showContact(int uid, int cid) {
		Contact c = em.find(Contact.class,cid);
		return c;
	}

	@Override
	public Contact createContact(int uid, String contJson) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			Contact mappedContact = mapper.readValue(contJson, Contact.class);
			return this.persistContact(mappedContact);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@Override
	public Contact createContact(int uid, Contact contact) {
		return persistContact(contact);
	}
	
	private Contact persistContact(Contact contact) {
		em.persist(contact);
		em.flush();
		return contact;
	}

	@Override
	public Contact updateContact(int uid, int sid, String contJson) {
		ObjectMapper mapper = new ObjectMapper();
        try {
            Contact mappedContact = mapper.readValue(contJson, Contact.class);
           
            return this.updateContactDatabase(sid, mappedContact);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
	}
	
	@Override
	public Contact updateContact(int uid, int sid, Contact contact) {
		return updateContactDatabase(sid, contact);
	}
	
	private Contact updateContactDatabase(int sid, Contact mappedContact) {
		String q = "SELECT c FROM Contact c WHERE c.id = :sid";
        Contact contact = em.createQuery(q, Contact.class)
                .setParameter("sid", sid)
                .getResultList()
                .get(0);
        contact.setPhoneNumber(mappedContact.getPhoneNumber());
        contact.setEmail(mappedContact.getEmail());
       
        return contact;
	}

	@Override
	public Boolean deleteContact(int uid, int sid) {
		try {
			String q = "SELECT c FROM Contact c WHERE c.id =:sid";
			Contact contact = em.createQuery(q, Contact.class).setParameter("sid", sid).getResultList()
					.get(0);
			em.remove(contact);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		;
		return null;
	}


	@Override
	public Contact findContactByUser(int uid, int sid) {

		String q = "SELECT u FROM User u WHERE u.id =:sid";
		Contact contact = em.createQuery(q, User.class).setParameter("sid", sid).getResultList()
				.get(0).getContact();
		return contact;
	}

	@Override
	public Contact findContactByVenue(int uid, int sid) {
		String q = "SELECT v FROM Venue v WHERE v.id =:sid";
		Contact contact = em.createQuery(q, Venue.class).setParameter("sid", sid).getResultList()
				.get(0).getContact();
		return contact;
	}

}
