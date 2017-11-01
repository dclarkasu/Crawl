package tests;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.User;

public class UserTest {
	private EntityManagerFactory emf = null;
	private EntityManager em = null;
	User user;

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
	public void user_Connected_To_DB() {
		user = em.find(User.class, 1);
		assertEquals(user.getFirstName(),"" );
	}

//	@Test
//	public void test_Language_mapping() {
//		Film film = em.find(Film.class, 1);
//		assertEquals(film.getLang().getName(), "Japanese");
//	}
//
//	@Test
//	public void test_Many_To_Many_Get_Actors() {
//		Film film = em.find(Film.class, 1);
//		assertNotNull(film.getActors());
//		assertEquals(film.getActors().size(), 10);
//	}
//
//	@Test
//	public void test_Many_To_Many_With_Category() {
//		Film f = em.find(Film.class, 1);
//		assertNotNull(f.getActors());
//		assertEquals(f.getActors().size(), 10);
//		assertEquals(f.getActors().get(0).getFilms().get(0).getActors().get(0).getLastName(), "Guiness");
//	}
//
//	@Test
//	public void test_Many_To_Many_With_Store() {
//		Film f = em.find(Film.class, 1);
//		assertNotNull(f.getStores());
//		assertEquals(f.getStores().size(), 2270);
//	}
}
