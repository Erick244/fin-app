package com.finapp.app.services;

import org.springframework.stereotype.Service;

import jakarta.validation.ConstraintViolationException;

@Service
public class ValidationsService {

	public String extractMessageFromConstraintViolationException(ConstraintViolationException e) {
		return e.getConstraintViolations().stream().findFirst().get().getMessage();
	}
}
