package com.finapp.app.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Date;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.finapp.app.models.dto.revenues.CreateRevenueDto;
import com.finapp.app.models.entities.Revenue;
import com.finapp.app.models.repositories.RevenuesRepository;
import com.finapp.app.validations.messages.RevenueValidationMessages;

import jakarta.validation.ConstraintViolationException;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class RevenuesServiceTest {

	@Autowired
	private RevenuesService revenuesService;

	@MockBean
	private RevenuesRepository revenuesRepository;

	@MockBean
	private UsersService usersService;

	@MockBean
	private ValidationsService validationsService;

	@Test
	public void create_ValidWhithTransactionDate() {
		CreateRevenueDto createRevenueDto = new CreateRevenueDto("description", 123L, true, new Date());

		ResponseEntity<?> response = this.revenuesService.create(createRevenueDto);

		assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
	}

	@Test
	public void create_ValidWithoutTransactionDate() {
		CreateRevenueDto createRevenueDto = new CreateRevenueDto("description", 123L, false, null);

		ResponseEntity<?> response = this.revenuesService.create(createRevenueDto);

		assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
	}

	@Test
	public void create_ViolationException_DescriptionIsNull() {
		CreateRevenueDto createRevenueDto = new CreateRevenueDto(null, 123L, false, null);

		performInViolationException(RevenueValidationMessages.DESCRIPTION_NOT_NULL);

		ResponseEntity<?> response = this.revenuesService.create(createRevenueDto);

		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
		assertEquals(RevenueValidationMessages.DESCRIPTION_NOT_NULL, response.getBody());
	}

	private void performInViolationException(String violationMessage) {
		
		when(this.revenuesRepository.save(any(Revenue.class)))
				.thenThrow(ConstraintViolationException.class);
		when(this.validationsService.extractMessageFromConstraintViolationException(any(ConstraintViolationException.class)))
				.thenReturn(violationMessage);
	}

	@Test
	public void create_ViolationException_DescriptionSize() {
		CreateRevenueDto createRevenueDto = new CreateRevenueDto("d", 123L, false, null);

		performInViolationException(RevenueValidationMessages.DESCRIPTION_SIZE);

		ResponseEntity<?> response = this.revenuesService.create(createRevenueDto);

		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
		assertEquals(RevenueValidationMessages.DESCRIPTION_SIZE, response.getBody());
	}

	@Test
	public void create_ViolationException_ValueNull() {
		CreateRevenueDto createRevenueDto = new CreateRevenueDto("description", null, false, null);

		performInViolationException(RevenueValidationMessages.VALUE_NOT_NULL);

		ResponseEntity<?> response = this.revenuesService.create(createRevenueDto);

		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
		assertEquals(RevenueValidationMessages.VALUE_NOT_NULL, response.getBody());
	}

	@Test
	public void create_ViolationException_ValueMin() {
		CreateRevenueDto createRevenueDto = new CreateRevenueDto("description", 0L, false, null);

		performInViolationException(RevenueValidationMessages.VALUE_MIN);

		ResponseEntity<?> response = this.revenuesService.create(createRevenueDto);

		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
		assertEquals(RevenueValidationMessages.VALUE_MIN, response.getBody());
	}

	@Test
	public void create_ViolationException_NegativeValue() {
		CreateRevenueDto createRevenueDto = new CreateRevenueDto("description", -123L, false, null);

		performInViolationException(RevenueValidationMessages.VALUE_MIN);

		ResponseEntity<?> response = this.revenuesService.create(createRevenueDto);

		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
		assertEquals(RevenueValidationMessages.VALUE_MIN, response.getBody());
	}

	@Test
	public void create_ViolationException_IsPaidNull() {
		CreateRevenueDto createRevenueDto = new CreateRevenueDto("description", 123L, null, null);

		performInViolationException(RevenueValidationMessages.IS_PAID_NOT_NULL);

		ResponseEntity<?> response = this.revenuesService.create(createRevenueDto);

		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
		assertEquals(RevenueValidationMessages.IS_PAID_NOT_NULL, response.getBody());
	}

	@Test
	public void create_ViolationException_IsPaidButNoTransactionDate() {
		CreateRevenueDto createRevenueDto = new CreateRevenueDto("description", 123L, true, null);

		performInViolationException(RevenueValidationMessages.TRANSACTION_DATE_REQUIRED);

		ResponseEntity<?> response = this.revenuesService.create(createRevenueDto);

		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
		assertEquals(RevenueValidationMessages.TRANSACTION_DATE_REQUIRED, response.getBody());
	}

	@Test
	public void create_ViolationException_isNotPaidButButHaveTransactionDate() {
		CreateRevenueDto createRevenueDto = new CreateRevenueDto("description", 123L, false, new Date());

		performInViolationException(RevenueValidationMessages.TRANSACTION_DATE_NOT_REQUIRED);

		ResponseEntity<?> response = this.revenuesService.create(createRevenueDto);

		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
		assertEquals(RevenueValidationMessages.TRANSACTION_DATE_NOT_REQUIRED, response.getBody());
	}
}
