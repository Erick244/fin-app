package com.finapp.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finapp.app.models.dto.revenues.CreateRevenueDto;
import com.finapp.app.services.RevenuesService;

@RestController
@RequestMapping("/revenue")
public class RevenueController {

	@Autowired
	private RevenuesService revenuesService;

	@PostMapping
	public ResponseEntity<?> create(@RequestBody CreateRevenueDto createRevenueDto) {
		return this.revenuesService.create(createRevenueDto);
	}
}
