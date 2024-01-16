package com.finapp.app.services;

import org.springframework.stereotype.Service;

import com.finapp.app.models.entities.User;

@Service
public class CodeService {

	private String code = "";

	private User userSave;

	public final int DEFAULT_CODE_SIZE = 6;

	public void setUserSave(User userSave) {
		this.userSave = userSave;
	}

	public User getUserSave() {
		return userSave;
	}

	public String getCode() {
		return code;
	}

	public String genCode() {
		final int MAX_RANDOM_NUMBER = 9;

		while (code.length() < DEFAULT_CODE_SIZE) {
			Integer randomNumber = (int) Math.floor(Math.random() * MAX_RANDOM_NUMBER);

			code += randomNumber.toString();
		}

		return code;
	}

	public void clean() {
		setUserSave(null);
		code = "";
	}
}
