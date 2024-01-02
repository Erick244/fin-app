package com.finapp.app.unit.models.entities;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;

import com.finapp.app.models.entities.User;

public class UserUnitTest {

	@Test
	void UserCreate() {
		// Arrage & Act
		User user = new User("user", "user@email.com", "password");

		// Assert
		assertNotNull(user);
	}
}
