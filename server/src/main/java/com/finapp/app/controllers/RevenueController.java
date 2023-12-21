package com.finapp.app.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.finapp.app.models.dto.revenues.CreateRevenueDto;
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
	public ResponseEntity<?> findAll(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "5") int take,
			@RequestParam(required = false) String query) {

		if (haveQuery(query)) {
			return this.revenuesService.findAllBySearch(query, page, take);
		} else {
			return this.revenuesService.findAll(page, take);
		}
	}

	private Boolean haveQuery(String query) {
		return query != null && !query.isEmpty();
	}

	@GetMapping("/sevenMonthsChart")
	public ResponseEntity<?> sevenMonthsChart() {
		return this.revenuesService.sevenMonthsChart();
	}

	@GetMapping("/findById/{revenueId}")
	public ResponseEntity<?> findById(@PathVariable int revenueId) {
		return this.revenuesService.findById(revenueId);
	}

	@PatchMapping("/edit/{revenueId}")
	public ResponseEntity<?> edit(@PathVariable int revenueId,
			@RequestBody Optional<CreateRevenueDto> editRevenueDtoOpt) {
		return this.revenuesService.edit(revenueId, editRevenueDtoOpt);
	}

	@DeleteMapping("/delete/{revenueId}")
	public ResponseEntity<?> delete(@PathVariable int revenueId) {
		return this.revenuesService.delete(revenueId);
	}

	@GetMapping("/spendingInformations")
	public ResponseEntity<?> spendingInformations() {
		return this.revenuesService.spendingInformations();
	}

	@GetMapping("/count")
	public ResponseEntity<?> count(@RequestParam(required = false) String query) {

		if (haveQuery(query)) {
			return this.revenuesService.countBySearch(query);
		} else {
			return this.revenuesService.count();
		}
	}
}
