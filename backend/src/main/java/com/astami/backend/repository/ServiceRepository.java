package com.astami.backend.repository;

import com.astami.backend.model.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
    Page<Service> findAllByTitleContainingIgnoreCaseAndBranchId(String title, Long branchId, Pageable pageable);
}
