package com.finapp.app.models.entities;

import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.finapp.app.models.adapters.UserAdapter;
import com.finapp.app.validations.messages.UserValidationMessages;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@NotNull(message = UserValidationMessages.NAME_NOT_NULL)
	@Size(min = 3, max = 20, message = UserValidationMessages.NAME_SIZE)
	private String name;

	@NotNull(message = UserValidationMessages.EMAIL_NOT_NULL)
	@Email(message = UserValidationMessages.EMAIL_NOT_VALID)
	private String email;

	@NotNull(message = UserValidationMessages.PASSWORD_NOT_NULL)
	private String password;

	public User(String name, String email, String password) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
	}

	public User() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", email=" + email + ", password=" + null + "]";
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@JsonIgnore
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getId() {
		return id;
	}

	public UserDetails userDetails() {
		return new UserAdapter(this);
	}
}
