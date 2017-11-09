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
		assertEquals(user.getFirstName(), "bill");
		assertEquals(user.getLastName(), "james");
		assertEquals(user.getId(), 1);
	}

	@Test
	public void test_User_To_Contact() {
		User user = em.find(User.class, 1);
		assertEquals(user.getGroups().get(0).getName(), "pub day");
		assertNotNull(user.getGroups());
		assertEquals(user.getGroups().get(0).getUsers().get(0).getFirstName(), "bill");
	}

	@Test
	public void test_One_To_One_With_Contact() {
		User user = em.find(User.class, 1);
		assertEquals(user.getContact().getPhoneNumber(), "555-555-5555");
		assertEquals(user.getContact().getEmail(), "bill@gmail.com");
	}

}
