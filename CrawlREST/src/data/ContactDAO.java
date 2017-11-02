package data;

import entities.Contact;

public interface ContactDAO {

	  public Contact showContact(int uid, int cid);

	  public Contact createContact(int uid, String todoJson);

	  public Contact updateContact(int uid, int sid, String todoJson);

	  public Boolean deleteContact(int uid, int cid);
	  
	  public Contact findContactByUser(int uid, int sid);
	  
	  public Contact findContactByVenue(int uid, int sid);
}
