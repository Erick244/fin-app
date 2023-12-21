package com.finapp.app.services;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionSystemException;

import com.finapp.app.models.dto.revenues.ChartMonthDto;
import com.finapp.app.models.dto.revenues.CreateRevenueDto;
import com.finapp.app.models.dto.revenues.SpendingInformationsDto;
import com.finapp.app.models.entities.Revenue;
import com.finapp.app.models.entities.User;
import com.finapp.app.models.repositories.RevenuesRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;

@Service
public class RevenuesService {

	@Autowired
	private UsersService usersService;

	@Autowired
	private RevenuesRepository revenuesRepository;

	@Autowired
	private ValidationsService validationsService;

	@Autowired
	private MonthService monthService;

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

	public ResponseEntity<List<Revenue>> findAll(int page, int take) {
		Pageable pageable = createPageable(page, take);
		List<Revenue> revenues = this.revenuesRepository.findAllByUserId(getUserAuthId(), pageable);

		return ResponseEntity.ok().body(revenues);

	}

	private Pageable createPageable(int page, int take) {
		if (isInvalidPageableValues(page, take)) {
			page = 0;
			take = 5;
		}

		return PageRequest.of(page, take);
	}

	private Boolean isInvalidPageableValues(Integer page, Integer take) {
		Boolean invalidPageValue = page < 0 || page == null;
		Boolean invalidTakeValue = take < 0 || take == null;
		Boolean emptyValues = take == 0 && page == 0;

		return invalidPageValue || invalidTakeValue || emptyValues;
	}

	private Integer getUserAuthId() {
		return this.usersService.getUserAuth().getId();
	}

