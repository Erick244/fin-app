package com.finapp.app.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.finapp.app.models.dto.revenues.CreateRevenueDto;
import com.finapp.app.models.entities.Revenue;
import com.finapp.app.models.entities.User;
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

		performInViolationException(RevenueValidationMessages.AMOUNT_NOT_NULL);

		ResponseEntity<?> response = this.revenuesService.create(createRevenueDto);

		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
		assertEquals(RevenueValidationMessages.AMOUNT_NOT_NULL, response.getBody());
	}

	@Test
	public void create_ViolationException_ValueMin() {
		CreateRevenueDto createRevenueDto = new CreateRevenueDto("description", 0L, false, null);

		performInViolationException(RevenueValidationMessages.AMOUNT_MIN);

		ResponseEntity<?> response = this.revenuesService.create(createRevenueDto);

		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
		assertEquals(RevenueValidationMessages.AMOUNT_MIN, response.getBody());
	}

	@Test
	public void create_ViolationException_NegativeValue() {
		CreateRevenueDto createRevenueDto = new CreateRevenueDto("description", -123L, false, null);

		performInViolationException(RevenueValidationMessages.AMOUNT_MIN);

		ResponseEntity<?> response = this.revenuesService.create(createRevenueDto);

		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
		assertEquals(RevenueValidationMessages.AMOUNT_MIN, response.getBody());
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

	@Test
	public void findAll_Valid_FirstPage() {
		int page = 0;
		int take = 5;
		List<Revenue> mockRevenues = getMockRevenuesList(take);

		performInFindAll(mockRevenues);

		ResponseEntity<Iterable<Revenue>> response = this.revenuesService.findAll(page, take);

		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(mockRevenues.size(), 5);
		assertEquals(mockRevenues, response.getBody());
	}

	private List<Revenue> getMockRevenuesList(int size) {
		List<Revenue> revenues = new ArrayList<>();

		while (revenues.size() < size) {
			revenues.add(new Revenue());
		}

		return revenues;
	}

	private void performInFindAll(List<Revenue> mockRevenues) {
		when(this.usersService.getUserAuth())
				.thenReturn(new User());
		when(this.revenuesRepository.findAllByUserId(anyInt(), any(Pageable.class)))
				.thenReturn(mockRevenues);
	}

	@Test
	public void findAll_Valid_OtherPage() {
		int page = 1;
		int take = 5;
		List<Revenue> mockRevenues = getMockRevenuesList(take);

		performInFindAll(mockRevenues);

		ResponseEntity<Iterable<Revenue>> response = this.revenuesService.findAll(page, take);

		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(mockRevenues, response.getBody());
		assertEquals(mockRevenues.size(), 5);
	}

	@Test
	public void findAll_Valid_DefaultValues() {
		int page = -1;
		int take = -1;
		List<Revenue> mockRevenues = getMockRevenuesList(5);

		performInFindAll(mockRevenues);

		ResponseEntity<Iterable<Revenue>> response = this.revenuesService.findAll(page, take);

		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(mockRevenues, response.getBody());
	}
}
