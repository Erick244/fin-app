package com.finapp.app.services;

import java.text.DateFormatSymbols;
import java.util.Calendar;
import java.util.Date;

import org.springframework.stereotype.Service;

@Service
public class MonthService {

	private final int DECEMBER = 12;
	private final int JANUARY = 1;

	public Integer getCurrentMouth() {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		return calendar.get(Calendar.MONTH) + 1;
	}

	public int getPreviousMouth(int currentMonth, int monthsAgo) {
		int previousMonth = currentMonth - monthsAgo;
		return previousMonth < JANUARY ? (DECEMBER - monthsAgo) + currentMonth
				: previousMonth;
	}

	public int getNextMonth(int currentMonth, int monthsLater) {

		int nextMonth = currentMonth + monthsLater;
		return nextMonth > DECEMBER ? (monthsLater + currentMonth) - DECEMBER
				: nextMonth;
	}

	public String getMouthName(int mouthNumber) {
		String mouthName = new DateFormatSymbols().getShortMonths()[mouthNumber - 1].replace(".", "").toUpperCase();
		return mouthName;
	}
}
