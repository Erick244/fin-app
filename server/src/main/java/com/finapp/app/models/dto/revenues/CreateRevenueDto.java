package com.finapp.app.models.dto.revenues;

import java.util.Date;

public record CreateRevenueDto(String description, Long amount, Boolean isPaid, Date transactionDate) {

}
