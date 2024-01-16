package com.finapp.app.unit.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.auth0.jwt.exceptions.JWTDecodeException;
import com.finapp.app.services.JwtService;

public class JwtServiceUnitTest {

	private JwtService jwtService;

	@BeforeEach
	void setUp() {
		jwtService = new JwtService();
		jwtService.setSecret("test-secret");
	}

	@Test
	void testGenerateToken() {
		// Arrange
		String email = "email@example.com";

		// Act
		String token = jwtService.generateToken(email);

		// Assert
		assertNotNull(token);
		assertEquals(jwtService.validationToken(token), email);
	}

	@Test
	void testValidationToken() {
		// Arrange
		String email = "email@example.com";
		String token = jwtService.generateToken(email);

		// Act
		String sub = jwtService.validationToken(token);

		// Assert
		assertNotNull(sub);
		assertEquals(sub, email);
	}

	@Test
	void testValidationToken_WithInvalidToken() {
		// Arrange
		String invalidToken = "invalid-token";

		// Act & Assert
		assertThrows(JWTDecodeException.class, () -> jwtService.validationToken(invalidToken));
	}

	@Test
	void testValidationToken_WithNullToken() {
		// Arrange
		String invalidToken = null;

		// Act & Assert
		assertThrows(JWTDecodeException.class, () -> jwtService.validationToken(invalidToken));
	}
}
