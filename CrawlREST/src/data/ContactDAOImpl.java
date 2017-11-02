package data;

import javax.persistence.Column;
import javax.persistence.EntityManager;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Contact;
import entities.User;

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
	public Contact createContact(int uid, String todoJson) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			Contact mappedContact = mapper.readValue(todoJson, Contact.class);
			
			em.persist(mappedContact);
			em.flush();
			return mappedContact;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public Contact updateContact(int uid, int sid, String todoJson) {
		ObjectMapper mapper = new ObjectMapper();
        try {
            Contact mappedContact = mapper.readValue(todoJson, Contact.class);
       

            String q = "SELECT c FROM Contact c WHERE c.user.id = :uid AND c.id = :sid";
            Contact contact = em.createQuery(q, Contact.class)
                    .setParameter("uid", uid)
                    .setParameter("sid", sid)
                    .getResultList()
                    .get(0);
            contact.setPhoneNumber(mappedContact.getPhoneNumber());
            contact.setEmail(mappedContact.getEmail());
           
            return contact;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
	}

	@Override
	public Boolean deleteContact(int uid, int tid) {
		try {
			String q = "SELECT c FROM Contact c WHERE c.user.id =:uid AND t.id = :tid";
			Contact contact = em.createQuery(q, Contact.class).setParameter("uid", uid).setParameter("tid", tid).getResultList()
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
		String q = "SELECT c FROM Contact c WHERE c.user.id =:uid";
		Contact contact = em.createQuery(q, Contact.class).setParameter("sid", sid).getResultList()
				.get(0);
		return null;
	}

	@Override
	public Contact findContactByVenue(int uid, int sid) {
		String q = "SELECT c FROM Contact c WHERE c.venue.id =:uid";
		Contact contact = em.createQuery(q, Contact.class).setParameter("sid", sid).getResultList()
				.get(0);
		return null;
	}

}
