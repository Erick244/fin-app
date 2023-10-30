package com.finapp.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.finapp.app.models.dto.auth.LoginResponseDto;
import com.finapp.app.models.dto.auth.SignInDto;
import com.finapp.app.models.dto.auth.SignUpDto;
import com.finapp.app.models.entities.User;
import com.finapp.app.models.repositories.UsersRepository;

import jakarta.validation.ConstraintViolationException;

@Service
public class AuthService {
	@Autowired
	private UsersRepository usersRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private ValidationsService validationsService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtService jwtService;

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
			this.usersRepository.save(newUser);

			return ResponseEntity.noContent().build();
		} catch (ConstraintViolationException e) {
			String violationMessage = this.validationsService.extractMessageFromConstraintViolationException(e);

			return ResponseEntity.badRequest().body(violationMessage);
		}
	}

	private boolean emailAlreadyRegistered(String email) {
		boolean emailAlreadyRegistered = this.usersRepository.findByEmail(email) != null;

		return emailAlreadyRegistered;
	}

	private boolean passwordsDoNotMatch(String password, String confirmPassword) {
		if (password == null || confirmPassword == null) {
			return false;
		}

		boolean thePasswordsDontsMatch = !password.equals(confirmPassword);

		return thePasswordsDontsMatch;
	}

	public ResponseEntity<?> signIn(SignInDto signInDto) {
		try {
			String email = signInDto.email();
			String password = signInDto.password();
			Authentication authToken = new UsernamePasswordAuthenticationToken(email, password);
			Authentication auth = this.authenticationManager.authenticate(authToken);

			User userAuth = this.usersRepository.findByEmail(email);
			String jwtToken = this.jwtService.generateToken((UserDetails) auth.getPrincipal());
			return ResponseEntity.ok(new LoginResponseDto(userAuth, jwtToken));
		} catch (BadCredentialsException e) {
			String badCredentialMessage = "Non-existent user or invalid password";

			return ResponseEntity.badRequest().body(badCredentialMessage);
		}
	}
}
