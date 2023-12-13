package com.finapp.app.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionSystemException;

import com.finapp.app.models.dto.revenues.ChartMonthDto;
import com.finapp.app.models.dto.revenues.CreateRevenueDto;
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

	public ResponseEntity<Iterable<Revenue>> findAll(int page, int take) {
		if (isInvalidPageableValues(page, take)) {
			page = 0;
			take = 5;
		}

		int userAuthId = this.usersService.getUserAuth().getId();
		Pageable pageable = PageRequest.of(page, take);

		Iterable<Revenue> revenues = this.revenuesRepository.findAllByUserId(userAuthId, pageable);

		return ResponseEntity.ok().body(revenues);

	}

	private Boolean isInvalidPageableValues(Integer page, Integer take) {
		Boolean invalidPageValue = page < 0 || page == null;
		Boolean invalidTakeValue = take < 0 || take == null;
		Boolean emptyValues = take == 0 && page == 0;

		return invalidPageValue || invalidTakeValue || emptyValues;
	}

	public ResponseEntity<?> findById(int revenueId) {
		int userAuthId = this.usersService.getUserAuth().getId();
		Revenue revenue = this.revenuesRepository.findByIdAndUserId(revenueId, userAuthId).orElse(null);

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
			int userAuthId = this.usersService.getUserAuth().getId();
			Revenue revenue = this.revenuesRepository.findByIdAndUserId(revenueId, userAuthId).orElse(null);

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
			int currentMonth = this.monthService.getCurrentMouth();
			Integer[] sevenMouths = getSevenMonths(currentMonth);

			List<ChartMonthDto> sevenMonthsChart = new ArrayList<>();
			for (Integer mouth : sevenMouths) {
				int userAuthId = this.usersService.getUserAuth().getId();

				List<Revenue> monthRevenues = this.revenuesRepository.findAllByUserIdAndMouth(userAuthId, mouth);

				Revenue revenueLower = monthRevenues.stream()
						.min(revenueAmountComparator)
						.orElse(null);

				Revenue revenueBigger = monthRevenues.stream()
						.max(revenueAmountComparator)
						.orElse(null);

				String mouthName = this.monthService.getMouthName(mouth);
				ChartMonthDto chartMonthDto = validAndCreateCharMonthDto(mouthName, revenueBigger, revenueLower);

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

		sevenMonths[0] = this.monthService.getPreviousMouth(currentMonth, threeMonths);
		sevenMonths[1] = this.monthService.getPreviousMouth(currentMonth, twoMonths);
		sevenMonths[2] = this.monthService.getPreviousMouth(currentMonth, oneMonth);
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

	private ChartMonthDto validAndCreateCharMonthDto(String mouthName, Revenue revenueBigger, Revenue revenueLower) {

		if (revenueBigger != null && revenueLower != null) {
			return new ChartMonthDto(mouthName, revenueBigger.getAmount(), revenueLower.getAmount());
		}

		return new ChartMonthDto(mouthName, 0L, 0L);
	}

	@Transactional
	public ResponseEntity<?> delete(int revenueId) {
		try {
			int userAuthId = this.usersService.getUserAuth().getId();
			this.revenuesRepository.deleteByIdAndUserId(revenueId, userAuthId);

			return ResponseEntity.ok().build();
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	public ResponseEntity<?> biggestMonthRevenue() {
		try {
			List<Revenue> currentMouthRevenues = getCurrentMouthRevenues();

			Revenue biggerRevenue = currentMouthRevenues.stream().max(revenueAmountComparator).orElse(null);

			if (biggerRevenue == null) {
				return ResponseEntity.notFound().build();
			}

			Map<String, Long> biggestMonthRevenueDto = Collections.singletonMap("biggestMonthRevenue",
					biggerRevenue.getAmount());

			return ResponseEntity.ok().body(biggestMonthRevenueDto);

		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	private List<Revenue> getCurrentMouthRevenues() {
		int userAuthId = this.usersService.getUserAuth().getId();
		int currentMonth = this.monthService.getCurrentMouth();

		return this.revenuesRepository.findAllByUserIdAndMouth(userAuthId,
				currentMonth);
	}

	public ResponseEntity<?> totalMonthRevenue() {
		try {
			List<Revenue> currentMouthRevenues = getCurrentMouthRevenues();

			Long totalMonthRevenue = currentMouthRevenues.stream().reduce(0l,
					(acumulator, revenue) -> acumulator + revenue.getAmount(), Long::sum);

			if (totalMonthRevenue == null) {
				return ResponseEntity.notFound().build();
			}

			Map<String, Long> totalMonthRevenueDto = Collections.singletonMap("totalMonthRevenue",
					totalMonthRevenue);

			return ResponseEntity.ok().body(totalMonthRevenueDto);

		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

}
