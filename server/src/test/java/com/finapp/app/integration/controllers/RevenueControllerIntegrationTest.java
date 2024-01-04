package com.finapp.app.integration.controllers;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Collections;
import java.util.Date;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.finapp.app.models.dto.auth.SignInDto;
import com.finapp.app.models.dto.revenues.CreateRevenueDto;
import com.finapp.app.models.entities.Revenue;
import com.finapp.app.models.entities.User;
import com.finapp.app.models.repositories.RevenuesRepository;
import com.finapp.app.models.repositories.UsersRepository;
import com.finapp.app.services.JwtService;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@TestPropertySource(locations = "classpath:application-tests.properties")
public class RevenueControllerIntegrationTest {

	@Autowired
	private MockMvc mvc;

	@Autowired
	private JwtService jwtService;

	@Autowired
	private UsersRepository usersRepository;

	@Autowired
	private RevenuesRepository revenuesRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	private final MediaType MEDIA_TYPE = MediaType.APPLICATION_JSON;

	private ObjectMapper mapper = new ObjectMapper();

	@BeforeEach
	void setup() {
		revenuesRepository.deleteAll();
		usersRepository.deleteAll();
	}

	@Test
	void testCount_WhithMissingQuery() throws Exception {
		// Arrange
		signInTestUser();
		seedRevenuesTable(5);

		// Act & Assert
		mvc.perform(get("/revenues/count")
				.contentType(MEDIA_TYPE)
				.header("Authorization", getTestBearerToken()))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$").isNotEmpty())
				.andExpect(jsonPath("$", is(5)));
	}

	private void signInTestUser() throws Exception {
		User testUser = getTestUser();
		usersRepository.save(testUser);

		SignInDto signInDto = new SignInDto(testUser.getEmail(), "password");
		String responseBody = mapper.writeValueAsString(signInDto);

		mvc.perform(post("/auth/login")
				.content(responseBody)
				.contentType(MEDIA_TYPE));
	}

	private String getTestBearerToken() {
		String testEmail = getTestUser().getEmail();

		return "Bearer " + jwtService.generateToken(testEmail);
	}

	private User getTestUser() {
		String encryptedPassword = passwordEncoder.encode("password");
		return new User("user", "user@email.com", encryptedPassword);
	}

	private void seedRevenuesTable(int size) {
		for (int i = 0; i < size; i++) {

			String description = "description " + i;
			Long amount = 1l + i;

			Revenue revenue = new Revenue(description, amount, true, new Date(), getTestAuthUser());
			revenuesRepository.save(revenue);
		}
	}

	private User getTestAuthUser() {
		return usersRepository.findByEmail(getTestUser().getEmail());
	}

	@Test
	void testCount_WhithQuery() throws Exception {
		// Arrange
		signInTestUser();
		seedRevenuesTable(5);
		String querySearch = "description 1";

		// Act & Assert
		mvc.perform(get("/revenues/count?query={search}", querySearch)
				.contentType(MEDIA_TYPE)
				.header("Authorization", getTestBearerToken()))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$").isNotEmpty())
				.andExpect(jsonPath("$", is(1)));
	}

	@Test
	void testCreate() throws Exception {
		// Arrange
		signInTestUser();
		CreateRevenueDto createRevenueDto = new CreateRevenueDto("description", 100l, true, new Date());
		String responseBody = mapper.writeValueAsString(createRevenueDto);

		// Act & Assert
		mvc.perform(post("/revenues")
				.contentType(MEDIA_TYPE)
				.header("Authorization", getTestBearerToken())
				.content(responseBody))
				.andExpect(status().isNoContent());
	}

	@Test
	void testDelete() throws Exception {
		// Arrange
		signInTestUser();
		Revenue testRevenue = revenuesRepository.save(getTestRevenue());

		// Act & Assert
		mvc.perform(delete("/revenues/delete/{revenueId}", testRevenue.getId())
				.contentType(MEDIA_TYPE)
				.header("Authorization", getTestBearerToken()))
				.andExpect(status().isOk());
	}

	private Revenue getTestRevenue() {
		return new Revenue("descritpion", 100l, true, new Date(), getTestAuthUser());
	}

