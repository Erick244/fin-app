package com.finapp.app.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

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
			String htmlContent = getHtmlStringPage("src/main/resources/templates/emailCode.html");
			htmlContent = htmlContent.replace("{{code}}", code);

			sendEmail(to, subject, htmlContent);
		} catch (Exception e) {
			System.out.println("Erro ao enviar o e-email");
		}

	}

	private String getHtmlStringPage(String htmlPath) throws IOException {
		String htmlContent = new String(Files.readAllBytes(Paths.get(htmlPath)));

		return htmlContent;
	}

}
