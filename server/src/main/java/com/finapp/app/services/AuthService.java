package com.finapp.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.finapp.app.models.dto.auth.SignUpDto;
import com.finapp.app.models.entities.User;
import com.finapp.app.models.repositories.UsersRepository;

import jakarta.validation.ConstraintViolationException;

@Service
public class AuthService {
	@Autowired
	private UsersRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private ValidationsService validationsService;

	public ResponseEntity<?> signUp(SignUpDto signUpDto) {
		try {
			String email = signUpDto.email();
			if (emailAlreadyRegistered(email)) {
				return ResponseEntity.badRequest().body("E-mail already registered");
			}

			String password = signUpDto.password();
			String confirmPassword = signUpDto.confirmPassword();
			if (passwordsDoNotMatch(password, confirmPassword)) {
				return ResponseEntity.badRequest().body("Passwords do not match");
			}

			String encryptedPassword = passwordEncoder.encode(password);
			String name = signUpDto.name();

			User newUser = new User(name, email, encryptedPassword);
			this.userRepository.save(newUser);

			return ResponseEntity.noContent().build();
		} catch (ConstraintViolationException e) {
			String validationMessage = this.validationsService.extractMessageFromConstraintViolationException(e);

			return ResponseEntity.badRequest().body(validationMessage);
		}
	}

	private boolean emailAlreadyRegistered(String email) {
		boolean emailAlreadyRegistered = this.userRepository.findByEmail(email) != null;

		return emailAlreadyRegistered;
	}

	private boolean passwordsDoNotMatch(String password, String confirmPassword) {
		if (password == null || confirmPassword == null) {
			return false;
		}

		boolean thePasswordsDontsMatch = !password.equals(confirmPassword);

		return thePasswordsDontsMatch;
	}
}
