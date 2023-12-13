package com.finapp.app.models.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.finapp.app.models.entities.Revenue;

@Repository
public interface RevenuesRepository
		extends CrudRepository<Revenue, Integer>, PagingAndSortingRepository<Revenue, Integer> {
	List<Revenue> findAllByUserId(int userId, Pageable pageable);

	List<Revenue> findAllByUserId(int userId);

	Optional<Revenue> findByIdAndUserId(int revenueId, int userId);

	void deleteByIdAndUserId(int revenueId, int userId);

	@Query("SELECT r FROM revenues r WHERE r.user.id = :userId AND MONTH(r.transactionDate) = :month")
	List<Revenue> findAllByUserIdAndMouth(@Param("userId") int userId, @Param("month") int month);

}
