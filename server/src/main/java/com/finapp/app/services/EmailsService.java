package com.finapp.app.services;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailsService {

	@Autowired
	private JavaMailSender mailSender;

	public void sendEmail(String to, String subject, String content) throws MessagingException {
		MimeMessage message = mailSender.createMimeMessage();

		message.setFrom(new InternetAddress("noreply@baeldung.com"));
		message.setRecipients(MimeMessage.RecipientType.TO, to);
		message.setSubject(subject);
		message.setContent(content, "text/html; charset=utf-8");

		mailSender.send(message);
	}

	public void sendCodeEmail(String to, String code) {
		try {
			String subject = "FinApp Verification Code";
			String htmlContent = getHtmlStringPage("templates/emailCode.html");
			htmlContent = htmlContent.replace("{{code}}", code);

			sendEmail(to, subject, htmlContent);
		} catch (Exception e) {
			System.out.println("[Email Service] - Error on send code email: \n" + e.getMessage());
		}

	}

	private String getHtmlStringPage(String htmlPath) throws IOException {
		InputStream inputStream = getClass().getClassLoader().getResourceAsStream(htmlPath);

		if (inputStream == null) {
			throw new FileNotFoundException("[Email Service] - HTML file not found: " + htmlPath);
		}

		BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
		StringBuilder htmlContentStringBuilder = new StringBuilder();

		String line;
		while ((line = reader.readLine()) != null) {
			htmlContentStringBuilder.append(line);
		}
		reader.close();

		return htmlContentStringBuilder.toString();
	}

}
