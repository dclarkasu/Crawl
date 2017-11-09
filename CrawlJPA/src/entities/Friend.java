package entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Friend {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@ManyToOne
	@JoinColumn(name = "friend_id")
	private User fUser;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	public User getfUser() {
		return fUser;
	}

	public void setfUser(User fUser) {
		this.fUser = fUser;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public int getId() {
		return id;
	}

	@Override
	public String toString() {
		return "Friend [user=" + user + ", friend=" + fUser + "]";
	}

}
