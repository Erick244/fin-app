package com.finapp.app.models.entities;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.finapp.app.validations.messages.RevenueValidationMessages;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.AssertFalse;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity(name = "revenues")
public class Revenue {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@NotNull(message = RevenueValidationMessages.DESCRIPTION_NOT_NULL)
	@Size(min = 3, max = 150, message = RevenueValidationMessages.DESCRIPTION_SIZE)
	private String description;

	@NotNull(message = RevenueValidationMessages.AMOUNT_NOT_NULL)
	@Min(value = 1, message = RevenueValidationMessages.AMOUNT_MIN)
	private Long amount;

	@NotNull(message = RevenueValidationMessages.IS_PAID_NOT_NULL)
	private Boolean isPaid;

	private Date transactionDate;

	@AssertFalse(message = RevenueValidationMessages.TRANSACTION_DATE_REQUIRED)
	private boolean isPaidButNoTransactionDate() {
		if (isPaid == null)
			return false;

		return isPaid && transactionDate == null;
	}

	@AssertFalse(message = RevenueValidationMessages.TRANSACTION_DATE_NOT_REQUIRED)
	private boolean isNotPaidButHaveTransactionDate() {
		if (isPaid == null)
			return false;

		return !isPaid && transactionDate != null;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	private User user;

	public Revenue() {

	}

	public Revenue(String description, Long amount, Boolean isPaid, Date transactionDate, User user) {
		this.description = description;
		this.amount = amount;
		this.isPaid = isPaid;
		this.transactionDate = transactionDate;
		this.user = user;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public long getAmount() {
		return amount;
	}

	public void setAmount(long amount) {
		this.amount = amount;
	}

	public boolean isPaid() {
		return isPaid;
	}

	public void setPaid(boolean isPaid) {
		this.isPaid = isPaid;
	}

	public Date getTransactionDate() {
		return transactionDate;
	}

	public void setTransactionDate(Date transactionDate) {
		this.transactionDate = transactionDate;
	}

	@JsonIgnore
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public int getId() {
		return id;
	}

}
