package com.finapp.app.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finapp.app.models.dto.auth.SignInDto;
import com.finapp.app.models.dto.auth.SignUpDto;
import com.finapp.app.services.AuthService;
import com.finapp.app.services.EmailsService;

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

	@GetMapping("/userByToken/{token}")
	public ResponseEntity<?> userByToken(@PathVariable String token) {
		return this.authService.userByToken(token);
	}

	@Autowired
	private EmailsService emailsService;

	@GetMapping("/email")
	public void sendEmail() {
		try {
			this.emailsService.sendCodeEmail("erickcontato012@gmail.com", 99812);
		} catch (Exception e) {
			System.out.println(e);
		}
	}

	@GetMapping
	public Map<String, Object> local(OAuth2AuthenticationToken auth2AuthenticationToken) {
		return auth2AuthenticationToken.getPrincipal().getAttributes();
	}
}
