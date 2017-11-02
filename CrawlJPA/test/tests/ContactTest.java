package tests;

import static org.junit.Assert.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Contact;

public class ContactTest {
	private EntityManagerFactory emf = null;
	private EntityManager em = null;
	Contact contact;

	@Before
	public void setUp() {
		emf = Persistence.createEntityManagerFactory("CrawlPU");
		em = emf.createEntityManager();
	}

	@After
	public void tearDown() {
		em.close();
		emf.close();
	}

	@Test
	public void smokeTest() {
		assertEquals(true, true);
	}

	@Test
	public void contact_Connected_To_DB() {
		contact = em.find(Contact.class, 1);
		assertEquals(contact.getPhoneNumber(), "555-555-5555");
		assertEquals(contact.getEmail(), "bill@gmail.com");

	}
}
