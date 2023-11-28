package com.finapp.app.services;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.finapp.app.models.dto.revenues.CreateRevenueDto;
import com.finapp.app.models.entities.Revenue;
import com.finapp.app.models.entities.User;
import com.finapp.app.models.repositories.RevenuesRepository;

import jakarta.validation.ConstraintViolationException;

@Service
public class RevenuesService {

	@Autowired
	private UsersService usersService;

	@Autowired
	private RevenuesRepository revenuesRepository;

	@Autowired
	private ValidationsService validationsService;

	public ResponseEntity<?> create(CreateRevenueDto createRevenueDto) {
		try {
			Boolean isPaid = createRevenueDto.isPaid();
			Date transactionDate = createRevenueDto.transactionDate();
			String description = createRevenueDto.description();
			Long amount = createRevenueDto.amount();

			User userAuth = this.usersService.getUserAuth();
			Revenue revenue = new Revenue(description, amount, isPaid, transactionDate, userAuth);
			this.revenuesRepository.save(revenue);

			return ResponseEntity.noContent().build();
		} catch (ConstraintViolationException e) {
			String violationMessage = this.validationsService.extractMessageFromConstraintViolationException(e);

			return ResponseEntity.badRequest().body(violationMessage);
		}

	}

	public ResponseEntity<Iterable<Revenue>> findAll(int page, int take) {
		int userAuthId = this.usersService.getUserAuth().getId();
		Pageable pageable = PageRequest.of(page, take);

		Iterable<Revenue> revenues = this.revenuesRepository.findAllByUserId(userAuthId, pageable);

		return ResponseEntity.ok().body(revenues);

	}
}
