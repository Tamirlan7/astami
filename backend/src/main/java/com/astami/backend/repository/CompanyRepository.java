package com.astami.backend.repository;

import com.astami.backend.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    List<Company> findAllByUserId(Long id);
    int countAllByUserId(Long id);
    Optional<Company> findByTitle(String title);
}
