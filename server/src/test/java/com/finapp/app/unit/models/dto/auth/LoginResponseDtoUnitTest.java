package com.finapp.app.unit.models.dto.auth;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;

import com.finapp.app.models.dto.auth.LoginResponseDto;
import com.finapp.app.models.entities.User;

public class LoginResponseDtoUnitTest {

	@Test
	void testLoginResponseDtoCreate() {
		// Arrange
		User testUser = new User("user", "user@email.com", "password");
		String jwtToken = "jwt-token";

		// Act
		LoginResponseDto loginResponseDto = new LoginResponseDto(testUser, jwtToken);

		// Assert
		assertNotNull(loginResponseDto);
		assertEquals(loginResponseDto.user(), testUser);
		assertEquals(loginResponseDto.jwtToken(), jwtToken);
	}
}
