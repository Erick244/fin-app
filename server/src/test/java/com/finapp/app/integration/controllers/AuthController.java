package com.finapp.app.integration.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.finapp.app.models.dto.auth.SignUpDto;
import com.finapp.app.services.AuthService;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class AuthController {

	@MockBean
	private AuthService authService;

	@Autowired
	private TestRestTemplate restTemplate;

	@Test
	public void auth_signUp() {
		SignUpDto signUpDto = new SignUpDto("name", "email@dev.com", "12345678", "12345678");

		when(this.authService.signUp(signUpDto))
				.thenReturn(ResponseEntity.noContent().build());

		ResponseEntity<?> response = this.restTemplate.postForEntity("/auth/signup", signUpDto, ResponseEntity.class);

		assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
	}
}
