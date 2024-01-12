package com.finapp.app.unit.configs;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.finapp.app.configs.security.SecurityConfig;

public class SecurityConfigUnitTest {

	private SecurityConfig securityConfig;

	@BeforeEach
	public void setUp() {
		securityConfig = new SecurityConfig();
	}

	@Test
	void testCorsConfigurer() {
		// Arrange & Act
		WebMvcConfigurer webMvcConfigurer = securityConfig.corsConfigurer();

		// Assert
		assertNotNull(webMvcConfigurer);
	}

	@Test
	void testPasswordEncoder() {
		// Arrange & Act
		PasswordEncoder passwordEncoder = securityConfig.passwordEncoder();

		// Assert
		assertNotNull(passwordEncoder);
		assertTrue(passwordEncoder.matches("password", passwordEncoder.encode("password")));
	}
}
