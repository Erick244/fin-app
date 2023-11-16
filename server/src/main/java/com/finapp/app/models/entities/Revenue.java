package com.finapp.app.models.entities;

import java.util.Date;

import com.finapp.app.validations.messages.RevenueValidationMessages;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.AssertFalse;
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

	@NotNull(message = RevenueValidationMessages.VALUE_NOT_NULL)
	@Size(min = 1, message = RevenueValidationMessages.VALUE_MIN)
	private long value;

	@NotNull(message = RevenueValidationMessages.IS_PAID_NOT_NULL)
	private boolean isPaid;

	@NotNull(message = RevenueValidationMessages.TRANSACTION_DATE_REQUIRED)
	private Date transactionDate;

	@AssertFalse(message = RevenueValidationMessages.TRANSACTION_DATE_REQUIRED)
	private boolean transactionDateValidation() {
		return isPaid && transactionDate != null;
	}

	@ManyToOne()
	private User user;

	public Revenue() {

	}

	public Revenue(String description, long value, boolean isPaid, Date transactionDate, User user) {
		this.description = description;
		this.value = value;
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

	public long getValue() {
		return value;
	}

	public void setValue(long value) {
		this.value = value;
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
