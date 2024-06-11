package com.astami.backend.repository;

import com.astami.backend.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Optional<Customer> findByPhone(String phone);
    Page<Customer> findAllByNameContainingIgnoreCaseAndBranchId(String name, long branchId, Pageable pageable);
}
