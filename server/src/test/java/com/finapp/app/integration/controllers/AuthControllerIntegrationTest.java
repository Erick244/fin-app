package com.finapp.app.integration.controllers;

import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.finapp.app.models.dto.auth.SignInDto;
import com.finapp.app.models.dto.auth.SignUpDto;
import com.finapp.app.models.entities.User;
import com.finapp.app.models.repositories.UsersRepository;
import com.finapp.app.services.CodeService;
import com.finapp.app.services.EmailsService;
import com.finapp.app.services.JwtService;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@TestPropertySource(locations = "classpath:application-tests.properties")
public class AuthControllerIntegrationTest {

	@Autowired
	private MockMvc mvc;

	@Autowired
	private UsersRepository repository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtService jwtService;

	@MockBean
	private CodeService codeService;

	@MockBean
	private EmailsService emailsService;

	private final MediaType MEDIA_TYPE = MediaType.APPLICATION_JSON;

	private ObjectMapper mapper = new ObjectMapper();

	@BeforeEach
	void setUp() {
		repository.deleteAll();
	}

	@Test
	void testSignUp() throws Exception {
		// Arrange
		SignUpDto signUpDto = new SignUpDto("user", "user@email.com", "password", "password");
		String responseBody = mapper.writeValueAsString(signUpDto);

		// Act & Assert
		mvc.perform(post("/auth/signup")
				.content(responseBody)
				.contentType(MEDIA_TYPE))
				.andExpect(status().isNoContent());
	}

	@Test
	void testVerifyCode() throws Exception {
		// Arrange
		String code = "123456";
		User testUser = getTestUser();
		when(codeService.getUserSave()).thenReturn(testUser);
		when(codeService.getCode()).thenReturn(code);

		// Act & Assert
		mvc.perform(post("/auth/verifyCode/{code}", code)
				.contentType(MEDIA_TYPE))
				.andExpect(status().isNoContent());
	}

	private User getTestUser() {
		String encryptedPassword = passwordEncoder.encode("password");
		return new User("user", "user@email.com", encryptedPassword);
	}

	@Test
	void testLogin() throws Exception {
		// Arrange
		User testUser = getTestUser();
		repository.save(testUser);

		SignInDto signInDto = new SignInDto("user@email.com", "password");
		String responseBody = mapper.writeValueAsString(signInDto);

		// Act & Assert
		mvc.perform(post("/auth/login")
				.content(responseBody)
				.contentType(MEDIA_TYPE))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$").isNotEmpty())
				.andExpect(jsonPath("$.user.email", is(testUser.getEmail())))
				.andExpect(jsonPath("$.user.name", is(testUser.getName())))
				.andExpect(jsonPath("$.jwtToken").isNotEmpty());

	}

	@Test
	void testResendEmail() throws Exception {
		// Arrange
		User testUser = getTestUser();
		when(codeService.getUserSave()).thenReturn(testUser);
		String successMessage = String.format("A new e-mail has been sent to %s", testUser.getEmail());

		// Act & Assert
		mvc.perform(get("/auth/resendEmail")
				.contentType(MEDIA_TYPE))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$").isNotEmpty())
				.andExpect(jsonPath("$", is(successMessage)));
	}

	@Test
	void testUserByToken() throws Exception {
		// Arrange
		User testUser = getTestUser();
		repository.save(testUser);
		String jwtToken = jwtService.generateToken(testUser.getEmail());

		// Act & Assert
		mvc.perform(get("/auth/userByToken/{token}", jwtToken)
				.contentType(MEDIA_TYPE))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$").isNotEmpty())
				.andExpect(jsonPath("$.email", is(testUser.getEmail())))
				.andExpect(jsonPath("$.name", is(testUser.getName())));
	}
}
