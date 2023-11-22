package com.finapp.app.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.finapp.app.models.dto.auth.LoginResponseDto;
import com.finapp.app.models.dto.auth.SignInDto;
import com.finapp.app.models.dto.auth.SignUpDto;
import com.finapp.app.models.entities.User;
import com.finapp.app.models.repositories.UsersRepository;

import jakarta.validation.ConstraintViolationException;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class AuthServiceTest {

	@Autowired
	private AuthService authService = new AuthService();

	@MockBean
	private UsersRepository usersRepository;

	@MockBean
	private PasswordEncoder passwordEncoder;

	@MockBean
	private ValidationsService validationsService;

	@MockBean
	private JwtService jwtService;

	@MockBean
	private AuthenticationManager authenticationManager;

	@Test
	public void signUp_Valid() {
		SignUpDto signUpDto = new SignUpDto("name", "email@email.com", "12345678", "12345678");

		ResponseEntity<?> response = this.authService.signUp(signUpDto);

		assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
	}

	@Test
	public void signUp_EmailAlreadyRegistered() {
		SignUpDto signUpDto = new SignUpDto("name", "email@email.com", "12345678", "12345678");

		when(this.usersRepository.findByEmail(anyString()))
				.thenReturn(null)
				.thenReturn(new User());

		this.authService.signUp(signUpDto);
		ResponseEntity<?> response = this.authService.signUp(signUpDto);

		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
		assertEquals("E-mail already registered", response.getBody());
	}

	@Test
	public void signUp_PasswordsDoNotMatch() {
		SignUpDto signUpDto = new SignUpDto("name", "email@email.com", "12345678", "123456789");

		ResponseEntity<?> response = this.authService.signUp(signUpDto);

		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
		assertEquals("Passwords do not match", response.getBody());
	}

	@Test
	public void signUp_Throws_NameIsNull() {
		SignUpDto signUpDto = new SignUpDto(null, "email@email.com", "12345678", "12345678");
		String errorMessage = "The name must not be null";

		ResponseEntity<?> response = performSignUpWithConstraintViolations(signUpDto, errorMessage);

		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
		assertEquals(errorMessage, response.getBody());
	}

	private ResponseEntity<?> performSignUpWithConstraintViolations(SignUpDto signUpDto, String errorMessage) {
    	when(this.usersRepository.save(any(User.class)))
            .thenThrow(ConstraintViolationException.class);
    	when(this.validationsService
            .extractMessageFromConstraintViolationException(any(ConstraintViolationException.class)))
            .thenReturn(errorMessage);

    	return this.authService.signUp(signUpDto);
	}

	@Test
	public void signUp_Throws_NameInvalidMinSize() {
		SignUpDto signUpDto = new SignUpDto("a", "email@email.com", "12345678", "12345678");
		String errorMessage = "The name must be between 3 and 20 characters";

		ResponseEntity<?> response = performSignUpWithConstraintViolations(signUpDto, errorMessage);

		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
		assertEquals(errorMessage, response.getBody());
	}

	@Test
	public void signUp_Throws_NameInvalidMaxSize() {
		SignUpDto signUpDto = new SignUpDto("abcdefghijklmnopqrstu", "email@email.com", "12345678", "12345678");
		String errorMessage = "The name must be between 3 and 20 characters";

		ResponseEntity<?> response = performSignUpWithConstraintViolations(signUpDto, errorMessage);

		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
		assertEquals(errorMessage, response.getBody());
	}

	@Test
	public void signUp_Throws_EmailIsNull() {
		SignUpDto signUpDto = new SignUpDto("name", null, "12345678", "12345678");
		String errorMessage = "The e-mail must not be null";

		ResponseEntity<?> response = performSignUpWithConstraintViolations(signUpDto, errorMessage);

		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
		assertEquals(errorMessage, response.getBody());
	}

	@Test
	public void signUp_Throws_InvalidEmail() {
		SignUpDto signUpDto = new SignUpDto("name", "email.com", "12345678", "12345678");
		String errorMessage = "Invalid e-mail";

		ResponseEntity<?> response = performSignUpWithConstraintViolations(signUpDto, errorMessage);

		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
		assertEquals(errorMessage, response.getBody());
	}

	@Test
	public void signUp_Throws_PasswordIsNull() {
		SignUpDto signUpDto = new SignUpDto("name", "email@dev.com", null, null);
		String errorMessage = "The password must not be null";

		ResponseEntity<?> response = performSignUpWithConstraintViolations(signUpDto, errorMessage);

		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
		assertEquals(errorMessage, response.getBody());
	}

	@Test
	public void signIn_Valid() {
		String email = "email@dev.com";
		String password = "12345678";
		String name = "name";
		User mockUser = new User(name, email, password);

		SignInDto signInDto = new SignInDto(email, password);
		Authentication mockAuth = new UsernamePasswordAuthenticationToken(mockUser.userDetails(), null);
		String mockToken = "mockJwtToken";

		when(this.authenticationManager.authenticate(any(Authentication.class)))
				.thenReturn(mockAuth);
		when(this.usersRepository.findByEmail(anyString()))
				.thenReturn(mockUser);
		when(this.jwtService.generateToken(any(UserDetails.class)))
				.thenReturn(mockToken);

		ResponseEntity<?> response = this.authService.signIn(signInDto);

		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertTrue(response.getBody() instanceof LoginResponseDto);

		LoginResponseDto loginResponseDto = (LoginResponseDto) response.getBody();
		assertEquals(mockUser, loginResponseDto.user());
		assertEquals(mockToken, loginResponseDto.jwtToken());
	}

	@Test
	public void signIn_ThrowsBadCredentials() {
		String email = "bademail@dev.com";
		String password = "12345678321321837128362186321";
		SignInDto signInDto = new SignInDto(email, password);
		String badCredentialMessage = "Non-existent user or invalid password";

		when(this.authenticationManager.authenticate(any(Authentication.class)))
				.thenThrow(BadCredentialsException.class);

		ResponseEntity<?> response = this.authService.signIn(signInDto);

		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
		assertEquals(badCredentialMessage, response.getBody());
	}
}
