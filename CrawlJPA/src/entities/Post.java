package entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Post {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="group_id")
	private Group group;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;

	private String message;
}
