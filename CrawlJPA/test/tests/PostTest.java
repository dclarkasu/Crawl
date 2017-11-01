package tests;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Post;

public class PostTest {
	private EntityManagerFactory emf = null;
	private EntityManager em = null;
	Post post;

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
	public void post_Connected_To_DB() {
		post = em.find(Post.class, 1);
		assertEquals(post.getMessage(), "lets go dude");
	}

	@Test
	public void test_Post_To_Group() {
		Post post = em.find(Post.class, 1);
		assertEquals(post.getGroup().getName(), "pub day");
		assertNotNull(post.getGroup().getAdmin().getFirstName());
	}

	@Test
	public void test_Post_To_User() {
		Post post = em.find(Post.class, 1);
		assertEquals(post.getUser().getFirstName(), "david");
		assertEquals(post.getUser().getGroups().get(0).getAdmin().getContact().getPhoneNumber(), "555-555-5557");
		
	}

}