	public ResponseEntity<?> findById(int revenueId) {
		Revenue revenue = this.revenuesRepository.findByIdAndUserId(revenueId, getUserAuthId()).orElse(null);

		if (revenue != null) {
			return ResponseEntity.ok().body(revenue);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	public ResponseEntity<?> edit(int revenueId, Optional<CreateRevenueDto> editRevenueDtoOpt) {
		if (editRevenueDtoOpt.isEmpty()) {
			return ResponseEntity.noContent().build();
		}

		try {
			Revenue revenue = this.revenuesRepository.findByIdAndUserId(revenueId, getUserAuthId()).orElse(null);

			if (revenue == null) {
				return ResponseEntity.notFound().build();
			}

			Revenue revenueUpdated = updateRevenueByRevenueDto(revenue, editRevenueDtoOpt.get());

			this.revenuesRepository.save(revenueUpdated);
			return ResponseEntity.noContent().build();
		} catch (TransactionSystemException e) {
			ConstraintViolationException rootCause = (ConstraintViolationException) e.getRootCause();

			String violationMessage = this.validationsService
					.extractMessageFromConstraintViolationException(rootCause);
			return ResponseEntity.badRequest().body(violationMessage);
		}
	}

	private Revenue updateRevenueByRevenueDto(Revenue revenue, CreateRevenueDto revenueDto) {
		Boolean isPaid = revenueDto.isPaid();
		if (isPaid != null) {
			revenue.setIsPaid(isPaid);

			Date transactionDate = revenueDto.transactionDate();
			revenue.setTransactionDate(transactionDate);
		}

		Long amount = revenueDto.amount();
		revenue.setAmount(amount != null ? amount : revenue.getAmount());

		String description = revenueDto.description();
		revenue.setDescription(description != null ? description : revenue.getDescription());

		return revenue;
	}

	public ResponseEntity<?> sevenMonthsChart() {
		try {
			int currentMonth = this.monthService.getCurrentMonth();
			Integer[] sevenMonths = getSevenMonths(currentMonth);

			List<ChartMonthDto> sevenMonthsChart = new ArrayList<>();
			for (Integer month : sevenMonths) {
				List<Revenue> monthRevenues = this.revenuesRepository.findAllByUserIdAndMonth(getUserAuthId(), month);

				Revenue revenueLower = monthRevenues.stream()
						.min(revenueAmountComparator)
						.orElse(null);

				Revenue revenueBigger = monthRevenues.stream()
						.max(revenueAmountComparator)
						.orElse(null);

				String monthName = this.monthService.getMonthName(month);
				ChartMonthDto chartMonthDto = validAndCreateCharMonthDto(monthName, revenueBigger, revenueLower);

				sevenMonthsChart.add(chartMonthDto);
			}

			return ResponseEntity.ok().body(sevenMonthsChart);
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}

	private Integer[] getSevenMonths(int currentMonth) {
		Integer[] sevenMonths = new Integer[7];

		int threeMonths = 3;
		int twoMonths = 2;
		int oneMonth = 1;

		sevenMonths[0] = this.monthService.getPreviousMonth(currentMonth, threeMonths);
		sevenMonths[1] = this.monthService.getPreviousMonth(currentMonth, twoMonths);
		sevenMonths[2] = this.monthService.getPreviousMonth(currentMonth, oneMonth);
		sevenMonths[3] = currentMonth;
		sevenMonths[4] = this.monthService.getNextMonth(currentMonth, oneMonth);
		sevenMonths[5] = this.monthService.getNextMonth(currentMonth, twoMonths);
		sevenMonths[6] = this.monthService.getNextMonth(currentMonth, threeMonths);

		return sevenMonths;
	}

	private Comparator<Revenue> revenueAmountComparator = (revenue1, revenue2) -> {
		if (revenue1 != null && revenue2 != null) {
			return Long.compare(revenue1.getAmount(), revenue2.getAmount());
		} else {
			return 0;
		}
	};

	private ChartMonthDto validAndCreateCharMonthDto(String monthName, Revenue revenueBigger, Revenue revenueLower) {

		if (revenueBigger != null && revenueLower != null) {
			return new ChartMonthDto(monthName, revenueBigger.getAmount(), revenueLower.getAmount());
		}

		return new ChartMonthDto(monthName, 0L, 0L);
	}

	@Transactional
	public ResponseEntity<?> delete(int revenueId) {
		try {
			this.revenuesRepository.deleteByIdAndUserId(revenueId, getUserAuthId());

			return ResponseEntity.ok().build();
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	public ResponseEntity<?> spendingInformations() {
		try {
			int currentMonth = this.monthService.getCurrentMonth();
			int latestMouth = this.monthService.getPreviousMonth(currentMonth, 1);

			SpendingInformationsDto dto = new SpendingInformationsDto(
					getBiggestMonthRevenue(currentMonth),
					getBiggestMonthRevenue(latestMouth),
					getTotalMonthRevenue(currentMonth),
					getTotalMonthRevenue(latestMouth),
					getAvaregeSpendingPerMounth(),
					getTotalRevenuesAmount());

			return ResponseEntity.ok().body(dto);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	private Long getBiggestMonthRevenue(int month) {

		List<Revenue> monthRevenues = getMonthRevenues(month);

		Revenue biggerRevenue = monthRevenues.stream().max(revenueAmountComparator).orElse(null);

		if (biggerRevenue == null)
			return 0L;

		return biggerRevenue.getAmount();

	}

	private List<Revenue> getMonthRevenues(int month) {

		return this.revenuesRepository.findAllByUserIdAndMonth(getUserAuthId(),
				month);
	}

	private Long getTotalMonthRevenue(int month) {
		List<Revenue> monthRevenues = getMonthRevenues(month);

		Long totalMonthRevenue = monthRevenues.stream().reduce(0l,
				(acumulator, revenue) -> acumulator + revenue.getAmount(), Long::sum);

		if (totalMonthRevenue == null)
			return 0L;

		return totalMonthRevenue;

	}

	private Long getAvaregeSpendingPerMounth() {
		Long totalRevenuesAmount = getTotalRevenuesAmount();

		Long averageSpending = totalRevenuesAmount / 12;

		return averageSpending;

	}

	private Long getTotalRevenuesAmount() {
		List<Revenue> revenues = this.revenuesRepository.findAllPaidByUserId(getUserAuthId());

		return revenues.stream().reduce(0l, (acumulator, revenue) -> acumulator + revenue.getAmount(), Long::sum);
	}

	public ResponseEntity<?> countBySearch(String search) {
		try {
			Long count = this.revenuesRepository.countByUserIdAndSearch(getUserAuthId(), search);

			return ResponseEntity.ok().body(count);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	public ResponseEntity<?> count() {
		try {
			Long count = this.revenuesRepository.countByUserId(getUserAuthId());

			return ResponseEntity.ok().body(count);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	public ResponseEntity<List<Revenue>> findAllBySearch(String search, int page, int take) {
		try {
			Pageable pageable = createPageable(page, take);
			List<Revenue> revenues = this.revenuesRepository.findAllByUserIdAndSearch(getUserAuthId(), search,
					pageable);

			return ResponseEntity.ok().body(revenues);
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}

}
