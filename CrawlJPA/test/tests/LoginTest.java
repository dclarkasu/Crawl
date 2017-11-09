package tests;

import static org.junit.Assert.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Login;

public class LoginTest {

	EntityManagerFactory emf = null;
	EntityManager em = null;
	Login l;

	@Before
	public void setUp() throws Exception {
		emf = Persistence.createEntityManagerFactory("CrawlPU");
		em = emf.createEntityManager();
		l = em.find(Login.class, 1);
	}

	@After
	public void tearDown() throws Exception {
		em.close();
		emf.close();
		l = null;
	}

	@Test
	public void smokeTest() {
		assertEquals(true, true);
	}

	@Test
	public void test_Login_Username_mapped() {
		assertEquals("cage", l.getUsername());
	}

	@Test
	public void test_Login_password_mapped() {
		assertEquals("pass1", l.getPassword());
	}

	@Test
	public void test_Login_user_mapped() {
		assertEquals("bill", l.getUser().getFirstName());
	}
}
