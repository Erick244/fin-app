package com.finapp.app.models.repositories;

import org.springframework.data.repository.CrudRepository;

import com.finapp.app.models.entities.User;

public interface UsersRepository extends CrudRepository<User, Integer> {

	User findByEmail(String email);
}
