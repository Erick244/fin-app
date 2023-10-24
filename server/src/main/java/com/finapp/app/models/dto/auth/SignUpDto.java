package com.finapp.app.models.dto.auth;

public record SignUpDto(String name, String email, String password, String confirmPassword) {
}
