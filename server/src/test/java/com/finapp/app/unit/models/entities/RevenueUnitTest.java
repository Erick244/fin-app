package com.finapp.app.unit.models.entities;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Date;

import org.junit.jupiter.api.Test;

import com.finapp.app.models.entities.Revenue;
import com.finapp.app.models.entities.User;

public class RevenueUnitTest {

	@Test
	void testRevenueCreate() {
		// Arrange & Act
		Revenue revenue = new Revenue("description", 100L, true, new Date(), new User());

		// Assert
		assertNotNull(revenue);
	}

	@Test
	void testIsNotPaidButHaveTransactionDate_True() {
		// Arrange
		Revenue revenue = new Revenue("description", 100L, false, new Date(), new User());

		// Act
		boolean isNotPaidButHaveTransactionDate = revenue.isNotPaidButHaveTransactionDate();

		// Assert
		assertTrue(isNotPaidButHaveTransactionDate);
	}

	@Test
	void testIsNotPaidButHaveTransactionDate_FalseWhithIsPaidNull() {
		// Arrange
		Revenue revenue = new Revenue("description", 100L, null, new Date(), new User());

		// Act
		boolean isNotPaidButHaveTransactionDate = revenue.isNotPaidButHaveTransactionDate();

		// Assert
		assertFalse(isNotPaidButHaveTransactionDate);
	}

	@Test
	void testIsNotPaidButHaveTransactionDate_FalseWhithIsPaidAndDate() {
		// Arrange
		Revenue revenue = new Revenue("description", 100L, true, new Date(), new User());

		// Act
		boolean isNotPaidButHaveTransactionDate = revenue.isNotPaidButHaveTransactionDate();

		// Assert
		assertFalse(isNotPaidButHaveTransactionDate);
	}

	@Test
	void testIsNotPaidButHaveTransactionDate_FalseWhithDateNull() {
		// Arrange
		Revenue revenue = new Revenue("description", 100L, true, null, new User());

		// Act
		boolean isNotPaidButHaveTransactionDate = revenue.isNotPaidButHaveTransactionDate();

		// Assert
		assertFalse(isNotPaidButHaveTransactionDate);
	}

	@Test
	void testIsPaidButNoTransactionDate_True() {
		// Arrange
		Revenue revenue = new Revenue("description", 100L, true, null, new User());

		// Act
		boolean isPaidButNoTransactionDate = revenue.isPaidButNoTransactionDate();

		// Assert
		assertTrue(isPaidButNoTransactionDate);
	}

	@Test
	void testIsPaidButNoTransactionDate_FalseWhithIsPaidNull() {
		// Arrange
		Revenue revenue = new Revenue("description", 100L, null, null, new User());

		// Act
		boolean isPaidButNoTransactionDate = revenue.isPaidButNoTransactionDate();

		// Assert
		assertFalse(isPaidButNoTransactionDate);
	}

	@Test
	void testIsPaidButNoTransactionDate_FalseWhithNotIsPaid() {
		// Arrange
		Revenue revenue = new Revenue("description", 100L, false, new Date(), new User());

		// Act
		boolean isPaidButNoTransactionDate = revenue.isPaidButNoTransactionDate();

		// Assert
		assertFalse(isPaidButNoTransactionDate);
	}

	@Test
	void testIsPaidButNoTransactionDate_FalseWhithDate() {
		// Arrange
		Revenue revenue = new Revenue("description", 100L, true, new Date(), new User());

		// Act
		boolean isPaidButNoTransactionDate = revenue.isPaidButNoTransactionDate();

		// Assert
		assertFalse(isPaidButNoTransactionDate);
	}

	@Test
	void testIsPaidButNoTransactionDate_FalseWhithNoDateAndNoIsPaid() {
		// Arrange
		Revenue revenue = new Revenue("description", 100L, false, null, new User());

		// Act
		boolean isPaidButNoTransactionDate = revenue.isPaidButNoTransactionDate();

		// Assert
		assertFalse(isPaidButNoTransactionDate);
	}
}
