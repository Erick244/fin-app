package com.finapp.app.services;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTDecodeException;

@Service
public class JwtService {

	private final int ONE_MOUTH_IN_SECONDS = 60 * 60 * 60 * 24 * 30;
	private final String ISSUER = "fin_app";

	@Value("${jwt.token.secret}")
	private String secret;

	public String generateToken(UserDetails userDetails) {
		try {
			Algorithm algorithm = this.getAlgorithm();
			int expiryTime = ONE_MOUTH_IN_SECONDS;

			String token = JWT.create()
					.withIssuer(ISSUER)
					.withSubject(userDetails.getUsername())
					.withExpiresAt(this.createExpiryTime(expiryTime))
					.sign(algorithm);

			return token;
		} catch (JWTCreationException e) {
			throw new RuntimeException("[JwtService] JWT token creation error", e);
		}
	}

	private Algorithm getAlgorithm() {
		return Algorithm.HMAC256(secret);
	}

	private Instant createExpiryTime(Integer timeInSeconds) {
		ZoneOffset brazilZoneOffset = ZoneOffset.of("-03:00");

		Instant expiryTime = LocalDateTime.now().plusSeconds(timeInSeconds).toInstant(brazilZoneOffset);

		return expiryTime;
	}

	public String validationToken(String token) {
		try {
			Algorithm algorithm = this.getAlgorithm();

			String subject = JWT.require(algorithm)
					.withIssuer(ISSUER)
					.build()
					.verify(token)
					.getSubject();

			return subject;
		} catch (JWTDecodeException e) {
			return "";
		}
	}
}
