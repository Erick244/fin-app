package com.finapp.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.finapp.app.models.entities.User;
import com.finapp.app.models.repositories.UserRepository;

@Service
public class UsersService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = this.userRepository.findByEmail(email);
		
		if (user == null) {
			throw new UsernameNotFoundException("User not found");
		}
		
		return user.userDetails();
	}

}
