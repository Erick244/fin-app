package com.finapp.app.models.dto.auth;

import com.finapp.app.models.entities.User;

public record LoginResponseDto(User user, String jwtToken) {

	@Override
	public String toString() {
		return "LoginResponseDto [" + "{" + user.toString() + "}," + "{" + jwtToken + "}" + "]";
	}
}
