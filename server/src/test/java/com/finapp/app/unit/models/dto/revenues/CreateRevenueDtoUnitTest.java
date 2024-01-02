package com.finapp.app.unit.models.dto.revenues;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Date;

import org.junit.jupiter.api.Test;

import com.finapp.app.models.dto.revenues.CreateRevenueDto;

public class CreateRevenueDtoUnitTest {

	@Test
	void testCreateRevenueDtoCreate() {
		// Arrange
		String description = "description";
		Long amount = 100L;
		Boolean isPaid = true;
		Date transactionDate = new Date();

		// Act
		CreateRevenueDto createRevenueDto = new CreateRevenueDto(description, amount, isPaid, transactionDate);

		// Assert
		assertNotNull(createRevenueDto);
		assertEquals(createRevenueDto.description(), description);
		assertEquals(createRevenueDto.amount(), amount);
		assertEquals(createRevenueDto.isPaid(), isPaid);
		assertEquals(createRevenueDto.transactionDate(), transactionDate);
	}
}
