package com.finapp.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.finapp.app.models.dto.revenues.CreateRevenueDto;
import com.finapp.app.models.entities.Revenue;
import com.finapp.app.services.RevenuesService;

@RestController
@RequestMapping("/revenues")
public class RevenueController {

	@Autowired
	private RevenuesService revenuesService;

	@PostMapping
	public ResponseEntity<?> create(@RequestBody CreateRevenueDto createRevenueDto) {
		return this.revenuesService.create(createRevenueDto);
	}

	@GetMapping
	public ResponseEntity<Iterable<Revenue>> findAll(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "5") int take) {
		return this.revenuesService.findAll(page, take);
	}

	@GetMapping("/sevenMouthChart")
	public ResponseEntity<?> sevenMouthChart() {
		return this.revenuesService.sevenMouthsChart();
	}

	@GetMapping("/abc")
	public String abc() {
		return "ABC";
	}
}
