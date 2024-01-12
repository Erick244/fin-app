package com.finapp.app.integration.configs;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.web.SecurityFilterChain;

import com.finapp.app.configs.security.SecurityConfig;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class SecurityConfigIntegrationTest {

	@Autowired
	private SecurityConfig securityConfig;

	@Test
	void testAuthenticationManager() throws Exception {
		// Arrange & Act
		AuthenticationManager authenticationManager = securityConfig.authenticationManager(null);

		// Assert
		assertNotNull(authenticationManager);
	}

	@Test
	void testSecurityFilterChain() throws Exception {
		// Arrange & Act
		SecurityFilterChain filterChain = securityConfig.securityFilterChain(null);

		// Assert
		assertNotNull(filterChain);
	}
}
