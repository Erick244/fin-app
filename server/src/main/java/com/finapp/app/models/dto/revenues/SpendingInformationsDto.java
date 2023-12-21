package com.finapp.app.models.dto.revenues;

public record SpendingInformationsDto(Long biggestMonthRevenue, Long biggestLatestMonthRevenue, Long totalMonthRevenue,
		Long totalLatestMonthRevenue, Long averageSpending,
		Long totalRevenues) {

}
