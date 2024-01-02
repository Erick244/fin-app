package com.finapp.app.unit.models.adapters;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Collection;
import java.util.Collections;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;

import com.finapp.app.models.adapters.UserAdapter;
import com.finapp.app.models.entities.User;

public class UserAdapterUnitTest {
	@Test
	void testUserAdapterCreate() {
		// Arrange
		User testUser = getTestUser();

		// Act
		UserAdapter userAdapter = new UserAdapter(testUser);

		// Assert
		assertNotNull(userAdapter);
	}

	private User getTestUser() {
		return new User("user", "user@email.com", "password");
	}

	@Test
	void testGetAuthorities() {
		// Arrange
		UserAdapter userAdapter = new UserAdapter(null);

		// Act
		Collection<? extends GrantedAuthority> authorities = userAdapter.getAuthorities();

		// Assert
		assertNotNull(authorities);
		assertEquals(authorities, Collections.emptyList());
	}

	@Test
	void testGetPassword() {
		// Arrange
		User testUser = getTestUser();
		UserAdapter userAdapter = new UserAdapter(testUser);

		// Act
		String password = userAdapter.getPassword();

		// Assert
		assertNotNull(password);
		assertEquals(password, testUser.getPassword());
	}

	@Test
	void testGetUsername() {
		// Arrange
		User testUser = getTestUser();
		UserAdapter userAdapter = new UserAdapter(testUser);

		// Act
		String username = userAdapter.getUsername();

		// Assert
		assertNotNull(username);
		assertEquals(username, testUser.getEmail());
	}

	@Test
	void testIsAccountNonExpired() {
		// Arrange
		UserAdapter userAdapter = new UserAdapter(null);

		// Act
		boolean isAccountNonExpired = userAdapter.isAccountNonExpired();

		// Assert
		assertTrue(isAccountNonExpired);
	}

	@Test
	void testIsAccountNonLocked() {
		// Arrange
		UserAdapter userAdapter = new UserAdapter(null);

		// Act
		boolean isAccountNonLocked = userAdapter.isAccountNonLocked();

		// Assert
		assertTrue(isAccountNonLocked);
	}

	@Test
	void testIsCredentialsNonExpired() {
		// Arrange
		UserAdapter userAdapter = new UserAdapter(null);

		// Act
		boolean isCredentialsNonExpired = userAdapter.isCredentialsNonExpired();

		// Assert
		assertTrue(isCredentialsNonExpired);
	}

	@Test
	void testIsEnabled() {
		// Arrange
		UserAdapter userAdapter = new UserAdapter(null);

		// Act
		boolean isEnabled = userAdapter.isEnabled();

		// Assert
		assertTrue(isEnabled);
	}
}
