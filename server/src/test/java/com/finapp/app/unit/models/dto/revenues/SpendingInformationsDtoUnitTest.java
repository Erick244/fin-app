package com.finapp.app.unit.models.dto.revenues;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;

import com.finapp.app.models.dto.revenues.SpendingInformationsDto;

public class SpendingInformationsDtoUnitTest {

	@Test
	public void testSpendingInformationsDtoCreate() {
		// Arrange
		Long biggestMonthRevenue = 100L;
		Long biggestLatestMonthRevenue = 100L;
		Long totalMonthRevenue = 100L;
		Long totalLatestMonthRevenue = 100L;
		Long averageSpending = 100L;
		Long totalRevenues = 100L;

		// Act
		SpendingInformationsDto spendingInformationsDto = new SpendingInformationsDto(biggestMonthRevenue,
				biggestLatestMonthRevenue,
				totalMonthRevenue, totalLatestMonthRevenue, averageSpending, totalRevenues);

		// Assert
		assertNotNull(spendingInformationsDto);
		assertEquals(spendingInformationsDto.averageSpending(), averageSpending);
		assertEquals(spendingInformationsDto.biggestMonthRevenue(), biggestMonthRevenue);
		assertEquals(spendingInformationsDto.biggestLatestMonthRevenue(), biggestLatestMonthRevenue);
		assertEquals(spendingInformationsDto.totalMonthRevenue(), totalMonthRevenue);
		assertEquals(spendingInformationsDto.totalLatestMonthRevenue(), totalLatestMonthRevenue);
		assertEquals(spendingInformationsDto.totalRevenues(), totalRevenues);
	}
}
