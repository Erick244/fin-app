package com.finapp.app.unit.models.dto.revenues;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;

import com.finapp.app.models.dto.revenues.ChartMonthDto;

public class ChartMonthDtoUnitTest {

	@Test
	void testChartMouthDtoCreate() {
		// Arrange
		String Month = "January";
		Long Bigger = 100L;
		Long Lower = 10L;

		// Act
		ChartMonthDto chartMonthDto = new ChartMonthDto(Month, Bigger, Lower);

		// Assert
		assertNotNull(chartMonthDto);
		assertEquals(chartMonthDto.Month(), Month);
		assertEquals(chartMonthDto.Bigger(), Bigger);
		assertEquals(chartMonthDto.Lower(), Lower);
	}
}
