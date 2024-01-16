package com.finapp.app.unit.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.finapp.app.services.MonthService;

public class MonthServiceUnitTest {

	private MonthService monthService;

	@BeforeEach
	void setUp() {
		monthService = new MonthService();
	}

	@Test
	void testGetCurrentMonth() {
		// Arrage
		// Set the current month of your location
		int currentMonth = 1;

		// Act
		int currentMonthTest = monthService.getCurrentMonth();

		// Assert
		assertNotNull(currentMonthTest);
		assertEquals(currentMonth, currentMonthTest);
	}

	@Test
	void testGetMonthName() {
		// Arrage
		int monthNumber = 1;
		// Define month name based on defined month number.
		String monthName = "JANUARY";

		// Act
		String monthNameTest = monthService.getMonthName(monthNumber);

		// Assert
		assertNotNull(monthName);
		assertEquals(monthNameTest, monthNameTest.toUpperCase());
	}

	@Test
	void testGetNextMonth() {
		// Arrage
		int currentMouth = 1;
		// Sets how many months you want to get after the current month
		int monthsLater = 2;
		// Define the month that should be obtained
		int marchNumber = 3;

		// Act
		int nextMonth = monthService.getNextMonth(currentMouth, monthsLater);

		// Arrange
		assertNotNull(nextMonth);
		assertEquals(nextMonth, marchNumber);
	}

	@Test
	void testGetPreviousMonth() {
		// Arrage
		int currentMouth = 1;
		// Set how many months you want to get before the current month
		int monthsAgo = 2;
		// Define the month that should be obtained
		int novemberNumber = 11;

		// Act
		int nextMonth = monthService.getPreviousMonth(currentMouth, monthsAgo);

		// Arrange
		assertNotNull(nextMonth);
		assertEquals(nextMonth, novemberNumber);
	}
}
