package tests;

import static org.junit.Assert.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Contact;
import entities.Login;

public class ContactTest {

	EntityManagerFactory emf = null;
	EntityManager em = null;
	Contact c;

	@Before
	public void setUp() throws Exception {
		emf = Persistence.createEntityManagerFactory("CrawlPU");
		em = emf.createEntityManager();
		c = em.find(Contact.class, 1);
	}

	@After
	public void tearDown() throws Exception {
		em.close();
		emf.close();
		c = null;
	}

	@Test
	public void smokeTest() {
		assertEquals(true, true);
	}

	@Test
	public void test_Login_Username_mapped() {
		assertEquals("cage", c.getPhoneNumber());
	}

}
