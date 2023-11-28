package com.finapp.app.validations.messages;

public class RevenueValidationMessages {

	public static final String DESCRIPTION_NOT_NULL = "The description must not be null";
	public static final String DESCRIPTION_SIZE = "The description must be between 3 and 150 characters";

	public static final String AMOUNT_NOT_NULL = "The value must not be null";
	public static final String AMOUNT_MIN = "The value must be greater than $0";

	public static final String IS_PAID_NOT_NULL = "The paiding status must not be null";

	public static final String TRANSACTION_DATE_REQUIRED = "The transaction date is required if the revenue is paid";
	public static final String TRANSACTION_DATE_NOT_REQUIRED = "Only the date of the transaction is required when the revenue is paid";

}
