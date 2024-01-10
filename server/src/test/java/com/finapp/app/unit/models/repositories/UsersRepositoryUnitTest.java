package com.finapp.app.unit.models.repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import com.finapp.app.models.entities.User;
import com.finapp.app.models.repositories.UsersRepository;

@DataJpaTest
public class UsersRepositoryUnitTest {

	@Autowired
	private TestEntityManager entityManager;

	@Autowired
	private UsersRepository repository;

	@BeforeEach
	void setUp() {
		repository.deleteAll();
	}

	@Test
	void testFindByEmail() {
		// Arrange
		User userPersisted = persistUser(new User("user", "user@email.com", "password"));
		persistUser(new User("user2", "user2@email.com", "password"));

		// Act
		User user = repository.findByEmail(userPersisted.getEmail());

		// Assert
		assertNotNull(user);
		assertEquals(userPersisted, user);
	}

	private User persistUser(User user) {
		User userPersisted = entityManager.persist(user);
		entityManager.flush();

		return userPersisted;
	}
}
