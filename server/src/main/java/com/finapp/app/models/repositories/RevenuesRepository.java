package com.finapp.app.models.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.finapp.app.models.entities.Revenue;

@Repository
public interface RevenuesRepository extends CrudRepository<Revenue, Integer> {

}
