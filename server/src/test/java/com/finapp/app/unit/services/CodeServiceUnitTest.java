package com.finapp.app.unit.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.finapp.app.models.entities.User;
import com.finapp.app.services.CodeService;

public class CodeServiceUnitTest {

	private CodeService codeService;

	@BeforeEach
	void setUp() {
		codeService = new CodeService();
	}

	@Test
	void testGenCode() {
		// Arrange & Act
		String code = codeService.genCode();

		// Assert
		assertNotNull(code);
		assertEquals(code.length(), codeService.DEFAULT_CODE_SIZE);
	}

	@Test
	void testClean() {
		// Arrange
		User user = new User();
		codeService.setUserSave(user);
		codeService.genCode();

		// Act
		codeService.clean();

		// Assert
		assertNull(codeService.getUserSave());
		assertEquals(codeService.getCode().length(), 0);
	}
}
