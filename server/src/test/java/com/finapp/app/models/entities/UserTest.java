package com.finapp.app.models.entities;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;

public class UserTest {

	@Test
	public void userDetails() {
		User user = new User("name", "email@dev.com", "12345678");
		UserDetails userDetails = user.userDetails();

		assertTrue(userDetails instanceof UserDetails);
	}
}
