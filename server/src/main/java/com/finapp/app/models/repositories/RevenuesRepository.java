package com.finapp.app.models.repositories;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.finapp.app.models.entities.Revenue;

@Repository
public interface RevenuesRepository
		extends CrudRepository<Revenue, Integer>, PagingAndSortingRepository<Revenue, Integer> {
	List<Revenue> findAllByUserId(int userId, Pageable pageable);
}
