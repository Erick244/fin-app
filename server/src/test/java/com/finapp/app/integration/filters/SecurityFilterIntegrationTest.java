package com.finapp.app.integration.filters;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.io.IOException;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.mock.web.MockFilterChain;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.TestPropertySource;

import com.finapp.app.filters.SecurityFilter;
import com.finapp.app.models.entities.User;
import com.finapp.app.models.repositories.UsersRepository;
import com.finapp.app.services.JwtService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletResponse;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@TestPropertySource(locations = "classpath:application-tests.properties")
public class SecurityFilterIntegrationTest {

	@Autowired
	private SecurityFilter securityFilter;

	@Autowired
	private JwtService jwtService;

	@Autowired
	private UsersRepository userRepository;

	@Test
	public void testDoFilterInternal_WhithValidToken() throws ServletException, IOException {
		// Arrange
		User user = new User("user", "user@email.com", "password");
		userRepository.save(user);
		String token = jwtService.generateToken(user.getEmail());

		MockHttpServletRequest request = new MockHttpServletRequest();
		request.addHeader("Authorization", "Bearer " + token);
		MockHttpServletResponse response = new MockHttpServletResponse();
		MockFilterChain filterChain = new MockFilterChain();

		// Act
		securityFilter.doFilterInternal(request, response, filterChain);
		User userAuth = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		// Assert
		assertNotNull(userAuth);
		assertEquals(userAuth.toString(), user.toString());
	}

	@Test
	public void testDoFilterInternal_WhithMissingToken() throws ServletException, IOException {
		// Arrange
		MockHttpServletRequest request = new MockHttpServletRequest();
		MockHttpServletResponse response = new MockHttpServletResponse();
		MockFilterChain filterChain = new MockFilterChain();

		// Act
		securityFilter.doFilterInternal(request, response, filterChain);

		// Assert
		assertNull(SecurityContextHolder.getContext().getAuthentication());
	}

	@Test
	public void testDoFilterInternal_WhithInvalidToken() throws ServletException, IOException {
		// Arrange
		String token = "invalidToken";
		MockHttpServletRequest request = new MockHttpServletRequest();
		request.addHeader("Authorization", "Bearer " + token);
		MockHttpServletResponse response = new MockHttpServletResponse();
		MockFilterChain filterChain = new MockFilterChain();

		// Act
		securityFilter.doFilterInternal(request, response, filterChain);

		// Assert
		assertEquals(response.getStatus(), HttpServletResponse.SC_UNAUTHORIZED);
		assertNotNull(response.getErrorMessage());
		assertNull(SecurityContextHolder.getContext().getAuthentication());
	}
}
