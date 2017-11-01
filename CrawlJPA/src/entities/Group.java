package entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name="crawl_group")
public class Group {
	
	private int id;
	
	private String name;
	
	//one to one with User for admin user
	@OneToOne
	@JoinColumn(name="admin_id")
	private User admin;
	
	//many to many with user via virtual assoc. table
	@JsonBackReference(value="userToGroup")
	@ManyToMany
	@JoinTable(name="user_group",
	joinColumns=@JoinColumn(name="group_id"),
	inverseJoinColumns=@JoinColumn(name="user_id"))
	private List<User> users;

	//Gets and Sets
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public User getAdmin() {
		return admin;
	}

	public void setAdmin(User admin) {
		this.admin = admin;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public int getId() {
		return id;
	}

	@Override
	public String toString() {
		return "Group [id=" + id + ", name=" + name + ", admin=" + admin + "]";
	}
	
	
}
