package tests;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Group;

public class GroupTest {
	private EntityManagerFactory emf = null;
	private EntityManager em = null;
	Group group;

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
	public void group_Connected_To_DB() {
		group = em.find(Group.class, 1);
		assertEquals(group.getName(), "pub day");
		assertEquals(group.getAdmin().getFirstName(), "david");
		assertEquals(group.getId(), 1);
	}

	@Test
	public void test_Group_To_User() {
		Group group = em.find(Group.class, 1);
		assertEquals(group.getUsers().get(0).getFirstName(), "bill");
		assertNotNull(group.getUsers());
		assertEquals(group.getAdmin().getGroups().get(0).getUsers().get(0).getContact().getPhoneNumber(), "555-555-5555");
	}
	
	@Test
	public void test_Group_To_Event() {
		Group group = em.find(Group.class, 1);
		assertEquals(group.getEvents().get(0).getName(), "pams birthday");
	}

}
