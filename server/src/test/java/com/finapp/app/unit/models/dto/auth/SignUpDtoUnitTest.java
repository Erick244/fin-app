package com.finapp.app.unit.models.dto.auth;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;

import com.finapp.app.models.dto.auth.SignUpDto;

public class SignUpDtoUnitTest {

	@Test
	void testSignUpDtoCreate() {
		// Arrange
		String name = "name";
		String email = "user@email.com";
		String password = "password";
		String confirmPassword = "password";

		// Act
		SignUpDto signUpDto = new SignUpDto(name, email, password, confirmPassword);

		// Assert
		assertNotNull(signUpDto);
		assertEquals(signUpDto.name(), name);
		assertEquals(signUpDto.email(), email);
		assertEquals(signUpDto.password(), password);
		assertEquals(signUpDto.confirmPassword(), confirmPassword);
	}
}
