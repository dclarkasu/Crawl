package tests;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Venue;

public class VenueTest {
	
	
	private EntityManagerFactory emf = null;
	private EntityManager em = null;
	
	 @Before
	  public void setUp() throws Exception {
	    emf = Persistence.createEntityManagerFactory("CrawlPU");
	    em = emf.createEntityManager();
	  }
	 
	 @After
	  public void tearDown() throws Exception {
	    em.close();
	    emf.close();
	  }
	 
	 @Test
	 public void test_generic_venue() {
		 Venue v = em.find(Venue.class, 1);
		 assertNotNull(v);
	 }
	 
	 @Test
	  public void test_venue_mappings() {
	    Venue venue = em.find(Venue.class, 1);
	    assertEquals(1, venue.getId());
	  }

}
