package com.finapp.app.unit.models.repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.finapp.app.models.entities.Revenue;
import com.finapp.app.models.entities.User;
import com.finapp.app.models.repositories.RevenuesRepository;

@DataJpaTest
public class RevenuesRepositoryUnitTest {

	@Autowired
	private TestEntityManager entityManager;

	@Autowired
	private RevenuesRepository revenuesRepository;

	@BeforeEach
	void setUp() {
		revenuesRepository.deleteAll();
		entityManager.clear();
	}

	@Test
	void testCountByUserId() {
		// Arrage
		User user = persistUser(new User("user", "user@email.com", "password"));
		persistRevenues(5, user);

		User otherUser = persistUser(new User("otheruser", "otheruser@email.com", "password"));
		persistRevenues(3, otherUser);

		// Act
		Long count = revenuesRepository.countByUserId(user.getId());

		// Assert
		assertNotNull(count);
		assertEquals(count, 5);

	}

	private User persistUser(User user) {
		User userPersisted = entityManager.persist(user);
		entityManager.flush();

		return userPersisted;
	}

	private void persistRevenues(int size, User user) {
		for (int i = 0; i < size; i++) {

			String description = "description " + i;
			Long amount = 1l + i;

			Revenue revenue = new Revenue(description, amount, true, new Date(), user);
			entityManager.persist(revenue);
			entityManager.flush();
		}
	}

	@Test
	void testCountByUserIdAndSearch() {
		// Arrage
		User user = persistUser(new User("user", "user@email.com", "password"));
		persistRevenues(5, user);

		User otherUser = persistUser(new User("otheruser", "otheruser@email.com", "password"));
		persistRevenues(3, otherUser);

		String search = "description 1";

		// Act
		Long count = revenuesRepository.countByUserIdAndSearch(user.getId(), search);

		// Assert
		assertNotNull(count);
		assertEquals(count, 1);
	}

	@Test
	void testDeleteByIdAndUserId() {
		// Arrange
		User user = persistUser(new User("user", "user@email.com", "password"));
		Revenue revenue = persistRevenue(new Revenue("description", 100L, true, new Date(), user));

		// Act
		revenuesRepository.deleteByIdAndUserId(revenue.getId(), user.getId());

		// Assert
		assertNull(entityManager.find(Revenue.class, revenue.getId()));
	}

	private Revenue persistRevenue(Revenue revenue) {
		Revenue revenuePersisted = entityManager.persist(revenue);
		entityManager.flush();

		return revenuePersisted;
	}

	@Test
	void testFindAllByUserId() {
		// Arrage
		User user = persistUser(new User("user", "user@email.com", "password"));
		persistRevenues(5, user);

		User otherUser = persistUser(new User("otheruser", "otheruser@email.com", "password"));
		persistRevenues(3, otherUser);

		// Act
		List<Revenue> revenues = revenuesRepository.findAllByUserId(user.getId());

		// Assert
		assertNotNull(revenues);
		assertEquals(revenues.size(), 5);
	}

	@Test
	void testFindAllByUserId_WhithPagination() {
		// Arrage
		User user = persistUser(new User("user", "user@email.com", "password"));
		persistRevenues(5, user);

		User otherUser = persistUser(new User("otheruser", "otheruser@email.com", "password"));
		persistRevenues(3, otherUser);

		Pageable pageable = PageRequest.of(0, 2);

		// Act
		List<Revenue> revenues = revenuesRepository.findAllByUserId(user.getId(), pageable);

		// Assert
		assertNotNull(revenues);
		assertEquals(revenues.size(), 2);
	}

	@Test
	void testFindAllByUserIdAndMonth() throws ParseException {
		// Arrage
		User user = persistUser(new User("user", "user@email.com", "password"));
		persistRevenues(5, user);

		SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		Date persoDate = format.parse("2005/05/02 00:00:00");
		persistRevenue(new Revenue("description", 100l, true, persoDate, user));

		// Act
		List<Revenue> revenues = revenuesRepository.findAllByUserIdAndMonth(user.getId(), 5);

		// Assert
		assertNotNull(revenues);
		assertEquals(revenues.size(), 1);
	}

	@Test
	void testFindAllByUserIdAndSearch() {
		// Arrage
		User user = persistUser(new User("user", "user@email.com", "password"));
		persistRevenues(5, user);

		User otherUser = persistUser(new User("otheruser", "otheruser@email.com", "password"));
		persistRevenues(3, otherUser);

		Pageable pageable = PageRequest.of(0, 1);
		String search = "description 1";

		// Act
		List<Revenue> revenues = revenuesRepository.findAllByUserIdAndSearch(user.getId(), search, pageable);

		// Assert
		assertNotNull(revenues);
		assertEquals(revenues.size(), 1);
	}

	@Test
	void testFindAllPaidByUserId() {
		// Arrage
		User user = persistUser(new User("user", "user@email.com", "password"));
		persistRevenues(5, user);
		persistRevenue(new Revenue("description", 100L, false, null, user));

		User otherUser = persistUser(new User("otheruser", "otheruser@email.com", "password"));
		persistRevenues(3, otherUser);

		// Act
		List<Revenue> revenues = revenuesRepository.findAllPaidByUserId(user.getId());

		// Assert
		assertNotNull(revenues);
		assertEquals(revenues.size(), 5);

	}

	@Test
	void testFindByIdAndUserId() {
		// Arrage
		User user = persistUser(new User("user", "user@email.com", "password"));
		Revenue revenue = persistRevenue(new Revenue("description", 100L, false, null, user));

		User otherUser = persistUser(new User("otheruser", "otheruser@email.com", "password"));
		persistRevenues(3, otherUser);

		// Act
		Revenue revenues = revenuesRepository.findByIdAndUserId(revenue.getId(), user.getId()).orElse(null);

		// Assert
		assertNotNull(revenues);
	}
}