	@Test
	void testEdit() throws Exception {
		// Arrange
		signInTestUser();
		Revenue testRevenue = revenuesRepository.save(getTestRevenue());
		Map<String, String> revenueModification = Collections.singletonMap("description", "description edited");
		String responseBody = mapper.writeValueAsString(revenueModification);

		// Act & Assert
		mvc.perform(patch("/revenues/edit/{revenueId}", testRevenue.getId())
				.contentType(MEDIA_TYPE)
				.header("Authorization", getTestBearerToken())
				.content(responseBody))
				.andExpect(status().isNoContent());
	}

	@Test
	void testFindAll_WhithDefaultParams() throws Exception {
		// Arrange
		signInTestUser();
		seedRevenuesTable(10);

		// Act & Assert
		mvc.perform(get("/revenues")
				.contentType(MEDIA_TYPE)
				.header("Authorization", getTestBearerToken()))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$").isNotEmpty())
				.andExpect(jsonPath("$").isArray())
				.andExpect(jsonPath("$", hasSize(5)));
	}

	@Test
	void testFindAll_WhithModifiedTakeParam() throws Exception {
		// Arrange
		signInTestUser();
		seedRevenuesTable(10);

		// Act & Assert
		mvc.perform(get("/revenues?take=3")
				.contentType(MEDIA_TYPE)
				.header("Authorization", getTestBearerToken()))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$").isNotEmpty())
				.andExpect(jsonPath("$").isArray())
				.andExpect(jsonPath("$", hasSize(3)));
	}

	@Test
	void testFindAll_WhithModifiedTakeAndPageParam() throws Exception {
		// Arrange
		signInTestUser();
		seedRevenuesTable(10);

		// Act & Assert
		mvc.perform(get("/revenues?take=3&page=2")
				.contentType(MEDIA_TYPE)
				.header("Authorization", getTestBearerToken()))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$").isNotEmpty())
				.andExpect(jsonPath("$").isArray())
				.andExpect(jsonPath("$", hasSize(3)));
	}

	@Test
	void testFindAll_WhithQuery() throws Exception {
		// Arrange
		signInTestUser();
		seedRevenuesTable(10);

		String searchQuery = "description 1";

		// Act & Assert
		mvc.perform(get("/revenues?query={search}", searchQuery)
				.contentType(MEDIA_TYPE)
				.header("Authorization", getTestBearerToken()))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$").isNotEmpty())
				.andExpect(jsonPath("$").isArray())
				.andExpect(jsonPath("$", hasSize(1)));
	}

	@Test
	void testFindAll_WhithQueryAndPagination() throws Exception {
		// Arrange
		signInTestUser();
		seedRevenuesTable(10);

		String searchQuery = "1";

		// Act & Assert
		mvc.perform(get("/revenues?query={search}&take=1&page=0", searchQuery)
				.contentType(MEDIA_TYPE)
				.header("Authorization", getTestBearerToken()))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$").isNotEmpty())
				.andExpect(jsonPath("$").isArray())
				.andExpect(jsonPath("$", hasSize(1)));
	}

	@Test
	void testFindById() throws Exception {
		// Arrange
		signInTestUser();
		Revenue testRevenue = revenuesRepository.save(getTestRevenue());

		// Act & Assert
		mvc.perform(get("/revenues/findById/{revenueId}", testRevenue.getId())
				.contentType(MEDIA_TYPE)
				.header("Authorization", getTestBearerToken()))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$").isNotEmpty())
				.andExpect(jsonPath("$.id", is(testRevenue.getId())));
	}

	@Test
	void testSevenMonthsChart() throws Exception {
		// Arrange
		signInTestUser();
		seedRevenuesTable(10);

		// Act & Assert
		mvc.perform(get("/revenues/sevenMonthsChart")
				.contentType(MEDIA_TYPE)
				.header("Authorization", getTestBearerToken()))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$").isNotEmpty())
				.andExpect(jsonPath("$").isArray())
				.andExpect(jsonPath("$", hasSize(7)));
	}

	@Test
	void testSpendingInformations() throws Exception {
		// Arrange
		signInTestUser();
		seedRevenuesTable(10);

		// Act & Assert
		mvc.perform(get("/revenues/spendingInformations")
				.contentType(MEDIA_TYPE)
				.header("Authorization", getTestBearerToken()))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$").isNotEmpty());
	}
}
