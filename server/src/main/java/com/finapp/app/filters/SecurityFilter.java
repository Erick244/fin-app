package com.finapp.app.filters;

import java.io.IOException;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.finapp.app.models.entities.User;
import com.finapp.app.models.repositories.UsersRepository;
import com.finapp.app.services.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SecurityFilter extends OncePerRequestFilter {
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private UsersRepository userRepository;
		
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String authToken = this.extractAuthBearerToken(request);
		
		if (authToken != null) {
			String email = this.jwtService.validationToken(authToken);
			User user = this.userRepository.findByEmail(email);
			
			Collection<? extends GrantedAuthority> userAuthorities = user.userDetails().getAuthorities();
			var auth = new UsernamePasswordAuthenticationToken(user, null, userAuthorities);
			
			SecurityContextHolder.getContext().setAuthentication(auth);
		}
		
		
		filterChain.doFilter(request, response);
	}

	private String extractAuthBearerToken(HttpServletRequest request) {
		
		String authToken = request.getHeader("Authorization");
		
		Boolean isNotValidToken = authToken == null || !authToken.startsWith("Bearer");
		
		if (isNotValidToken) return null;
		
		return authToken.replace("Bearer ", "");
		
	}
}
