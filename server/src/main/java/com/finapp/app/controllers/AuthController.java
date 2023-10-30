package com.finapp.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finapp.app.models.dto.auth.SignInDto;
import com.finapp.app.models.dto.auth.SignUpDto;
import com.finapp.app.services.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private AuthService authService;

	@PostMapping("/signup")
	public ResponseEntity<?> signUp(@RequestBody SignUpDto signUpDto) {
		return this.authService.signUp(signUpDto);
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody SignInDto signInDto) {
		return this.authService.signIn(signInDto);
	}
}
