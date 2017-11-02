package tests;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Address;

public class AddressTest {
	private EntityManagerFactory emf = null;
	private EntityManager em = null;
	Address address;

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
	public void address_Connected_To_DB() {
		address = em.find(Address.class, 1);
		assertEquals(address.getCity(), "Denver");
		assertEquals(address.getState(), "CO");
		assertEquals(address.getLongitude(), 100.1, 0.02);
	}

//	@Test
//	public void test_User_To_Contact() {
//		User user = em.find(User.class, 1);
//		assertEquals(user.getGroups().get(0).getName(), "pub day");
//		assertNotNull(user.getGroups());
//		assertEquals(user.getGroups().get(0).getUsers().get(0).getFirstName(), "bill");
//	}

}
