package com.finapp.app.unit.models.dto.auth;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;

import com.finapp.app.models.dto.auth.SignInDto;

public class SignInDtoUnitTest {

	@Test
	void testSignInDtoCreate() {
		// Arrange
		String email = "user@email.com";
		String password = "password";

		// Act
		SignInDto signInDto = new SignInDto(email, password);

		// Assert
		assertNotNull(signInDto);
		assertEquals(signInDto.email(), email);
		assertEquals(signInDto.password(), password);
	}
}
