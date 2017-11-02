package tests;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Route;

public class RouteTest {
	private EntityManagerFactory emf = null;
	private EntityManager em = null;
	Route route;

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
	public void route_Connected_To_DB() {
		route = em.find(Route.class, 1);
		assertEquals(route.getName(), "party route");
		assertEquals(route.getId(), 1);
	}

	@Test
	public void test_Route_To_Venue() {
		route = em.find(Route.class, 1);
		assertNotNull(route.getVenues());
		assertEquals(route.getVenues().get(0).getName(), "sputnik");
		assertEquals(route.getVenues().get(0).getAddress().getCity(), "Denver");
	}

//	@Test
//	public void test_Route_To_Venue() {
//		User user = em.find(User.class, 1);
//		assertEquals(user.getContact().getPhoneNumber(), "555-555-5555");
//		assertEquals(user.getContact().getEmail(), "bill@gmail.com");
//	}

}
