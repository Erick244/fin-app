package com.finapp.app.unit.filters;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;

import com.finapp.app.filters.SecurityFilter;

public class SecurityFilterUnitTest {

	private SecurityFilter securityFilter;

	@BeforeEach
	public void setUp() {
		this.securityFilter = new SecurityFilter();
	}

	@Test
	public void testExtractAuthBearerToken_WithValidToken() {
		// Arrange
		MockHttpServletRequest request = new MockHttpServletRequest();
		request.addHeader("Authorization", "Bearer validToken");

		// Act
		String token = securityFilter.extractAuthBearerToken(request);

		// Assert
		assertNotNull(token);
		assertEquals("validToken", token);
	}

	@Test
	public void testExtractAuthBearerToken_WithInvalidToken() {
		// Arrange
		MockHttpServletRequest request = new MockHttpServletRequest();
		request.addHeader("Authorization", "ivalidToken");

		// Act
		String token = securityFilter.extractAuthBearerToken(request);

		// Assert
		assertNull(token);
	}

	@Test
	public void testExtractAuthBearerToken_WithMissingHeader() {
		// Arrange
		MockHttpServletRequest request = new MockHttpServletRequest();

		// Act
		String token = securityFilter.extractAuthBearerToken(request);

		// Assert
		assertNull(token);
	}
}
