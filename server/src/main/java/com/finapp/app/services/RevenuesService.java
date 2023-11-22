package com.finapp.app.services;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
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
			Long value = createRevenueDto.value();

			User userAuth = this.usersService.getUserAuth();
			Revenue revenue = new Revenue(description, value, isPaid, transactionDate, userAuth);
			this.revenuesRepository.save(revenue);

			return ResponseEntity.noContent().build();
		} catch (ConstraintViolationException e) {
			String violationMessage = this.validationsService.extractMessageFromConstraintViolationException(e);

			return ResponseEntity.badRequest().body(violationMessage);
		}

	}
}
